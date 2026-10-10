# 02 – Test Cases

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Run all tests in **Remix VM (Cancun)**. Fill in the **Actual Result** and **Pass/Fail**
columns from what Remix actually shows. Never guess or copy from anyone else's output.

---

## Accounts

| Role    | Account in Remix | Address (paste here) |
|---------|------------------|----------------------|
| Owner   | Account 1        | `____________________` |
| C1      | Account 2        | `____________________` |
| C2      | Account 3        | `____________________` |
| C3      | Account 4        | `____________________` |

---

## Contract deployments

| Contract | `_projectName`          | `_goalInWei`          | `_durationInMinutes` |
|----------|-------------------------|-----------------------|----------------------|
| **A**    | `Smart Library Project` | `5000000000000000000` | `5`                  |
| **B**    | `Smart Library Project` | `5000000000000000000` | `5`                  |

Run **Part 1** (Scenario A), then fast-forward time and deploy **Contract B** for Part 2.

---

## Part 1: Scenario A – Successful Campaign

| TC   | Account | Function / Action             | Input / Value               | Expected Result                                                                                                  | Actual Result | Pass/Fail |
|------|---------|-------------------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------|---------------|-----------|
| TC01 | Owner   | Deploy Contract A             | Name, 5 ETH wei, 5 min      | Deployed. `owner()` = Account 1 address; `projectName()` = "Smart Library Project"; `goal()` = 5000000000000000000; `totalRaised()` = 0; `getStatus()` returns 0 (Active) | | |
| TC02 | C1      | `contribute()`                | Value = 2 ETH               | Succeeds. `ContributionReceived` event emitted. `contributions(C1)` = 2000000000000000000; `totalRaised()` = 2000000000000000000 | | |
| TC03 | C2      | `contribute()`                | Value = 2 ETH               | Succeeds. `totalRaised()` = 4000000000000000000; `getContributorsCount()` = 2 | | |
| TC04 | C3      | `contribute()`                | Value = 1 ETH               | Succeeds. `totalRaised()` = 5000000000000000000; `getContributorsCount()` = 3 | | |
| TC05 | C1      | `contribute()`                | Value = 0 ETH               | **Reverts**: `"Contribution must be greater than 0"` | | |
| TC06 | Owner   | `withdrawFunds()`             | Value = 0                   | **Reverts**: `"Campaign still active"` (deadline not reached) | | |
| TC07 | C1      | `refund()`                    | Value = 0                   | **Reverts**: `"Campaign still active"` | | |
| TC08 | C1      | `withdrawFunds()`             | Value = 0                   | **Reverts**: `"Only owner allowed"` (non-owner attempt) | | |
| TC09 | C1      | `refund()` after deadline     | Value = 0 (skip time first) | **Reverts**: `"Goal reached, no refund"` (goal was met) | | |
| TC10 | Owner   | `contribute()` after deadline | Value = 1 ETH               | **Reverts**: `"Campaign has ended"` | | |
| TC11 | Owner   | `withdrawFunds()`             | Value = 0 (after deadline)  | Succeeds. `FundsWithdrawn` event emitted. Owner balance increases by ~5 ETH; `address(contract).balance` = 0; `fundsWithdrawn()` = true; `getStatus()` returns 1 (Successful) | | |
| TC12 | Owner   | `withdrawFunds()` (again)     | Value = 0                   | **Reverts**: `"Funds already withdrawn"` | | |

---

## Part 2: Scenario B – Failed Campaign

| TC   | Account | Function / Action              | Input / Value                      | Expected Result                                                                               | Actual Result | Pass/Fail |
|------|---------|--------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------|---------------|-----------|
| TC13 | Owner   | Deploy Contract B              | Name, 5 ETH wei, 5 min             | Deployed. `timeLeft()` ≈ 300 seconds; `totalRaised()` = 0 | | |
| TC14 | C1      | `contribute()`                 | Value = 1 ETH                      | Succeeds. `totalRaised()` = 1000000000000000000 | | |
| TC15 | C2      | `contribute()`                 | Value = 1 ETH                      | Succeeds. `totalRaised()` = 2000000000000000000; `getContributorsCount()` = 2 | | |
| TC16 | Owner   | `withdrawFunds()`              | Value = 0 (before deadline)        | **Reverts**: `"Campaign still active"` | | |
| TC17 | C1      | `refund()`                     | Value = 0 (before deadline)        | **Reverts**: `"Campaign still active"` | | |
| TC18 | any     | `timeLeft()`                   | none (after skipping time)         | Returns `0` | | |
| TC19 | C3      | `contribute()`                 | Value = 1 ETH (after deadline)     | **Reverts**: `"Campaign has ended"` | | |
| TC20 | any     | `getStatus()`                  | none                               | Returns `2` (Failed) | | |
| TC21 | Owner   | `withdrawFunds()`              | Value = 0 (after deadline)         | **Reverts**: `"Goal not reached"` | | |
| TC22 | C1      | `refund()`                     | Value = 0                          | Succeeds. `RefundIssued` event emitted. C1 balance increases by ~1 ETH; `contributions(C1)` = 0 | | |
| TC23 | C1      | `refund()` (second time)       | Value = 0                          | **Reverts**: `"No contribution found"` | | |
| TC24 | C2      | `refund()`                     | Value = 0                          | Succeeds. C2 balance increases by ~1 ETH; contract balance = 0 | | |
| TC25 | C3      | `refund()`                     | Value = 0 (never contributed)      | **Reverts**: `"No contribution found"` | | |

---

## Result Summary

| Category                          | Test Cases                     |
|-----------------------------------|--------------------------------|
| Deployment                        | TC01, TC13                     |
| Valid contribution                | TC02, TC03, TC04, TC14, TC15   |
| Multiple users / contributor count| TC03, TC04, TC15               |
| Goal tracking (totalRaised)       | TC02, TC03, TC04               |
| Zero-value contribution           | TC05                           |
| Withdraw before deadline          | TC06, TC16                     |
| Refund before deadline            | TC07, TC17                     |
| Unauthorized withdrawal           | TC08                           |
| Deadline enforcement (contribute) | TC10, TC19                     |
| Refund on successful campaign     | TC09                           |
| Successful owner withdrawal       | TC11                           |
| Double withdrawal                 | TC12                           |
| timeLeft after deadline           | TC18                           |
| Failed campaign status            | TC20                           |
| Failed campaign: owner withdraw   | TC21                           |
| Contributor refund                | TC22, TC24                     |
| Double refund attempt             | TC23                           |
| Non-contributor refund            | TC25                           |

**All 25 test cases must show Pass. If any show Fail, re-check the inputs and revert reason.**

---

## Automated tests (optional cross-check)

Run the automated script on a local Ganache chain:

```bash
cd test
npm install
npm test
```

The script covers all 20 required scenarios plus extras. Paste the console output into your
report as additional evidence.
