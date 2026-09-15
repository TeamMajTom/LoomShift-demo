import { COLUMN_ORDER, ColumnId, Task } from "./types";

export function canMoveBackward(status: ColumnId): boolean {
  return COLUMN_ORDER.indexOf(status) > 0;
}

export function canMoveForward(status: ColumnId): boolean {
  return COLUMN_ORDER.indexOf(status) < COLUMN_ORDER.length - 1;
}

function moveTaskBy(tasks: Task[], taskId: string, delta: 1 | -1): Task[] {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return tasks;

  const currentIndex = COLUMN_ORDER.indexOf(task.status);
  const nextIndex = currentIndex + delta;
  if (nextIndex < 0 || nextIndex >= COLUMN_ORDER.length) return tasks;

  const nextStatus = COLUMN_ORDER[nextIndex];
  return tasks.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t));
}

export function moveTaskForward(tasks: Task[], taskId: string): Task[] {
  return moveTaskBy(tasks, taskId, 1);
}

export function moveTaskBackward(tasks: Task[], taskId: string): Task[] {
  return moveTaskBy(tasks, taskId, -1);
}
