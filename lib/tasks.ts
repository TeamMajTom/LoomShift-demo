export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "doing", label: "Doing" },
  { status: "done", label: "Done" },
];

export const seedTasks: Task[] = [
  { id: "1", title: "Write project brief", status: "todo" },
  { id: "2", title: "Set up repo", status: "todo" },
  { id: "3", title: "Design sprintboard layout", status: "doing" },
  { id: "4", title: "Scaffold Next.js app", status: "done" },
];
