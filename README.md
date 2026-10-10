# Crowdfunding Smart Contract

**Assignment II – Principles of Blockchain and Distributed Technology**

| | |
|---|---|
| **Name** | Alfred Antony M |
| **Register Number** | 711523BCB007 |
| **Topic** | Crowdfunding Smart Contract |

---

## Aim

To design, implement, test, and deploy a Solidity smart contract that allows multiple users
to contribute Ether toward a predefined project, releases funds to the project owner only
when the funding goal is reached before the deadline, and automatically lets contributors
reclaim their money when the goal is not reached.

---

## Project Structure

```
crowdfunding-dapp/
├── contracts/
│   └── Crowdfunding.sol          ← The smart contract
├── frontend/
│   └── index.html                ← Optional DApp (ethers.js v6 + MetaMask)
├── test/
│   ├── crowdfunding.test.js      ← Automated tests (Ganache + solc-js)
│   └── package.json
├── docs/
│   ├── 01-REMIX-GUIDE.md         ← How to compile, deploy, and test in Remix
│   ├── 02-TEST-CASES.md          ← 25 manual test cases (fill in Actual Result)
│   ├── 03-SCREENSHOTS.md         ← List of screenshots to capture
│   ├── 04-DEPLOYMENT-DETAILS.md  ← Template for real addresses and tx hashes
│   ├── 05-DEMO-SCRIPT.md         ← 4-minute demo video script
│   ├── 06-REPORT-STRUCTURE.md    ← Suggested report outline
│   ├── 07-SUBMISSION-CHECKLIST.md
│   └── 08-DAPP-SETUP.md          ← Optional Sepolia + DApp setup
├── screenshots/                  ← Put your Remix screenshots here
├── .gitignore
├── LICENSE
└── README.md
```

---

## Contract Overview

### State Variables

| Variable | Type | Purpose |
|---|---|---|
| `owner` | `address` | Project creator who may withdraw funds |
| `projectName` | `string` | Name of the predefined project |
| `goal` | `uint256` | Target amount in wei |
| `deadline` | `uint256` | Unix timestamp when funding closes |
| `totalRaised` | `uint256` | Total wei contributed |
| `fundsWithdrawn` | `bool` | Prevents double withdrawal |
| `contributions` | `mapping(address => uint256)` | Amount contributed per address |
| `contributors` | `address[]` | List of unique contributor addresses |

### Functions

| Function | Access | Description |
|---|---|---|
| `constructor(name, goalInWei, durationInMinutes)` | Deploy | Sets project name, goal, and deadline |
| `contribute()` | `payable` | Accepts Ether before the deadline |
| `withdrawFunds()` | Owner only | Sends all funds to owner after deadline if goal met |
| `refund()` | Contributor | Returns contribution if deadline passed and goal not met |
| `timeLeft()` | `view` | Seconds remaining before the deadline (0 if ended) |
| `getContributorsCount()` | `view` | Number of unique contributors |
| `getStatus()` | `view` | Returns `0` (Active), `1` (Successful), or `2` (Failed) |

### Events

- `ContributionReceived(address contributor, uint256 amount, uint256 totalRaised)`
- `FundsWithdrawn(address owner, uint256 amount)`
- `RefundIssued(address contributor, uint256 amount)`

---

## Quick Start (Remix IDE)

1. Open <https://remix.ethereum.org> and paste `contracts/Crowdfunding.sol`.
2. **Compiler tab**: select version **0.8.20**, click **Compile Crowdfunding.sol** (green tick).
3. **Deploy & Run tab**: Environment = **Remix VM (Cancun)**.
4. Constructor inputs:
   - `_projectName`: `Smart Library Project`
   - `_goalInWei`: `5000000000000000000` (5 ETH)
   - `_durationInMinutes`: `5`
5. Click **Deploy** from Account 1 (owner).
6. Switch to Accounts 2, 3, 4 to call `contribute()` with ETH values.

Full walkthrough → [`docs/01-REMIX-GUIDE.md`](docs/01-REMIX-GUIDE.md)

---

## Testing

### Manual tests (Remix VM)
25 test cases covering deployment, contributions, withdrawals, refunds, and all reverts.
→ [`docs/02-TEST-CASES.md`](docs/02-TEST-CASES.md)

### Automated tests (Node.js)
Requires Node.js 18+:

```bash
cd test
npm install
npm test
```

The script compiles the contract with solc-js, deploys it on a local Ganache chain, and
runs all scenarios including time-skipping to simulate deadline expiry.

---

## Security Notes

- **Checks-Effects-Interactions**: state updated before any ETH transfer.
- **Re-entrancy safe**: `contributions[msg.sender] = 0` before `call` in `refund()`;
  `fundsWithdrawn = true` before `call` in `withdrawFunds()`.
- **Access control**: `onlyOwner` modifier on `withdrawFunds()`.
- **Pull refunds**: each contributor withdraws individually — one failure cannot block others.
- **Solidity 0.8.x**: built-in integer overflow/underflow protection.
- **Educational project**: not audited; do not use with real funds.

---

## Demo Video

`<!-- ADD YOUR DEMO VIDEO LINK HERE -->`

---

## GitHub Repository

`<!-- ADD YOUR GITHUB REPOSITORY LINK HERE -->`

---

## License

MIT — see [LICENSE](LICENSE).
