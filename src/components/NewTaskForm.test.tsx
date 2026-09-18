import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import NewTaskForm from './NewTaskForm'

describe('NewTaskForm', () => {
  it('adds a task with the entered title and clears the input', () => {
    const onAddTask = vi.fn()
    render(<NewTaskForm onAddTask={onAddTask} />)

    const input = screen.getByLabelText('New task title')
    fireEvent.change(input, { target: { value: 'Write acceptance tests' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }))

    expect(onAddTask).toHaveBeenCalledWith('Write acceptance tests')
    expect(input).toHaveValue('')
  })

  it('rejects an empty or whitespace-only title and explains why', () => {
    const onAddTask = vi.fn()
    render(<NewTaskForm onAddTask={onAddTask} />)

    const input = screen.getByLabelText('New task title')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }))

    expect(onAddTask).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/enter a task title/i)
    expect(input).toHaveValue('   ')
  })
})
