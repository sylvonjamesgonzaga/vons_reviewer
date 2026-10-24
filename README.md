# ReviewLab — CCAR-F Study Website (Claude Data Edition)

A fully responsive **Next.js + TypeScript + Tailwind CSS + Motion** reviewer. All education content is imported directly from the five JSON files provided with `CODEX_BRIEF.md`; content has **not** been rewritten by the website. The mini quiz and mock exam use two **independent** question banks.

## Start on Windows

1. Extract `ReviewLab-Claude-Integrated-COMPLETE.zip`.
2. Open `reviewlab-starter` in VS Code, then Terminal / CMD.
3. Run:

   ```cmd
   npm install
   npm run dev
   ```

4. Open **http://localhost:3000** (or the Local URL that Next.js displays).

Or double-click `START-HERE-WINDOWS.bat`. If you previously installed ReviewLab, you can replace the *entire old project folder* with this new one. Keep your old folder under another name as a backup first.

## Commands

```cmd
npm run dev         # local development
npm run validate    # validate source JSON and question keys (no extra dependencies)
npm run typecheck   # check TypeScript (requires npm install)
npm run build       # production build (requires npm install)
npm start           # serve production build
```

## Contents and routes

| URL | Purpose |
|---|---|
| `/` | Overview, progress, five domain weights and core rules |
| `/study` | 30 lessons in 5 domains; steps, terms, tips, source tables and code |
| `/study-plan` | Suggested 12-day schedule over the 30 lessons |
| `/objectives` | All 29 score-report objectives |
| `/traps` | Exam traps with show/hide solutions |
| `/flashcards` | 88 glossary terms and tracked flip-card practice |
| `/cheat-sheet` | Rules, 79 trigger patterns, 25 matrices, 6 scenarios |
| `/mini-quiz` | 25-question independent question bank (Quick 10, 5/domain or all 25); immediate feedback |
| `/mock-exam` | 60 questions, 120 minutes, flagging, navigator, exact-set multi-select scoring and full explanations at submission |
| `/progress` | Local score history, curriculum and domain progress |

`/quick-10` and `/full-exam` also redirect to the two separate quiz routes.

## Editable study materials

The **only files you need to change to edit study content** are in `data/`:

- `domains-1-2.json` — Domains 1–2
- `domains-3-5.json` — Domains 3–5
- `reference.json` — exam facts, five rules, six scenarios, glossary, matrices and triggers
- `mini-quiz.json` — 25 standalone quick-check questions
- `mock-exam.json` — 60 independent mock questions (single/multiple-response)

Question fields: `id`, `domain`, `type`, `q`, `options`, `answer` (array), `why`; multi questions additionally have `pick`. Mock questions have `scenario`, mini questions have `task`.

No database is needed. Completion, flashcard ratings and attempt history are in browser `localStorage`; an active quiz attempt is saved to `sessionStorage`, so it usually survives a refresh in the same tab. Mock time continues to elapse during refresh/background tabs. Browser storage is device-specific and can be cleared.

## Deployment to Vercel

Push the project to your GitHub repository (do **not** upload `node_modules`). In Vercel choose **Add New → Project**, import the repo, keep the Next.js preset, and deploy. No environment variables or backend are required. You can run `npm run build` locally first.

## Content attribution and permission

The CCAR-F independent practice questions are adapted in the supplied `mock-exam.json` from **Matthew Purcell**, *Claude Certified Architect – Foundations Practice Question Set, Version 2*. The app shows attribution on the mock-exam start and results screens. These are **not actual exam questions**. Obtain permission from the original author **before public publication** of the adapted practice set. The learning material references the Anthropic Exam Guide v1.0 (July 2026); check the latest official guide for updates. ReviewLab is not affiliated with Anthropic.

## Validation note

The dataset was verified for referential integrity, question counts, domain/scenario assignment, and answer keys. A TypeScript/JSX syntax parse succeeded; a live `next build` could not be run in the authoring environment because npm registry DNS/network access was unavailable. Please run `npm install && npm run build` locally before deployment.
