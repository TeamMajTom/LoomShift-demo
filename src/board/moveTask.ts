import type { Task, TaskStatus } from './types'

export function moveTask(tasks: Task[], taskId: string, targetStatus: TaskStatus): Task[] {
  return tasks.map((task) => (task.id === taskId ? { ...task, status: targetStatus } : task))
}
