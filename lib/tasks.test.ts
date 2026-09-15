import { describe, expect, it } from "vitest";
import { getAdjacentColumn, moveTask, type Task } from "@/lib/tasks";

const tasks: Task[] = [
  { id: "1", title: "Sketch the layout", status: "todo" },
  { id: "2", title: "Write acceptance tests", status: "todo" },
  { id: "3", title: "Build the board columns", status: "doing" },
  { id: "4", title: "Scaffold the app", status: "done" },
];

describe("moveTask", () => {
  it("moves a task forward to the next column", () => {
    const result = moveTask(tasks, "3", "next");

    expect(result.find((task) => task.id === "3")?.status).toBe("done");
  });

  it("moves a task backward to the previous column", () => {
    const result = moveTask(tasks, "3", "previous");

    expect(result.find((task) => task.id === "3")?.status).toBe("todo");
  });

  it("does not move a task in the first column further back", () => {
    const result = moveTask(tasks, "1", "previous");

    expect(result.find((task) => task.id === "1")?.status).toBe("todo");
  });

  it("does not move a task in the last column further forward", () => {
    const result = moveTask(tasks, "4", "next");

    expect(result.find((task) => task.id === "4")?.status).toBe("done");
  });

  it("removes the task from its old column without leaving a duplicate", () => {
    const result = moveTask(tasks, "3", "next");

    expect(result.filter((task) => task.status === "doing")).toHaveLength(0);
    expect(result.filter((task) => task.id === "3")).toHaveLength(1);
  });

  it("does not reorder the other tasks when moving a task", () => {
    const result = moveTask(tasks, "1", "next");

    expect(result.map((task) => task.id)).toEqual(["1", "2", "3", "4"]);
  });
});

describe("getAdjacentColumn", () => {
  it("returns null when asking for the previous column from the first column", () => {
    expect(getAdjacentColumn("todo", "previous")).toBeNull();
  });

  it("returns null when asking for the next column from the last column", () => {
    expect(getAdjacentColumn("done", "next")).toBeNull();
  });

  it("returns the neighboring column otherwise", () => {
    expect(getAdjacentColumn("doing", "previous")).toEqual({
      status: "todo",
      label: "To do",
    });
    expect(getAdjacentColumn("doing", "next")).toEqual({
      status: "done",
      label: "Done",
    });
  });
});
