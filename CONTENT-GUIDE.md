# CCAR-F content guide — two independent quiz banks

**Quick 10 (`/quick-10`)** uses `QUICK_QUESTIONS` in `lib/data.ts`.
- Original concise concept-check questions written from the 64-page CCA-F Reviewer material.
- Ten randomly chosen questions per attempt.
- Answers and explanations appear after checking each question.
- Not reused in the mock exam.

**Mock Exam (`/full-exam`)** uses `MOCK_EXAM_QUESTIONS` in `lib/exam-questions.ts`.
- All **60** questions from the user-supplied *CCAR-F Practice Questions v2* PDF by Matthew Purcell.
- Preserves question labels 1.1–6.10, question wording, 4/5 options, correct answers, rationales, domains, and 6 scenario contexts.
- Contains 11 multi-response items with two correct selections each, plus 49 single-choice items.
- Exam questions are presented in scenario order, a 120-minute timer counts down, and results appear only after submitting or the timer runs out.
- Mock scores are ordinary percentages, not the official scaled certification grade.

The **Study** section is a condensed 15-lesson CCAR-F guide created from the supplied 64-page reviewer. For full details, consult the uploaded original reviewer PDF; these 15 summaries are not a page-for-page reproduction.

Progress and sessions save to browser localStorage. The old placeholder question bank has been replaced. Previous placeholder attempts may remain in history but are not part of the new banks.

## Changing questions later

In `lib/data.ts`, edit `quickBank` tuples or replace `QUICK_QUESTIONS`.
In `lib/exam-questions.ts`, edit the exported 60-item array. Each item has `type` (`single`/`multi`), `options` (4 or 5 strings), and `correctIndices` (0-based option indices, e.g. `[1,3]` means B and D). Do not give two quiz modes the same IDs.

Quiz session storage keys include `.v2` to avoid loading old incompatible saved sessions. Local progress/history remains separate for the two modes.
