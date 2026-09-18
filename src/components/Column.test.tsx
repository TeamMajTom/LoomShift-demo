import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Column from './Column'
import type { Task } from '../board/types'

const tasks: Task[] = [
  { id: '1', title: 'Write the spec', status: 'todo' },
  { id: '2', title: 'Review the spec', status: 'todo' },
]

describe('Column', () => {
  it('renders the title, count and task titles for a populated column', () => {
    render(<Column title="To do" tasks={tasks} onMoveTask={vi.fn()} onDeleteTask={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'To do' })).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Write the spec')).toBeInTheDocument()
    expect(screen.getByText('Review the spec')).toBeInTheDocument()
  })

  it('shows an empty state instead of an empty list when there are no tasks', () => {
    render(<Column title="Done" tasks={[]} onMoveTask={vi.fn()} onDeleteTask={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Done' })).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    expect(screen.queryByRole('listitem', { name: /write/i })).not.toBeInTheDocument()
  })

  it('disables the backward control and enables the forward control for a To do task', () => {
    render(
      <Column
        title="To do"
        tasks={[{ id: '1', title: 'Write the spec', status: 'todo' }]}
        onMoveTask={vi.fn()}
        onDeleteTask={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Move task to previous column' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move task to Doing' })).toBeEnabled()
  })

  it('disables the forward control and enables the backward control for a Done task', () => {
    render(
      <Column
        title="Done"
        tasks={[{ id: '1', title: 'Ship it', status: 'done' }]}
        onMoveTask={vi.fn()}
        onDeleteTask={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Move task to Doing' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Move task to next column' })).toBeDisabled()
  })

  it('enables both controls for a task in a middle column', () => {
    render(
      <Column
        title="Doing"
        tasks={[{ id: '1', title: 'Build the thing', status: 'doing' }]}
        onMoveTask={vi.fn()}
        onDeleteTask={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Move task to To do' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Move task to Done' })).toBeEnabled()
  })

  it('calls onMoveTask with the task id and target status when a control is clicked', () => {
    const handleMoveTask = vi.fn()
    render(
      <Column
        title="Doing"
        tasks={[{ id: '1', title: 'Build the thing', status: 'doing' }]}
        onMoveTask={handleMoveTask}
        onDeleteTask={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Move task to Done' }))
    expect(handleMoveTask).toHaveBeenCalledWith('1', 'done')

    fireEvent.click(screen.getByRole('button', { name: 'Move task to To do' }))
    expect(handleMoveTask).toHaveBeenCalledWith('1', 'todo')
  })

  it('shows a delete control for each task with an accessible label', () => {
    render(<Column title="To do" tasks={tasks} onMoveTask={vi.fn()} onDeleteTask={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'Delete task: Write the spec' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Delete task: Review the spec' }),
    ).toBeInTheDocument()
  })

  it('shows an inline confirm and cancel control after clicking delete, without deleting immediately', () => {
    const handleDeleteTask = vi.fn()
    render(
      <Column
        title="To do"
        tasks={[{ id: '1', title: 'Write the spec', status: 'todo' }]}
        onMoveTask={vi.fn()}
        onDeleteTask={handleDeleteTask}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete task: Write the spec' }))

    expect(handleDeleteTask).not.toHaveBeenCalled()
    expect(
      screen.getByRole('button', { name: 'Confirm delete task: Write the spec' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Cancel delete task: Write the spec' }),
    ).toBeInTheDocument()
  })

  it('calls onDeleteTask only after the delete is confirmed', () => {
    const handleDeleteTask = vi.fn()
    render(
      <Column
        title="To do"
        tasks={[{ id: '1', title: 'Write the spec', status: 'todo' }]}
        onMoveTask={vi.fn()}
        onDeleteTask={handleDeleteTask}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete task: Write the spec' }))
    fireEvent.click(screen.getByRole('button', { name: 'Confirm delete task: Write the spec' }))

    expect(handleDeleteTask).toHaveBeenCalledWith('1')
  })

  it('cancels the delete and restores the move controls when cancel is clicked', () => {
    const handleDeleteTask = vi.fn()
    render(
      <Column
        title="To do"
        tasks={[{ id: '1', title: 'Write the spec', status: 'todo' }]}
        onMoveTask={vi.fn()}
        onDeleteTask={handleDeleteTask}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete task: Write the spec' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel delete task: Write the spec' }))

    expect(handleDeleteTask).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Delete task: Write the spec' })).toBeInTheDocument()
  })
})
