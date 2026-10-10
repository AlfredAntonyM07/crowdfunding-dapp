# 07 – Submission Checklist

**Assignment II – Crowdfunding Smart Contract**
Alfred Antony M | 711523BCB007

Work through this list from top to bottom before submitting.

---

## Smart Contract

- [ ] `contracts/Crowdfunding.sol` compiles in Remix 0.8.20 with **zero errors**
- [ ] Contract has: `constructor`, `contribute()`, `withdrawFunds()`, `refund()`,
      `timeLeft()`, `getContributorsCount()`, `getStatus()`
- [ ] All events defined: `ContributionReceived`, `FundsWithdrawn`, `RefundIssued`
- [ ] No leftover debug code; comments present

---

## Remix Testing

- [ ] All 25 test cases (TC01–TC25) run in Remix VM
- [ ] **Actual Result** and **Pass/Fail** columns filled in from real Remix output
- [ ] All 25 test cases show **Pass**
- [ ] 25 screenshots captured and saved in `screenshots/` with the correct filenames
      (see `docs/03-SCREENSHOTS.md`)

---

## Deployment Details

- [ ] `docs/04-DEPLOYMENT-DETAILS.md` completed with real values:
  - [ ] Remix VM version and date
  - [ ] All four account addresses
  - [ ] Contract A address and deployment tx hash
  - [ ] Contract B address and deployment tx hash
  - [ ] Transaction hashes for TC02, TC03, TC04, TC11, TC14, TC15, TC22, TC24
  - [ ] Gas used for deployment

---

## GitHub Repository

- [ ] Repository created (public, or shared with instructor if private)
- [ ] All files pushed:
  - [ ] `contracts/Crowdfunding.sol`
  - [ ] `frontend/index.html`
  - [ ] `test/crowdfunding.test.js` and `test/package.json`
  - [ ] `docs/` (all 8 markdown files)
  - [ ] `screenshots/` (all 25 PNG files)
  - [ ] `README.md` (with your name, roll number, and real demo video link)
  - [ ] `LICENSE`
  - [ ] `.gitignore`
- [ ] Repository link opens correctly in a private / incognito window
- [ ] Screenshots are **visible** in the GitHub repo (not just the `.gitkeep`)

```bash
git init
git add .
git commit -m "Assignment II: Crowdfunding smart contract - Alfred Antony M (711523BCB007)"
git branch -M main
git remote add origin <YOUR-GITHUB-REPO-URL>
git push -u origin main
```

---

## Demo Video

- [ ] Duration: **2–5 minutes**
- [ ] Voice is audible; screen is readable at full-screen
- [ ] Shows all of: compile, deploy, contribute (3 accounts), withdraw (success), failed campaign, refund
- [ ] Revert messages visible for at least 2 seconds each
- [ ] Uploaded to Google Drive (link sharing on) or YouTube (unlisted)
- [ ] Video link **added to `README.md`** and works without login

---

## Optional DApp

- [ ] `frontend/index.html` opened and tested in a browser with MetaMask on Sepolia
- [ ] Screenshot of the DApp added to `screenshots/`
- [ ] DApp screenshot and description included in the report (if built)

---

## Report (PDF)

- [ ] Follows the structure in `docs/06-REPORT-STRUCTURE.md`
- [ ] Name **Alfred Antony M** and register number **711523BCB007** on the first page
- [ ] Contains: aim, introduction, design, source code, security notes, test table,
      screenshots, deployment details, GitHub link, video link, conclusion, references
- [ ] No `____` placeholders remaining
- [ ] No invented addresses, hashes, or test results
- [ ] Exported as **PDF** (not .doc / .docx)
- [ ] File size reasonable (under 20 MB)

---

*Everything above must be checked before submission. An unchecked item is a submission gap.*
