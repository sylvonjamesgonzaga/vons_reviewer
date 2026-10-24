# CCA-F Reviewer Website: Build Brief for Codex

Build a static, mobile-friendly study website for the **Claude Certified Architect - Foundations (CCAR-F / CCA-F)** exam. All content is already written and structured in `data/*.json`. Do NOT rewrite or invent content; render it.

## Suggested stack
Vanilla HTML/CSS/JS or Vite + React or Astro. No backend. Load JSON with `fetch` (or import). Persist progress in `localStorage`. Support light/dark mode.

## Data files (in `data/`)

| File | Contents |
|---|---|
| `domains-1-2.json` | `domains[]` for Domains 1 and 2 |
| `domains-3-5.json` | `domains[]` for Domains 3, 4, 5 |
| `reference.json` | `examFacts`, `fiveRules`, `scenarios`, `triggers`, `matrices`, `glossary` |
| `mini-quiz.json` | 25 quick questions (5 per domain) |
| `mock-exam.json` | 60-question mock exam (10 per scenario) |

Merge `domains-1-2.json` and `domains-3-5.json` into one list of 5 domains at load time.

### Domain object
```
id, slug, title, weight (percent), approxQuestions, summary,
taskStatements[]: { id, title, oneLine, keywords[], concept[], steps[], examTip,
                    table?{title,columns,rows}, table2?{...}, code?, diagram? },
testObjectives[]: { id (TO-x.y), text, keyPoints[], code? },
traps[]: { wrong, right, why }
```
`concept`, `steps`, and `keyPoints` are arrays of strings (render as paragraphs / numbered list / bullets). `table` and `table2` are optional extra tables. `code` is a preformatted block. `steps` and `concept` may be empty arrays (e.g. task 3.5).

### Quiz / exam question object
```
id, domain (1-5), scenario (exam only), task (mini only),
type: "single" | "multi", pick (multi only: number to select),
q, options: { A: "...", B: "..." }, answer: ["B"] or ["B","D"], why
```
Grade multi-select as correct only if the selected set equals `answer` exactly.

## Pages / routes

1. **Home / Dashboard**: exam facts (`examFacts`), domain weight chart (bar or donut using `weight`), progress summary (sections read, mini-quiz best scores, mock-exam history), buttons for Study, Quiz, Mock Exam, Cheat Sheet.
2. **Study (Reviewer)**: sidebar listing the 5 domains and their task statements. Each task statement page shows: title, `oneLine` as a highlighted summary, **Key Terms** (chips from `keywords`), concept, steps, tables, code, and an **Exam Tip** callout (visually distinct). A "Mark as read" toggle stored in localStorage.
3. **Test Objectives**: all 29 `testObjectives` filterable by domain, each as an expandable card showing `text` and `keyPoints`. This mirrors the score report ("Score Report Focus").
4. **Exam Traps**: per domain, a 3-column table or card list: Wrong answer / Correct answer / Why. Add a toggle to hide the "Correct" column so users can self-test.
5. **Key Terms / Flashcards**: two views. (a) searchable glossary list from `glossary`; (b) flashcard mode (term front, definition back) with "knew it / didn't" tracking and shuffle. Optionally also build cards from each task statement's `keywords`.
6. **Cheat Sheet**: (a) `fiveRules` as prominent cards; (b) **Trigger -> Solution** searchable table from `triggers` with the `ref` shown as a link to the matching task statement or test objective; (c) the 25 `matrices` as collapsible comparison tables (show `rule` as a callout when present); (d) `scenarios` cards.
7. **Mini Quiz**: filter by domain or all 25; one question at a time; instant feedback with `why`; score screen; "retry missed" button. Store best score per domain.
8. **Mock Exam**: 60 questions, **120-minute countdown timer**, question navigator grid (answered / flagged / unanswered), flag-for-review, pause not required. Submit shows: overall score %, pass target line at `passTargetPercent` (75), **score by domain** (5 bars, mark any below 75%), **score by scenario**, and full review of every question (your answer vs correct, `why`). Show the `credit` text on the exam start and results pages. Option to retake or practice only one scenario or only wrong answers. Save attempt history in localStorage.

## UX requirements
- Mobile first, readable tables (horizontal scroll inside the table container, not the page).
- Global search (ctrl/cmd+K) across task statements, glossary, triggers.
- Keyboard shortcuts in quizzes: A-E to select, Enter to submit/next.
- Show a "Domain 1-5" colored badge on every question and task.
- Accessible: semantic headings, focus states, color contrast, not color-only correctness indication.
- Question option order is as given (no shuffling for the mock exam; optional shuffle for mini quiz).
- Render `multi` questions with checkboxes and the text "Select TWO".

## Content notes
- Exam facts: 60 questions, 120 min, passing scaled score 720 of 1,000, 4 of 6 scenarios used per live exam. Domain weights: D1 27%, D2 18%, D3 20%, D4 20%, D5 15%.
- The five exam-rewarded rules (`fiveRules`) should appear on the home page and cheat sheet.
- The mock exam is adapted from Matthew Purcell's independent practice set (see `credit` in `mock-exam.json`). Keep the credit visible. Do not claim it is real exam content, and confirm permission with the author before publishing publicly.
- Source of the reviewer material: Anthropic Exam Guide v1.0 (July 2026). Add a footer note to check the official guide for changes.

## Deliverable
A runnable project with a README (how to run and deploy as a static site, e.g. GitHub Pages / Netlify / Vercel).
