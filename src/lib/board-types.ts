export type ColumnId = "todo" | "in-progress" | "done";

export interface Column {
  id: ColumnId;
  title: string;
}

export const COLUMNS: Column[] = [
  { id: "todo", title: "To do" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
];

export const COLUMN_IDS: ColumnId[] = COLUMNS.map((column) => column.id);

export interface Task {
  id: string;
  title: string;
  column: ColumnId;
}

export interface BoardState {
  tasks: Task[];
}

export const EMPTY_BOARD: BoardState = { tasks: [] };
