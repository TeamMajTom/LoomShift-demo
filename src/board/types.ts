export type ColumnId = 'todo' | 'in-progress' | 'done'

export interface ColumnDef {
  id: ColumnId
  title: string
}

export interface Task {
  id: string
  title: string
  columnId: ColumnId
}

export const COLUMNS: ColumnDef[] = [
  { id: 'todo', title: 'To do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]
