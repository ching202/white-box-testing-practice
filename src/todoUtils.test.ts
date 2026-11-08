import { addTodo, countDone, createTodo } from "./todoUtils";
import type { Todo } from "./todoUtils";

describe("createTodo statement coverage", () => {
  it("creates a todo with the supplied text, an unfinished state, and a numeric id", () => {
    // This function has one return statement and no decisions.
    const todo = createTodo("Review white box testing");

    expect(todo.text).toBe("Review white box testing");
    expect(todo.done).toBe(false);
    expect(typeof todo.id).toBe("number");
    expect(Number.isFinite(todo.id)).toBe(true);
  });
});

describe("addTodo branch coverage", () => {
  it.each(["", "   ", "\t\n"])(
    "returns the existing list unchanged for blank text %p",
    (text) => {
      const todos: Todo[] = [{ id: 1, text: "Existing task", done: true }];

      // trim() produces an empty string, so the early-return branch is taken.
      const result = addTodo(todos, text);

      expect(result).toBe(todos);
      expect(todos).toEqual([{ id: 1, text: "Existing task", done: true }]);
    },
  );

  it("appends trimmed valid text without changing the original list", () => {
    const todos: Todo[] = [{ id: 1, text: "Existing task", done: true }];

    // Nonblank trimmed text takes the other branch and calls createTodo.
    const result = addTodo(todos, "  Write tests  ");

    expect(result).not.toBe(todos);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(todos[0]);
    expect(result[1]).toEqual({
      id: expect.any(Number),
      text: "Write tests",
      done: false,
    });
    expect(todos).toEqual([{ id: 1, text: "Existing task", done: true }]);
  });
});

describe("countDone loop coverage", () => {
  it("returns zero for an empty list (zero iterations)", () => {
    expect(countDone([])).toBe(0);
  });

  it("counts one finished todo (one iteration)", () => {
    const todos: Todo[] = [{ id: 1, text: "Read the source", done: true }];

    expect(countDone(todos)).toBe(1);
  });

  it("counts only finished todos in a mixed list (several iterations)", () => {
    const todos: Todo[] = [
      { id: 1, text: "Read the source", done: true },
      { id: 2, text: "Review the report", done: false },
      { id: 3, text: "Write tests", done: true },
    ];

    // Three iterations exercise both outcomes of if (todo.done).
    expect(countDone(todos)).toBe(2);
  });
});
