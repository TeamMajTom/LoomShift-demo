import { COLUMNS, type Task, type TaskStatus } from "@/lib/tasks";

const STORAGE_KEY = "sprintboard.tasks";

const VALID_STATUSES: readonly TaskStatus[] = COLUMNS.map(
  (column) => column.status,
);

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    VALID_STATUSES.includes(candidate.status as TaskStatus)
  );
}

function isTaskList(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];

    const parsed = JSON.parse(raw);
    return isTaskList(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    return;
  }
}

let cachedTasks: Task[] = typeof window === "undefined" ? [] : loadTasks();
const listeners = new Set<() => void>();

export function subscribeToTasks(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function getTasksSnapshot(): Task[] {
  return cachedTasks;
}

export function getServerTasksSnapshot(): Task[] {
  return [];
}

export function setTasks(tasks: Task[]): void {
  cachedTasks = tasks;
  saveTasks(tasks);
  listeners.forEach((listener) => listener());
}
