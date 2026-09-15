import { describe, expect, it } from "vitest";
import {
  canMoveBackward,
  canMoveForward,
  moveTaskBackward,
  moveTaskForward,
} from "./boardLogic";
import { Task } from "./types";

function makeTasks(): Task[] {
  return [
    { id: "1", title: "First todo", status: "todo" },
    { id: "2", title: "Second todo", status: "todo" },
    { id: "3", title: "In progress", status: "doing" },
    { id: "4", title: "Finished", status: "done" },
  ];
}

describe("canMoveForward / canMoveBackward", () => {
  it("disallows backward movement from the first column", () => {
    expect(canMoveBackward("todo")).toBe(false);
  });

  it("disallows forward movement from the last column", () => {
    expect(canMoveForward("done")).toBe(false);
  });

  it("allows forward movement from a non-last column", () => {
    expect(canMoveForward("todo")).toBe(true);
    expect(canMoveForward("doing")).toBe(true);
  });

  it("allows backward movement from a non-first column", () => {
    expect(canMoveBackward("doing")).toBe(true);
    expect(canMoveBackward("done")).toBe(true);
  });
});

describe("moveTaskForward", () => {
  it("moves a task from To do to Doing", () => {
    const tasks = makeTasks();
    const result = moveTaskForward(tasks, "2");

    const moved = result.find((t) => t.id === "2");
    expect(moved?.status).toBe("doing");
  });

  it("removes the task from its old column and adds it to the new one, without duplicates", () => {
    const tasks = makeTasks();
    const result = moveTaskForward(tasks, "2");

    expect(result.filter((t) => t.status === "todo").map((t) => t.id)).toEqual(["1"]);
    expect(result.filter((t) => t.status === "doing").map((t) => t.id)).toEqual(["2", "3"]);
    expect(result).toHaveLength(tasks.length);
  });

  it("does not reorder the other tasks remaining in either column", () => {
    const tasks: Task[] = [
      { id: "1", title: "A", status: "todo" },
      { id: "2", title: "B", status: "todo" },
      { id: "3", title: "C", status: "todo" },
    ];
    const result = moveTaskForward(tasks, "2");

    expect(result.filter((t) => t.status === "todo").map((t) => t.id)).toEqual(["1", "3"]);
  });

  it("is a no-op when the task is already in the last column (Done)", () => {
    const tasks = makeTasks();
    const result = moveTaskForward(tasks, "4");

    expect(result).toEqual(tasks);
  });
});

describe("moveTaskBackward", () => {
  it("moves a task from Doing back to To do", () => {
    const tasks = makeTasks();
    const result = moveTaskBackward(tasks, "3");

    const moved = result.find((t) => t.id === "3");
    expect(moved?.status).toBe("todo");
    expect(result.filter((t) => t.status === "doing")).toHaveLength(0);
    expect(result.filter((t) => t.status === "todo").map((t) => t.id)).toEqual(["1", "2", "3"]);
  });

  it("is a no-op when the task is already in the first column (To do)", () => {
    const tasks = makeTasks();
    const result = moveTaskBackward(tasks, "1");

    expect(result).toEqual(tasks);
  });
});
