# 05 – Demo Video Script (~4 minutes)

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Record your screen (Windows: Win + G / OBS; Mac: QuickTime; or Loom) with your voice.
Keep Remix at a readable zoom (100% or larger).
**Practise once before recording** — a page refresh resets Remix VM.

For the demo, deploy Contract A with **5-minute duration** and Contract B with **3-minute
duration** so you do not wait too long for the deadline.

---

## Script

| Time        | On screen                                       | What to say (in your own words)                                                                                                                                |
|-------------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0:00 – 0:20 | Title slide or Remix with the `.sol` file open  | "This is Assignment II — a crowdfunding smart contract. My name is Alfred Antony M, register number 711523BCB007."                                            |
| 0:20 – 0:55 | Scroll through `Crowdfunding.sol`               | "The contract stores the project name, goal in wei, and a deadline. Contributions are tracked per address. There are three main functions: contribute, withdrawFunds, and refund." |
| 0:55 – 1:15 | Compiler tab → Deploy tab                       | "I compiled with Solidity 0.8.20. I'm deploying on Remix VM with the project name 'Smart Library Project', goal 5 ETH in wei, and a 5-minute duration."      |
| 1:15 – 1:50 | contribute from Account 2 (2 ETH), Account 3 (2 ETH), Account 4 (1 ETH); read totalRaised and getContributorsCount | "Three contributors fund the project — 2, 2 and 1 ETH. The goal of 5 ETH is reached. getContributorsCount shows 3." |
| 1:50 – 2:15 | Try withdrawFunds before deadline → revert; skip time; withdrawFunds succeeds; show owner balance | "withdrawFunds reverts before the deadline. After I advance the time past the deadline, the owner withdraws all 5 ETH. The contract balance goes to zero." |
| 2:15 – 2:35 | Show fundsWithdrawn = true, getStatus = 1, double-withdraw revert | "fundsWithdrawn is now true, getStatus returns Successful, and a second withdrawal reverts." |
| 2:35 – 3:10 | Deploy Contract B (goal 5 ETH, 3 min); C1 = 1 ETH, C2 = 1 ETH; skip time; getStatus = Failed | "For the failure scenario I deploy a fresh contract. Only 2 of 5 ETH is raised. After the deadline the status is Failed." |
| 3:10 – 3:30 | Try contribute after deadline → revert; try withdrawFunds → revert | "'Campaign has ended' blocks late contributions. 'Goal not reached' blocks the owner withdrawal." |
| 3:30 – 3:55 | refund by C1 → success; second refund → revert; refund by C2 → success | "Each contributor pulls their own refund. A second attempt reverts with 'No contribution found'. The contract balance returns to zero." |
| 3:55 – 4:15 | GitHub repo page or README                      | "All the source code, test cases, and documentation are on GitHub. Thank you."                                                                                |

---

## Tips

- While waiting for the 3-minute deadline, narrate the security features
  (checks-effects-interactions, re-entrancy protection, pull refunds).
- Hold each revert message on screen for at least **2 seconds** so it is readable.
- Speak clearly; the demo does not need to be perfect, just understandable.
- Keep the total video under **5 minutes**.
- Upload to Google Drive (unlisted) or YouTube (unlisted) and paste the link in the README.
