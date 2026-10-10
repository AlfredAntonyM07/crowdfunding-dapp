# 06 – Report Structure

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Aim for **8–12 pages**. Place screenshots inline next to the test cases they prove.
Export as PDF with your name and register number on the first page.

---

## Suggested Outline

### 1. Title Page
- Assignment title: *Crowdfunding Smart Contract*
- Course: *Principles of Blockchain and Distributed Technology*
- Name: Alfred Antony M
- Register Number: 711523BCB007
- Department, College, Date

### 2. Aim
Write the aim in one paragraph:
> To design, implement, test, and deploy a Solidity smart contract that allows multiple users
> to contribute Ether toward a predefined project, releases funds to the owner when the goal
> is reached before the deadline, and lets contributors reclaim funds when the goal is not met.

### 3. Introduction
- What is a smart contract and why Ethereum?
- Why crowdfunding is a good fit: trustless escrow, automatic refunds, immutable rules.
- How this contract reduces fraud: goal/deadline fixed at deploy, funds held by contract,
  every event recorded on-chain.

### 4. Problem Statement
Restate the fraud-reduction argument from the assignment brief. Explain what goes wrong in
traditional crowdfunding and how a smart contract fixes it.

### 5. Tools and Environment

| Item         | Detail                                   |
|--------------|------------------------------------------|
| Language     | Solidity ^0.8.20                         |
| IDE          | Remix IDE (https://remix.ethereum.org)   |
| Compiler     | solc 0.8.20                              |
| Test network | Remix VM (Cancun)                        |
| Wallet       | MetaMask (optional, Sepolia)             |
| DApp library | ethers.js v6.7.0                         |

### 6. System Design

**6.1 Actors**
- Owner (project creator) — deploys contract, may withdraw funds
- Contributors — send ETH, may claim refunds on failure

**6.2 State Variables** — table from Section 4.1 of the assignment

**6.3 Functions** — table from Section 4.2

**6.4 Events** — list from Section 4.3

**6.5 Flow Diagram**
- Deploy → contribute (active) → deadline passes → success path (withdraw) / failure path (refund)

### 7. Smart Contract Source Code
- Paste the full `Crowdfunding.sol` code with inline comments.
- Explain each function, every `require` statement, and why the enum `Status` has three values.
- Explain wei vs ETH (1 ETH = 10¹⁸ wei).

### 8. Security Considerations
- **Checks-Effects-Interactions**: state updated before ETH is sent.
- **Re-entrancy protection**: contribution balance zeroed before transfer in `refund()`; `fundsWithdrawn` set before transfer in `withdrawFunds()`.
- **Access control**: `onlyOwner` modifier.
- **Deadline enforcement**: `require(block.timestamp < deadline)` / `>= deadline`.
- **Pull-based refunds**: no loop over contributors, so one failed transfer cannot block others.
- **Solidity 0.8.x**: built-in overflow/underflow checks.
- **Limitations**: not audited, single campaign, no ERC-20 support, owner has full withdrawal once goal is met.

### 9. Compilation and Deployment
- Screenshot of successful compile (green tick, version 0.8.20).
- Screenshot of Deploy panel with constructor inputs.
- Screenshot of expanded Deployed Contracts.
- Table from `docs/04-DEPLOYMENT-DETAILS.md` with real addresses and tx hashes.

### 10. Test Cases and Results
- Full table from `docs/02-TEST-CASES.md` with real **Actual Result** and **Pass/Fail** filled in.
- Screenshots next to the relevant test case rows.
- Short summary: e.g. "All 25 test cases passed. Reverts confirmed with the expected messages."

### 11. Optional DApp
- Screenshot of the DApp in the browser.
- Brief explanation of how it uses ethers.js to interact with the deployed contract.
- Note that the DApp requires a public testnet (Sepolia); Remix VM is not accessible from a browser DApp.

### 12. Limitations and Future Work
- Single campaign per deployment
- Owner can withdraw entire balance at once (no milestones)
- No ERC-20 token reward for contributors
- Not audited (not suitable for production)
- Future: multi-campaign factory, milestone-based release, governance, ERC-20 rewards

### 13. Conclusion
Summarise in one paragraph what was built, how it was tested, and how it reduces fraud.

### 14. References
- Solidity documentation: https://docs.soliditylang.org
- Remix IDE documentation: https://remix-ide.readthedocs.io
- Ethereum.org: https://ethereum.org/en/developers/docs/
- ethers.js documentation: https://docs.ethers.org/v6/

### 15. Appendix
- GitHub repository link
- Demo video link
- Full source code (if not included inline)
- Extra screenshots

---

## Formatting tips

- Use consistent heading styles.
- All code should be in a monospace font.
- All wei values should be shown as both wei and the ETH equivalent.
- Every screenshot should have a caption (e.g. *Figure 1: Successful compile*).
- No placeholder text (`____`) should appear in the final submitted report.
