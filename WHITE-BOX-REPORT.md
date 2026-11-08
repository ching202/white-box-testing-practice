# Learning Practice: White Box Testing

## Scope

This submission follows the corrected `newWeek5.zip`. Its README specifies the
small Todo List application and tests only `src/todoUtils.ts`, even though the
Canvas summary mentions North Vacation Booking. The original instructions are
preserved in [ASSIGNMENT.md](ASSIGNMENT.md).

The implementation was read before designing the tests. Its three functions have
different internal structures: `createTodo` returns an object, `addTodo` contains
an early-return decision, and `countDone` contains a loop with a decision inside it.
The production application code has not been changed.

## Test organization

[src/todoUtils.test.ts](src/todoUtils.test.ts) is the single test file. It contains
three `describe` suites and eight executed test cases:

| Suite | Cases | Purpose |
| --- | ---: | --- |
| `createTodo statement coverage` | 1 | Execute the return statement and verify the new object's properties. |
| `addTodo branch coverage` | 4 | Three blank-input cases plus one valid-input case execute both outcomes. |
| `countDone loop coverage` | 3 | Exercise zero, one, and three iterations, including finished and unfinished items. |

The blank inputs use `it.each`, so that block generates three separate cases.
Jest's console summary reports **one test suite** because it counts test files;
the assignment's three logical suites are the three `describe` blocks inside it.

## Step 1: Statement coverage

`createTodo` has no branch. Its return statement at line 9 creates an object with
an ID from `Date.now()`, the supplied text, and `done: false`.

The test calls `createTodo("Review white box testing")` directly and asserts:

- `text` exactly matches the supplied string.
- `done` is `false`.
- `id` is a number and is finite.

One call reaches every executable statement in this function. The test does not
depend on the exact current timestamp, so it does not need a clock mock.

## Step 2: Branch coverage

`addTodo` trims the input at line 14 and evaluates `if (!trimmed)` at line 15.

| Input | Decision outcome | Expected result checked |
| --- | --- | --- |
| Empty string `""` | True | Return the exact existing list; preserve its contents. |
| Spaces `"   "` | True | Return the exact existing list; preserve its contents. |
| Tab and newline `"\t\n"` | True | Return the exact existing list; preserve its contents. |
| Padded valid text `"  Write tests  "` | False | Return a new list containing the original item and a new unfinished item with text `"Write tests"`. |

Using an existing finished item makes unintended replacement or mutation visible.
The valid-input test checks the new array's length and identity, preservation of
the original item, the trimmed new text, a numeric ID, `done: false`, and the
unchanged original list. These assertions check behavior as well as execution.

## Step 3: Loop coverage

`countDone` initializes `count` to zero, traverses every todo with `for...of`,
increments only when `todo.done` is true, and returns the result.

| Input | Iterations | Expected count | Internal path exercised |
| --- | ---: | ---: | --- |
| Empty array | 0 | 0 | Initialization and return without entering the loop body. |
| One finished todo | 1 | 1 | Enter once and take the increment branch. |
| Three todos with `done` values true, false, true | 3 | 2 | Continue through several items and take both outcomes of the inner `if`. |

The mixed-list assertion distinguishes counting finished items from simply
returning the list length. Jest does not display a separate loop-coverage
percentage; the chosen inputs explicitly establish the required iteration cases.

## Step 4: Coverage results

Run the full suite from the project directory:

```sh
npm run coverage
```

The final full run passes all **8 tests**, with none skipped. Coverage is
intentionally scoped to the assignment's `todoUtils.ts` target:

| Metric | Covered / total | Percentage |
| --- | ---: | ---: |
| Statements | 13 / 13 | 100% |
| Branch outcomes | 4 / 4 | 100% |
| Functions | 3 / 3 | 100% |
| Lines | 13 / 13 | 100% |

There are no uncovered lines. The four measured branch outcomes correspond to
the two outcomes of `if (!trimmed)` and the two outcomes of `if (todo.done)`.

Evidence:

- [Full Jest output](evidence/coverage-output.txt)
- [Machine-readable summary](coverage/coverage-summary.json)
- [HTML coverage index](coverage/index.html) and [annotated source](coverage/todoUtils.ts.html)
- [LCOV data](coverage/lcov.info)

GitHub displays HTML files as source. Download or clone the repository and open
`coverage/index.html` locally to use the interactive coverage report.

### Removing the blank-input tests

The README suggests temporarily commenting out the blank-text test. This run
used a test-name filter to omit all three parameterized blank-input cases,
without modifying the final test file:

```sh
npm run coverage -- --testNamePattern="^(?!.*blank text)" --coverageDirectory=evidence/branch-experiment --coverageReporters=text --coverageReporters=json-summary --coverageThreshold="{}"
```

The temporary CLI threshold override permits this intentionally incomplete run;
the checked-in configuration continues to require 100% for the normal command.
The experiment writes to a separate directory so it cannot replace the full report.

| Run | Executed / skipped | Statements | Branches | Functions | Lines | Uncovered line |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Full suite | 8 / 0 | 100% | 100% | 100% | 100% | None |
| Blank-input cases omitted | 5 / 3 | 92.3% | 75% | 100% | 92.3% | 16 |

Without blank input, `return todos` at line 16 is never reached: one of thirteen
statements and one of four branch outcomes are missed. Function coverage remains
100% because `addTodo` is still called with valid text. This demonstrates why
calling every function is not enough to cover its decisions.

The filter was then removed and the full coverage command rerun successfully.
All blank-input tests remain enabled in the submitted file. See the
[experiment output](evidence/branch-experiment-output.txt) and
[experiment summary](evidence/branch-experiment/coverage-summary.json).

## Setup changes and validation

- Added the missing `coverage` script requested by the README; `npm test` runs the
  tests normally. Both commands run Jest in one process.
- Configured explicit collection for `todoUtils.ts`, HTML/text/JSON/LCOV reports,
  and 100% coverage thresholds. The starter's old coverage artifacts were not reused.
- Kept tests out of the application's TypeScript build and added a separate
  `typecheck:tests` command. Jest also compiles tests using `ts-jest`.
- Excluded generated coverage files from ESLint and included coverage evidence
  in Git. Dependencies and build output remain ignored.

| Validation | Result | Evidence |
| --- | --- | --- |
| Full Jest coverage run | Passed: 8 tests and all four metrics at 100% | [Output](evidence/coverage-output.txt) |
| Production TypeScript/Vite build | Passed | [Output](evidence/build-output.txt) |
| ESLint | Passed, no diagnostics | [Output](evidence/lint-output.txt) |
| Separate test TypeScript check | Passed, no diagnostics | [Output](evidence/test-typecheck-output.txt) |

Testing was performed on Windows on November 8, 2026. The browser smoke check
was not completed: preview access failed, browser automation stopped, and the
user instructed continuation without the browser. No browser interactions or
React component coverage are claimed. All required utility-function tests and
coverage measurements were executed locally.

## Reflection and assistance

Reading the implementation identified exactly which inputs would reach the
early return and which would enter the loop zero, once, or several times.
Assertions then checked the observable results rather than relying on a coverage
percentage alone. The omission experiment exposed a missed decision even though
all functions were still executed.

100% coverage here means the measured statements and branch outcomes in one
small utility file ran. It does not prove correctness for every possible input,
ID uniqueness, all possible loop lengths, or the React UI.

AI assistance was used to review the source, design and implement tests, run
validation, and prepare this report. This is an AI-assisted submission.

Configuration references: [Jest configuration](https://jestjs.io/docs/configuration)
and [ts-jest TypeScript configuration](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig).
