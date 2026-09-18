import { describe, expect, it } from 'vitest'
import { moveTask } from './moveTask'
import type { Task } from './types'

const tasks: Task[] = [
  { id: '1', title: 'First todo', status: 'todo' },
  { id: '2', title: 'Second todo', status: 'todo' },
  { id: '3', title: 'First doing', status: 'doing' },
  { id: '4', title: 'Second doing', status: 'doing' },
  { id: '5', title: 'First done', status: 'done' },
]

describe('moveTask', () => {
  it('moves a task forward to the next column', () => {
    const result = moveTask(tasks, '2', 'doing')

    expect(result.find((task) => task.id === '2')?.status).toBe('doing')
  })

  it('moves a task backward to the previous column', () => {
    const result = moveTask(tasks, '4', 'todo')

    expect(result.find((task) => task.id === '4')?.status).toBe('todo')
  })

  it('does not duplicate the task or affect other tasks when moving', () => {
    const result = moveTask(tasks, '3', 'done')

    expect(result).toHaveLength(tasks.length)
    expect(result.filter((task) => task.id === '3')).toHaveLength(1)
    expect(result.map((task) => task.status)).toEqual(['todo', 'todo', 'done', 'doing', 'done'])
  })

  it('preserves the relative order of tasks left behind in the old column', () => {
    const result = moveTask(tasks, '3', 'done')

    const remainingDoing = result.filter((task) => task.status === 'doing')
    expect(remainingDoing.map((task) => task.id)).toEqual(['4'])
  })

  it('preserves the relative order of tasks already in the target column', () => {
    const result = moveTask(tasks, '2', 'done')

    const done = result.filter((task) => task.status === 'done')
    expect(done.map((task) => task.id)).toEqual(['2', '5'])
  })

  it('supports moving a task at the To do edge forward', () => {
    const result = moveTask(tasks, '1', 'doing')

    expect(result.find((task) => task.id === '1')?.status).toBe('doing')
  })

  it('supports moving a task at the Done edge backward', () => {
    const result = moveTask(tasks, '5', 'doing')

    expect(result.find((task) => task.id === '5')?.status).toBe('doing')
  })
})
