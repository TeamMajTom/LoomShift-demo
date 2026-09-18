import { afterEach, describe, expect, it } from 'vitest'
import { loadTasks, saveTasks } from './storage'
import { seedTasks } from './seedTasks'
import type { Task } from './types'

const STORAGE_KEY = 'sprintboard.tasks'

afterEach(() => {
  localStorage.clear()
})

describe('storage', () => {
  it('round-trips tasks through save and load', () => {
    const tasks: Task[] = [
      { id: '1', title: 'First todo', status: 'todo' },
      { id: '2', title: 'In progress', status: 'doing' },
    ]

    saveTasks(tasks)

    expect(loadTasks()).toEqual(tasks)
  })

  it('falls back to the seed tasks when nothing is stored', () => {
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(loadTasks()).toEqual(seedTasks)
  })

  it('discards corrupted stored data and falls back to the seed tasks', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json')

    expect(loadTasks()).toEqual(seedTasks)
  })

  it('discards stored data with an unrecognized shape and falls back to the seed tasks', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: '1', title: 'Missing status' }]))

    expect(loadTasks()).toEqual(seedTasks)
  })

  it('discards a non-array stored value and falls back to the seed tasks', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: '1' }))

    expect(loadTasks()).toEqual(seedTasks)
  })
})
