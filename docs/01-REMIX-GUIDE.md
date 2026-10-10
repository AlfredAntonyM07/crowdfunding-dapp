# 01 – Remix IDE Guide

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Everything here uses **Remix VM** — a simulated blockchain that runs inside your browser.
No MetaMask, no real ETH, no internet transactions needed.
Remix VM resets on page refresh, so **complete all tests in one sitting** and take
screenshots as you go.

---

## Step 1 – Create the file

1. Open <https://remix.ethereum.org>.
2. Click the **File Explorer** icon (first icon in the left sidebar).
3. Right-click the `contracts` folder → **New File** → name it `Crowdfunding.sol`.
4. Paste the entire contents of `contracts/Crowdfunding.sol` from this repo.
5. Press **Ctrl + S** to save.

---

## Step 2 – Compile

1. Click the **Solidity Compiler** icon (second icon, looks like an "S").
2. **Compiler version**: select **0.8.20** (or any 0.8.20 – 0.8.24).
3. Leave *Auto compile* off, EVM version on default, optimization off.
4. Click the blue **Compile Crowdfunding.sol** button.
5. A **green tick** appears on the compiler icon — compilation successful.

---

## Step 3 – Deploy

1. Click the **Deploy & Run Transactions** icon (third icon, Ethereum logo with arrow).
2. **Environment**: `Remix VM (Cancun)` or `Remix VM (Prague)`.
3. **Account**: the dropdown lists 15 accounts, each with 100 ETH. Use them as follows:

   | Role          | Account in Remix        |
   |---------------|-------------------------|
   | Owner         | **Account 1** (default) |
   | Contributor 1 | Account 2               |
   | Contributor 2 | Account 3               |
   | Contributor 3 | Account 4               |

   > Copy each address (the copy icon next to the dropdown) into a text file and label it.
   > You will need the addresses for the `contributions(address)` getter.

4. **Contract**: select `Crowdfunding`.
5. Expand the **Deploy** button (click the small triangle) to see constructor inputs:

   | Parameter           | Value (Scenario A)       |
   |---------------------|--------------------------|
   | `_projectName`      | `Smart Library Project`  |
   | `_goalInWei`        | `5000000000000000000`    |
   | `_durationInMinutes`| `5`                      |

6. Click **Deploy** while **Account 1** is selected (Account 1 becomes the owner).
7. Under **Deployed Contracts** you will see `CROWDFUNDING AT 0x...`. Click ▶ to expand.

For **Scenario B** (failure test), deploy a second instance:

| Parameter           | Value (Scenario B)       |
|---------------------|--------------------------|
| `_projectName`      | `Smart Library Project`  |
| `_goalInWei`        | `5000000000000000000`    |
| `_durationInMinutes`| `5`                      |

---

## Step 4 – Button colours

| Colour | Meaning                        | Costs gas? |
|--------|--------------------------------|------------|
| Blue   | `view` / public variable: reads data | No   |
| Orange | `payable` function: needs ETH value  | Yes  |
| Red    | Non-payable state-changing function  | Yes  |

---

## Step 5 – Sending ETH with `contribute`

1. Select a contributor account (e.g. Account 2) in the **Account** dropdown.
2. In the **Value** field, type `2` and change the unit to **Ether**.
3. Click the orange **contribute** button.
4. **Reset Value back to 0** before calling any red (non-payable) button.

---

## Step 6 – Simulating the deadline (time travel)

Remix VM does **not** advance time by itself. Use the JavaScript VM console or the
`evm_increaseTime` method if you need to simulate deadline expiry:

1. Open the **Remix terminal** (bottom panel).
2. Paste and run:
   ```javascript
   await web3.currentProvider.send({
     jsonrpc: "2.0", method: "evm_increaseTime",
     params: [400], id: 1
   }, () => {});
   await web3.currentProvider.send({
     jsonrpc: "2.0", method: "evm_mine",
     params: [], id: 2
   }, () => {});
   ```
   (Replace `400` with the number of seconds to skip — e.g. `400` for a 5-minute campaign.)

After running this, `timeLeft()` should return `0` and `getStatus()` should return `2` (Failed)
or `1` (Successful).

---

## Step 7 – Failed transactions (reverts)

When a `require` fails, Remix shows a popup:
> *"Gas estimation failed… Send Transaction"*

Click **Send Transaction** to force it. The terminal shows a red line such as:
```
transact to Crowdfunding.withdrawFunds errored:
...Reason provided by the contract: "Only owner allowed"
```
That red message is your evidence for the test case screenshot.

---

## Step 8 – Reading values

- Click any **blue** button to read its value (appears below the button).
- For `contributions(address)`: paste a contributor address into the input box and click call.
- For `contributors(index)`: enter `0`, `1`, `2`… to read each address.
- All amounts are in **wei**: 1 ETH = `1 000 000 000 000 000 000` wei (10¹⁸).

  | ETH | Wei                    |
  |-----|------------------------|
  | 1   | `1000000000000000000`  |
  | 2   | `2000000000000000000`  |
  | 5   | `5000000000000000000`  |

- `getStatus()` returns an enum integer: `0` = Active, `1` = Successful, `2` = Failed.
- `deadline` is a Unix timestamp. Convert at <https://www.epochconverter.com> if needed.

---

## Step 9 – Copying transaction details

In the **terminal** at the bottom, every transaction has a row.
Click the **▼ arrow** on any row to expand it and see:
`status`, `transaction hash`, `block number`, `from`, `to`, `gas used`,
`transaction cost`, `execution cost`, `logs` (emitted events), and more.

Copy the real values into `docs/04-DEPLOYMENT-DETAILS.md`.
The deployed contract address appears as `CROWDFUNDING AT 0x…` — click the copy icon.

---

## Step 10 – Checking account balances

The **Account** dropdown shows each account's ETH balance.
After `withdrawFunds()` the owner's balance should increase by ~5 ETH (minus gas).
After `refund()` each contributor's balance should increase by their contribution (minus gas).
