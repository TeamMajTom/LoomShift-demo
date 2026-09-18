import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Column from './Column'
import type { Task } from '../board/types'

const tasks: Task[] = [
  { id: '1', title: 'Write the spec', status: 'todo' },
  { id: '2', title: 'Review the spec', status: 'todo' },
]

describe('Column', () => {
  it('renders the title, count and task titles for a populated column', () => {
    render(<Column title="To do" tasks={tasks} />)

    expect(screen.getByRole('heading', { name: 'To do' })).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Write the spec')).toBeInTheDocument()
    expect(screen.getByText('Review the spec')).toBeInTheDocument()
  })

  it('shows an empty state instead of an empty list when there are no tasks', () => {
    render(<Column title="Done" tasks={[]} />)

    expect(screen.getByRole('heading', { name: 'Done' })).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    expect(screen.queryByRole('listitem', { name: /write/i })).not.toBeInTheDocument()
  })
})
