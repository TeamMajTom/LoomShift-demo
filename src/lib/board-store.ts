import { BoardState, ColumnId, COLUMN_IDS, EMPTY_BOARD, Task } from "./board-types";

const STORAGE_KEY = "sprintboard:board:v1";

function isColumnId(value: unknown): value is ColumnId {
  return typeof value === "string" && (COLUMN_IDS as string[]).includes(value);
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;
  const task = value as Record<string, unknown>;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    isColumnId(task.column)
  );
}

function isBoardState(value: unknown): value is BoardState {
  if (typeof value !== "object" || value === null) return false;
  const state = value as Record<string, unknown>;
  return Array.isArray(state.tasks) && state.tasks.every(isTask);
}

/**
 * Reads the persisted board from storage. Any missing, malformed, or
 * unparsable value is treated as a first visit rather than an error.
 */
export function loadBoard(): BoardState {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY_BOARD;
  }
  if (raw === null) return EMPTY_BOARD;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return EMPTY_BOARD;
  }

  return isBoardState(parsed) ? parsed : EMPTY_BOARD;
}

/**
 * Persists the board to storage. Failures (quota, private-mode, etc.) are
 * swallowed since there is no backend to fall back on.
 */
export function saveBoard(state: BoardState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (e.g. private browsing quota); ignore.
  }
}
