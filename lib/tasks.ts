export type TaskStatus = "todo" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

export const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "doing", label: "Doing" },
  { status: "done", label: "Done" },
];

export type MoveDirection = "previous" | "next";

export function getAdjacentColumn(
  status: TaskStatus,
  direction: MoveDirection,
): { status: TaskStatus; label: string } | null {
  const index = COLUMNS.findIndex((column) => column.status === status);
  const targetIndex = direction === "previous" ? index - 1 : index + 1;
  return COLUMNS[targetIndex] ?? null;
}

export function moveTask(
  tasks: Task[],
  taskId: string,
  direction: MoveDirection,
): Task[] {
  return tasks.map((task) => {
    if (task.id !== taskId) return task;
    const target = getAdjacentColumn(task.status, direction);
    return target ? { ...task, status: target.status } : task;
  });
}
