# 03 – Screenshots to Capture

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Save all screenshots in the `screenshots/` folder using the filenames below.
Capture the **entire Remix window** (left panel + contract panel + terminal) so
the instructor can see all the relevant information at once.

---

## Capture order (follow while running test cases)

| #  | Filename                            | When to take it                    | Must show                                                                                                 |
|----|-------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------|
| 1  | `01_code_editor.png`                | After pasting code                 | File Explorer with `contracts/Crowdfunding.sol` open and code visible                                     |
| 2  | `02_compiler_success.png`           | After clicking Compile             | Solidity Compiler panel: version 0.8.20 selected, **green tick** on the compiler icon                    |
| 3  | `03_deploy_inputs.png`              | Before clicking Deploy (Contract A)| Deploy panel: Remix VM, Account 1 selected, constructor fields filled: `Smart Library Project`, `5000000000000000000`, `5` |
| 4  | `04_deployed_contract.png`          | After Deploy                       | Deployed Contracts section with all function buttons; terminal deploy row visible                         |
| 5  | `05_initial_state.png`              | After clicking blue view buttons   | `owner()`, `projectName()`, `goal()` = 5000000000000000000, `totalRaised()` = 0, `getStatus()` = 0       |
| 6  | `06_contribute_C1.png`              | TC02: C1 contributes 2 ETH         | Account 2 selected, Value = 2 Ether, successful tx in terminal; `contributions(C1)`, `totalRaised` shown  |
| 7  | `07_contribute_C2.png`              | TC03: C2 contributes 2 ETH         | Account 3, Value = 2 Ether, successful tx; `totalRaised` = 4 ETH, `getContributorsCount()` = 2           |
| 8  | `08_contribute_C3.png`              | TC04: C3 contributes 1 ETH         | Account 4, Value = 1 Ether, successful tx; `totalRaised` = 5 ETH, `getContributorsCount()` = 3           |
| 9  | `09_zero_value_revert.png`          | TC05                               | Terminal **red** revert: `"Contribution must be greater than 0"`                                          |
| 10 | `10_withdraw_before_deadline.png`   | TC06                               | Terminal revert: `"Campaign still active"`                                                                |
| 11 | `11_refund_before_deadline.png`     | TC07                               | Terminal revert: `"Campaign still active"` (C1 calling refund)                                            |
| 12 | `12_unauthorized_withdraw.png`      | TC08                               | Account 2 selected; terminal revert: `"Only owner allowed"`                                              |
| 13 | `13_time_travel.png`                | After running evm_increaseTime     | Terminal showing the time-skip commands and `timeLeft()` = 0                                              |
| 14 | `14_refund_goal_reached.png`        | TC09                               | Terminal revert: `"Goal reached, no refund"`                                                              |
| 15 | `15_contribute_after_deadline.png`  | TC10                               | Terminal revert: `"Campaign has ended"`                                                                   |
| 16 | `16_owner_withdraw_success.png`     | TC11                               | Account 1 selected; successful `withdrawFunds` tx in terminal; `fundsWithdrawn()` = true; `getStatus()` = 1; owner balance shown |
| 17 | `17_double_withdraw_revert.png`     | TC12                               | Terminal revert: `"Funds already withdrawn"`                                                              |
| 18 | `18_contract_b_setup.png`           | TC13–TC15 (Contract B)             | Contract B deployed; C1 = 1 ETH, C2 = 1 ETH; `totalRaised` = 2 ETH; `getContributorsCount()` = 2        |
| 19 | `19_failed_deadline_revert.png`     | TC19: contribute after B's deadline| Terminal revert: `"Campaign has ended"`                                                                   |
| 20 | `20_failed_status.png`              | TC20                               | `getStatus()` = 2 (Failed); `timeLeft()` = 0                                                             |
| 21 | `21_owner_withdraw_failed.png`      | TC21                               | Terminal revert: `"Goal not reached"`                                                                     |
| 22 | `22_refund_success.png`             | TC22: C1 refund                    | C1's balance before and after (or account dropdown); `RefundIssued` event in terminal; `contributions(C1)` = 0 |
| 23 | `23_duplicate_refund.png`           | TC23                               | Terminal revert: `"No contribution found"` (C1 second refund)                                             |
| 24 | `24_c2_refund.png`                  | TC24                               | C2 refund success; contract balance = 0                                                                   |
| 25 | `25_non_contributor_refund.png`     | TC25                               | C3 (never contributed) revert: `"No contribution found"`                                                 |

---

## Tips

- Zoom the browser to **100%** so addresses are fully readable.
- Clear the Remix terminal (trash icon) before a group of tests to keep screenshots clean.
- Expand terminal rows (▼ arrow) for at least one transaction to show the full tx hash, gas, and event log.
- Never edit or fabricate values in screenshots. Add arrows or boxes only to highlight, not to replace text.
- If you miss a screenshot, you must re-run that test case from a fresh Remix VM session.
