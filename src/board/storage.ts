import type { Task, TaskStatus } from './types'
import { seedTasks } from './seedTasks'

const STORAGE_KEY = 'sprintboard.tasks'
const VALID_STATUSES: TaskStatus[] = ['todo', 'doing', 'done']

function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && VALID_STATUSES.includes(value as TaskStatus)
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    isTaskStatus(candidate.status)
  )
}

function isTaskList(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask)
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return seedTasks

    const parsed: unknown = JSON.parse(raw)
    return isTaskList(parsed) ? parsed : seedTasks
  } catch {
    return seedTasks
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage may be unavailable (e.g. private browsing); persistence is best-effort.
  }
}
