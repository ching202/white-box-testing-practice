# Learning Practice: White Box Testing

Completed practice based on the corrected **newWeek5.zip** Todo List starter.
The updated assignment tests only `src/todoUtils.ts`.

**[Read the completed write-up](WHITE-BOX-REPORT.md).**

## Results

- **8 passing tests** in one file, grouped into **3 describe suites**.
- **100% statements, branches, functions, and lines** for `todoUtils.ts`.
- Loop cases cover zero, one, and three iterations.
- Omitting the blank-input cases lowers branch coverage to **75%** and leaves
  line 16 uncovered; all cases are enabled in the final submission.
- Production build, ESLint, and test TypeScript checks pass.

## Run

Install Node.js compatible with the locked Vite dependencies (Node 24 was used),
then run these commands from this repository:

```sh
npm ci
npm test
npm run coverage
npm run build
npm run lint
npm run typecheck:tests
```

To try the application yourself:

```sh
npm run dev
```

Open the local URL printed by Vite. No backend is needed. Add a few todos, try
blank input, and toggle checkboxes. Browser testing was not completed in this
submission; the user requested continuation without the browser.

## Submission files

| File | Purpose |
| --- | --- |
| [WHITE-BOX-REPORT.md](WHITE-BOX-REPORT.md) | Source analysis, test mapping, coverage results, experiment, and limitations |
| [src/todoUtils.test.ts](src/todoUtils.test.ts) | The eight tests and three logical suites |
| [src/todoUtils.ts](src/todoUtils.ts) | Unchanged production functions under test |
| [coverage/index.html](coverage/index.html) | Generated HTML report; open locally after downloading or cloning |
| [coverage/coverage-summary.json](coverage/coverage-summary.json) | Machine-readable final metrics |
| [evidence/coverage-output.txt](evidence/coverage-output.txt) | Final test and coverage output |
| [evidence/branch-experiment-output.txt](evidence/branch-experiment-output.txt) | Measured coverage drop when blank cases are omitted |
| [ASSIGNMENT.md](ASSIGNMENT.md) | Original corrected assignment instructions |
| [README-STARTER.md](README-STARTER.md) | Original Vite starter documentation |

The report and coverage artifacts were generated for this submission. Coverage
is scoped to the utility file, as the corrected README requires; it is not a
claim of full React application coverage. `private: true` in `package.json`
prevents accidental npm publication and does not control GitHub visibility.

AI assistance was used for source review, test implementation, validation, and
the write-up. The production application code is preserved.
