/**
 * Automated test script for Crowdfunding.sol
 * Assignment II – Principles of Blockchain and Distributed Technology
 * Author : Alfred Antony M (711523BCB007)
 *
 * Usage:
 *   cd test
 *   npm install
 *   npm test
 *
 * Requires Node.js 18+. Compiles the contract with solc-js and runs it on a
 * local Ganache chain (no MetaMask, no real ETH).
 */

"use strict";

const solc    = require("solc");
const fs      = require("fs");
const path    = require("path");
const ganache = require("ganache");
const { ethers } = require("ethers");

// solc-js registers an unhandledRejection handler; ethers can emit duplicate
// rejections for expected reverts, so we override that handler here.
process.removeAllListeners("unhandledRejection");
process.on("unhandledRejection", () => {});

// ── Compile ──────────────────────────────────────────────────────────────────
const src = fs.readFileSync(
  path.join(__dirname, "..", "contracts", "Crowdfunding.sol"),
  "utf8"
);

const compiled = JSON.parse(
  solc.compile(
    JSON.stringify({
      language: "Solidity",
      sources: { "Crowdfunding.sol": { content: src } },
      settings: {
        evmVersion: "paris",
        outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } }
      }
    })
  )
);

if (compiled.errors) {
  const fatal = compiled.errors.filter(e => e.severity === "error");
  if (fatal.length) {
    fatal.forEach(e => console.error(e.formattedMessage));
    process.exit(1);
  }
}

const { abi, evm } =
  compiled.contracts["Crowdfunding.sol"].Crowdfunding;

// ── Test helpers ─────────────────────────────────────────────────────────────
let pass = 0, fail = 0;

function check(name, ok) {
  const icon = ok ? "PASS" : "FAIL";
  console.log(`  [${icon}] ${name}`);
  ok ? pass++ : fail++;
}

function errText(e) {
  return [
    e?.message,
    e?.shortMessage,
    e?.reason,
    e?.info?.error?.message,
    e?.info?.error?.data?.reason
  ]
    .filter(Boolean)
    .join(" | ");
}

async function expectRevert(label, promise, expectedMsg) {
  try {
    const tx = await promise;
    await tx.wait();
    check(`${label} — should have reverted`, false);
  } catch (e) {
    const text = errText(e);
    check(`${label} — reverts: "${expectedMsg}"`, text.includes(expectedMsg));
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const server = ganache.provider({
    logging: { quiet: true },
    chain:   { hardfork: "shanghai", vmErrorsOnRPCResponse: true }
  });
  const provider = new ethers.BrowserProvider(server);

  // Resolve 5 signers
  const signers = await Promise.all(
    [0, 1, 2, 3, 4].map(i => provider.getSigner(i))
  );
  const [owner, C1, C2, C3, C4] = signers;

  const eth  = v => ethers.parseEther(String(v));
  const skip = async s => {
    await provider.send("evm_increaseTime", [s]);
    await provider.send("evm_mine", []);
  };
  const balOf = async addr =>
    BigInt(await provider.send("eth_getBalance", [addr, "latest"]));

  async function deploy(name, goalWei, mins) {
    const factory = new ethers.ContractFactory(abi, evm.bytecode.object, owner);
    const k = await factory.deploy(name, goalWei, mins);
    await k.waitForDeployment();
    return k;
  }

  // ── SCENARIO A: Successful campaign ────────────────────────────────────────
  console.log("\n── Scenario A: Successful campaign ─────────────────────────");

  const A = await deploy("Smart Library Project", eth(5), 60);

  // TC01 – Deployment
  check(
    "TC01 deploy: owner, projectName, goal, totalRaised, status Active",
    (await A.owner())       === (await owner.getAddress()) &&
    (await A.projectName()) === "Smart Library Project"    &&
    (await A.goal())        === eth(5)                     &&
    (await A.totalRaised()) === 0n                         &&
    Number(await A.getStatus()) === 0   // Status.Active
  );

  // TC02 – C1 contributes 2 ETH
  await (await A.connect(C1).contribute({ value: eth(2) })).wait();
  check(
    "TC02 C1 contributes 2 ETH: contributions and totalRaised",
    (await A.contributions(await C1.getAddress())) === eth(2) &&
    (await A.totalRaised()) === eth(2)
  );

  // TC03 – C2 contributes 2 ETH
  await (await A.connect(C2).contribute({ value: eth(2) })).wait();
  check(
    "TC03 C2 contributes 2 ETH: totalRaised = 4 ETH, contributors count = 2",
    (await A.totalRaised()) === eth(4) &&
    (await A.getContributorsCount()) === 2n
  );

  // TC04 – C3 contributes 1 ETH → goal reached
  await (await A.connect(C3).contribute({ value: eth(1) })).wait();
  check(
    "TC04 C3 contributes 1 ETH: totalRaised = 5 ETH, contributors count = 3",
    (await A.totalRaised()) === eth(5) &&
    (await A.getContributorsCount()) === 3n
  );

  // TC05 – Zero-value contribution reverts
  await expectRevert(
    "TC05 zero-value contribution",
    A.connect(C1).contribute({ value: 0 }),
    "Contribution must be greater than 0"
  );

  // TC06 – Owner withdraws before deadline → reverts
  await expectRevert(
    "TC06 withdrawFunds before deadline",
    A.withdrawFunds(),
    "Campaign still active"
  );

  // TC07 – Contributor tries refund while active → reverts
  await expectRevert(
    "TC07 refund while campaign active",
    A.connect(C1).refund(),
    "Campaign still active"
  );

  // TC08 – Non-owner tries withdraw → reverts
  await expectRevert(
    "TC08 withdrawFunds by non-owner",
    A.connect(C1).withdrawFunds({ gasLimit: 100000 }),
    "Only owner allowed"
  );

  // --- skip past the deadline ---
  await skip(61 * 60);

  // TC09 – Contribute after deadline → reverts
  await expectRevert(
    "TC09 contribute after deadline",
    A.connect(C4).contribute({ value: eth(1), gasLimit: 100000 }),
    "Campaign has ended"
  );

  // TC10 – Refund on successful campaign → reverts
  // deadline has passed AND totalRaised >= goal → "Goal reached, no refund"
  await expectRevert(
    "TC10 refund when goal reached",
    A.connect(C1).refund({ gasLimit: 100000 }),
    "Goal reached, no refund"
  );

  // TC11 – Owner withdraws successfully
  {
    const before = await balOf(await owner.getAddress());
    await (await A.withdrawFunds({ gasLimit: 100000 })).wait();
    const after  = await balOf(await owner.getAddress());
    check(
      "TC11 owner withdrawFunds: ~5 ETH received, contract balance 0, fundsWithdrawn true",
      after - before > eth(4.99) &&
      (await provider.getBalance(await A.getAddress())) === 0n &&
      (await A.fundsWithdrawn()) === true
    );
  }

  // TC12 – Double withdrawal → reverts
  await expectRevert(
    "TC12 second withdrawFunds",
    A.withdrawFunds({ gasLimit: 100000 }),
    "Funds already withdrawn"
  );

  // TC13 – getStatus after successful withdrawal → Successful (1)
  check(
    "TC13 getStatus after withdrawal = Successful",
    Number(await A.getStatus()) === 1
  );

  // TC14 – timeLeft after deadline = 0
  check("TC14 timeLeft after deadline = 0", (await A.timeLeft()) === 0n);

  // ── SCENARIO B: Failed campaign ────────────────────────────────────────────
  console.log("\n── Scenario B: Failed campaign ──────────────────────────────");

  const B = await deploy("Smart Library Project", eth(5), 3);

  // TC15 – C1 contributes 1 ETH
  await (await B.connect(C1).contribute({ value: eth(1) })).wait();
  check("TC15 C1 contributes 1 ETH (B)", (await B.totalRaised()) === eth(1));

  // TC16 – C2 contributes 1 ETH → total 2 ETH (below goal)
  await (await B.connect(C2).contribute({ value: eth(1) })).wait();
  check(
    "TC16 C2 contributes 1 ETH (B): totalRaised = 2 ETH, count = 2",
    (await B.totalRaised()) === eth(2) &&
    (await B.getContributorsCount()) === 2n
  );

  // TC17 – Owner tries withdraw before deadline (goal not met) → reverts
  await expectRevert(
    "TC17 withdrawFunds before deadline (B, goal not met)",
    B.withdrawFunds({ gasLimit: 100000 }),
    "Campaign still active"
  );

  // TC18 – Contributor tries refund before deadline → reverts
  await expectRevert(
    "TC18 refund before deadline (B)",
    B.connect(C1).refund({ gasLimit: 100000 }),
    "Campaign still active"
  );

  // Skip past B's deadline
  await skip(4 * 60);

  // TC19 – timeLeft = 0
  check("TC19 timeLeft after deadline (B) = 0", (await B.timeLeft()) === 0n);

  // TC20 – Contribute after deadline → reverts
  await expectRevert(
    "TC20 contribute after deadline (B)",
    B.connect(C3).contribute({ value: eth(1), gasLimit: 100000 }),
    "Campaign has ended"
  );

  // TC21 – getStatus = Failed (2)
  check("TC21 getStatus = Failed", Number(await B.getStatus()) === 2);

  // TC22 – Owner tries withdraw on failed campaign → reverts
  await expectRevert(
    "TC22 withdrawFunds on failed campaign",
    B.withdrawFunds({ gasLimit: 100000 }),
    "Goal not reached"
  );

  // TC23 – C1 refund success (~1 ETH back)
  {
    const before = await balOf(await C1.getAddress());
    await (await B.connect(C1).refund()).wait();
    const after  = await balOf(await C1.getAddress());
    check(
      "TC23 C1 refund: ~1 ETH returned, contributions[C1] = 0",
      after - before > eth(0.99) &&
      (await B.contributions(await C1.getAddress())) === 0n
    );
  }

  // TC24 – C1 refund again → reverts
  await expectRevert(
    "TC24 second refund (C1)",
    B.connect(C1).refund({ gasLimit: 100000 }),
    "No contribution found"
  );

  // TC25 – Non-contributor refund → reverts
  await expectRevert(
    "TC25 refund by non-contributor (C4)",
    B.connect(C4).refund({ gasLimit: 100000 }),
    "No contribution found"
  );

  // TC26 – getStatus after deadline without withdrawal = Failed (2)
  check(
    "TC26 getStatus stays Failed (no withdrawal on failed campaign)",
    Number(await B.getStatus()) === 2
  );

  // ── Summary ─────────────────────────────────────────────────────────────────
  console.log(`\n${"─".repeat(56)}`);
  console.log(`  Total: ${pass + fail}  |  Pass: ${pass}  |  Fail: ${fail}`);
  console.log(`${"─".repeat(56)}\n`);
  process.exit(fail ? 1 : 0);
})().catch(e => {
  console.error("TEST SCRIPT ERROR:", errText(e) || e);
  process.exit(1);
});
