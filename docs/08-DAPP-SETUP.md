# 08 – DApp Setup Guide

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

The DApp (`frontend/index.html`) is an optional bonus. The Solidity contract tested in
Remix covers every required behaviour. If you include the DApp, mention in your report that
it is optional and that it requires a public testnet (the DApp cannot connect to Remix VM).

---

## Prerequisites

1. **MetaMask** browser extension installed (<https://metamask.io>).
   Create a wallet and save the recovery phrase offline — never share it.
2. **Sepolia test network** enabled in MetaMask:
   - MetaMask → Settings → Advanced → Show test networks → On
   - Switch network to **Sepolia**.
3. **Free Sepolia ETH** from a faucet:
   - <https://sepoliafaucet.com> (requires Alchemy account — free)
   - <https://faucets.chain.link/sepolia> (requires small mainnet balance)
   - Search "Sepolia faucet" for current options (availability changes).

---

## Step 1 – Deploy the contract to Sepolia

1. Open <https://remix.ethereum.org> and make sure `Crowdfunding.sol` is compiled (green tick).
2. **Deploy & Run** tab → **Environment** → **Injected Provider – MetaMask**.
3. MetaMask will ask you to connect — approve it. Confirm that Remix shows **Sepolia** and your account.
4. Constructor inputs:
   - `_projectName`: `Smart Library Project`
   - `_goalInWei`: `1000000000000000000` (1 ETH — easier to test with small amounts)
   - `_durationInMinutes`: `60`
5. Click **Deploy** and confirm the MetaMask transaction.
6. Copy the deployed contract address and record it in `docs/04-DEPLOYMENT-DETAILS.md`.
7. Verify on Etherscan: <https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS>

---

## Step 2 – Run the DApp locally

The DApp must be served over HTTP (not opened as a local file) to avoid MetaMask restrictions.

**Option A – Python (no install needed on most systems)**
```bash
cd frontend
python -m http.server 8000
```
Then open <http://localhost:8000> in the same browser where MetaMask is installed.

**Option B – Node.js / npx**
```bash
npx serve frontend
```

---

## Step 3 – Use the DApp

1. Click **Connect MetaMask** → approve in the MetaMask popup.
2. Paste the Sepolia contract address into the **Contract address** field.
3. Click **Load Campaign** — campaign details appear (project name, goal, raised, time left, status).
4. Enter an ETH amount and click **Contribute** → confirm in MetaMask.
5. After the goal is reached and the deadline passes, the owner can click **Withdraw Funds**.
6. If the campaign fails (goal not reached after deadline), contributors click **Claim Refund**.

---

## Step 4 – Screenshot for the report

Take a screenshot of the DApp showing:
- Connected account address
- Campaign info populated (project name, goal, raised, status)
- At least one action button

Save as `screenshots/26_dapp_interface.png`.

---

## ABI note

The DApp uses a **human-readable ABI** that matches `Crowdfunding.sol` exactly.
If you modify the contract (e.g. rename a function), update the `ABI` array in
`frontend/index.html` accordingly, otherwise calls will silently fail.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| MetaMask not detected | Install the MetaMask extension; use Chrome or Firefox |
| "No contract found at this address" | Check you are on Sepolia in MetaMask and the address is correct |
| Transaction fails silently | Open browser DevTools (F12) → Console for the full error |
| CORS error when opening as a file | Serve with `python -m http.server` instead of opening the `.html` directly |
