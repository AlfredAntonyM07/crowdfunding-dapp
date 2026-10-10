# 04 – Deployment and Transaction Details

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Every value below is **specific to your Remix session**.
Copy real values from Remix (expand terminal rows with the ▼ arrow; copy the contract address
from the copy icon next to `CROWDFUNDING AT 0x…`).
**Do not guess or reuse values from any other source.**

---

## Environment

| Item                     | Value                          |
|--------------------------|--------------------------------|
| Network / Environment    | Remix VM (Cancun)              |
| Solidity compiler        | 0.8.20                         |
| Compiler settings        | Optimization: off (default)    |
| Deployed on (date/time)  | `________________________`     |

---

## Accounts used

| Role              | Account in Remix | Address                      |
|-------------------|------------------|------------------------------|
| Owner (Account 1) | Account 1        | `____________________________` |
| C1 (Account 2)    | Account 2        | `____________________________` |
| C2 (Account 3)    | Account 3        | `____________________________` |
| C3 (Account 4)    | Account 4        | `____________________________` |

---

## Contract A – Successful Campaign

Constructor arguments: `"Smart Library Project"`, `5000000000000000000`, `5`

| Item                                   | Value                          |
|----------------------------------------|--------------------------------|
| Contract address                       | `____________________________` |
| Deployment transaction hash            | `____________________________` |
| Gas used / transaction cost            | `____________________________` |
| `goal()` (wei)                         | `5000000000000000000`          |
| `deadline()` (Unix timestamp)          | `____________________________` |

---

## Contract B – Failed Campaign

Constructor arguments: `"Smart Library Project"`, `5000000000000000000`, `5`

| Item                          | Value                          |
|-------------------------------|--------------------------------|
| Contract address              | `____________________________` |
| Deployment transaction hash   | `____________________________` |
| `deadline()` (Unix timestamp) | `____________________________` |

---

## Key Transactions

Fill in from the Remix terminal (expand each row with the ▼ arrow).

### Scenario A

| TC   | Function          | From  | Value  | Transaction Hash               | Status  |
|------|-------------------|-------|--------|--------------------------------|---------|
| TC02 | `contribute()`    | C1    | 2 ETH  | `____________________________` | Success |
| TC03 | `contribute()`    | C2    | 2 ETH  | `____________________________` | Success |
| TC04 | `contribute()`    | C3    | 1 ETH  | `____________________________` | Success |
| TC11 | `withdrawFunds()` | Owner | 0      | `____________________________` | Success |

### Scenario B

| TC   | Function       | From  | Value  | Transaction Hash               | Status  |
|------|----------------|-------|--------|--------------------------------|---------|
| TC14 | `contribute()` | C1    | 1 ETH  | `____________________________` | Success |
| TC15 | `contribute()` | C2    | 1 ETH  | `____________________________` | Success |
| TC22 | `refund()`     | C1    | 0      | `____________________________` | Success |
| TC24 | `refund()`     | C2    | 0      | `____________________________` | Success |

> Reverted transactions do not need hash values — the revert reason in the terminal is
> sufficient evidence.

---

## Gas summary (approximate)

| Operation         | Gas used (approx.) |
|-------------------|--------------------|
| Deployment        | ~`______`          |
| `contribute()`    | ~`______`          |
| `withdrawFunds()` | ~`______`          |
| `refund()`        | ~`______`          |

---

## Optional: Sepolia testnet

If your instructor requires a public testnet deployment, use
**Injected Provider – MetaMask** on Sepolia and record details here.

| Item              | Value                          |
|-------------------|--------------------------------|
| Sepolia contract address | `____________________________` |
| Etherscan link    | `____________________________` |

See `docs/08-DAPP-SETUP.md` for step-by-step Sepolia deployment instructions.
