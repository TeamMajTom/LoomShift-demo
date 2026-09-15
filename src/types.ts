export type ColumnId = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: ColumnId;
}

export const COLUMN_ORDER: ColumnId[] = ["todo", "doing", "done"];

export const COLUMN_LABELS: Record<ColumnId, string> = {
  todo: "To do",
  doing: "Doing",
  done: "Done",
};
