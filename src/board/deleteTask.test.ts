import { describe, expect, it } from 'vitest'
import { deleteTask } from './deleteTask'
import type { Task } from './types'

const tasks: Task[] = [
  { id: '1', title: 'First todo', status: 'todo' },
  { id: '2', title: 'Second todo', status: 'todo' },
  { id: '3', title: 'First doing', status: 'doing' },
]

describe('deleteTask', () => {
  it('removes the task with the given id', () => {
    const result = deleteTask(tasks, '2')

    expect(result.find((task) => task.id === '2')).toBeUndefined()
    expect(result).toHaveLength(tasks.length - 1)
  })

  it('does not change the status or title of the remaining tasks', () => {
    const result = deleteTask(tasks, '2')

    expect(result).toEqual([tasks[0], tasks[2]])
  })

  it('leaves the list unchanged when the id does not match any task', () => {
    const result = deleteTask(tasks, 'missing')

    expect(result).toEqual(tasks)
  })
})
