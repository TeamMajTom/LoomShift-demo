import { beforeEach, describe, expect, it } from "vitest";
import { loadBoard, saveBoard } from "./board-store";
import { BoardState } from "./board-types";

const STORAGE_KEY = "sprintboard:board:v1";

beforeEach(() => {
  window.localStorage.clear();
});

describe("board-store", () => {
  it("round-trips a saved board through storage", () => {
    const state: BoardState = {
      tasks: [
        { id: "1", title: "Write tests", column: "todo" },
        { id: "2", title: "Ship it", column: "done" },
      ],
    };

    saveBoard(state);

    expect(loadBoard()).toEqual(state);
  });

  it("returns an empty board on a first visit with nothing stored", () => {
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(loadBoard()).toEqual({ tasks: [] });
  });

  it("discards a corrupted stored value and treats it as a first visit", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not valid json");
    expect(loadBoard()).toEqual({ tasks: [] });
  });

  it("discards a stored value with an outdated or malformed shape", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tasks: [{ id: "1", title: "Missing column" }] })
    );
    expect(loadBoard()).toEqual({ tasks: [] });

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ columns: [] }));
    expect(loadBoard()).toEqual({ tasks: [] });
  });
});
