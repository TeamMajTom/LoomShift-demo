import type { TaskStatus } from './types'

export interface ColumnDefinition {
  status: TaskStatus
  label: string
}

export const COLUMNS: ColumnDefinition[] = [
  { status: 'todo', label: 'To do' },
  { status: 'doing', label: 'Doing' },
  { status: 'done', label: 'Done' },
]
