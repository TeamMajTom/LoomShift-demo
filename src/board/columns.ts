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

export function getAdjacentColumn(
  status: TaskStatus,
  direction: 'previous' | 'next',
): ColumnDefinition | undefined {
  const index = COLUMNS.findIndex((column) => column.status === status)
  const targetIndex = direction === 'previous' ? index - 1 : index + 1
  return COLUMNS[targetIndex]
}
