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

export const seedTasks: Task[] = [
  { id: "1", title: "Sketch the sprintboard layout", status: "todo" },
  { id: "2", title: "Write acceptance tests", status: "todo" },
  { id: "3", title: "Build the board columns", status: "doing" },
  { id: "4", title: "Scaffold the Next.js app", status: "done" },
];
