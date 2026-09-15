import { beforeEach, describe, expect, it } from "vitest";
import { loadTasks, saveTasks } from "@/lib/board-storage";
import type { Task } from "@/lib/tasks";

const STORAGE_KEY = "sprintboard.tasks";

const tasks: Task[] = [
  { id: "1", title: "Sketch the layout", status: "todo" },
  { id: "2", title: "Build the board columns", status: "doing" },
];

beforeEach(() => {
  window.localStorage.clear();
});

describe("loadTasks / saveTasks", () => {
  it("returns the previously saved tasks after a round trip", () => {
    saveTasks(tasks);

    expect(loadTasks()).toEqual(tasks);
  });

  it("returns an empty list on a first visit with nothing stored", () => {
    expect(loadTasks()).toEqual([]);
  });

  it("discards a corrupted stored value and treats it as a first visit", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not valid json");

    expect(loadTasks()).toEqual([]);
  });

  it("discards stored data with an unrecognized shape", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: "1", title: "Missing status field" }]),
    );

    expect(loadTasks()).toEqual([]);
  });

  it("discards a stored value that isn't a list", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks }));

    expect(loadTasks()).toEqual([]);
  });
});
