import { COLUMNS, Status, Task } from './types';

export type Direction = 'forward' | 'backward';

export function getAdjacentStatus(status: Status, direction: Direction): Status | null {
  const index = COLUMNS.indexOf(status);
  const targetIndex = direction === 'forward' ? index + 1 : index - 1;
  return targetIndex >= 0 && targetIndex < COLUMNS.length ? COLUMNS[targetIndex] : null;
}

/**
 * Returns a new tasks array with the given task's status moved one column
 * forward or backward. Only the target task's status changes; every other
 * task keeps its original position in the array, so column order is
 * preserved. Moving past the first/last column is a no-op.
 */
export function moveTask(tasks: Task[], taskId: string, direction: Direction): Task[] {
  return tasks.map((task) => {
    if (task.id !== taskId) return task;
    const nextStatus = getAdjacentStatus(task.status, direction);
    return nextStatus ? { ...task, status: nextStatus } : task;
  });
}
