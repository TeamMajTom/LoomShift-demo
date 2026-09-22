import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Sprintboard heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Sprintboard' })).toBeInTheDocument()
  })

  it('renders the three board columns', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'To do' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Doing' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Done' })).toBeInTheDocument()
  })

  it('adds a submitted task to the To do column and clears the input', () => {
    render(<App />)

    const input = screen.getByLabelText('New task title')
    fireEvent.change(input, { target: { value: 'Ship the release notes' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }))

    const todoColumn = screen.getByRole('heading', { name: 'To do' }).closest('section')!
    expect(within(todoColumn).getByText('Ship the release notes')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('does not add a task for an empty or whitespace-only title', () => {
    render(<App />)

    const input = screen.getByLabelText('New task title')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a task title/i)
  })

  it('moves a task from To do to Doing without reordering the other tasks', () => {
    render(<App />)

    const todoColumn = screen.getByRole('heading', { name: 'To do' }).closest('section')!
    const doingColumn = screen.getByRole('heading', { name: 'Doing' }).closest('section')!

    const taskItem = within(todoColumn)
      .getAllByRole('listitem')
      .find((item) => within(item).queryByText('Add task creation form'))!
    fireEvent.click(within(taskItem).getByRole('button', { name: 'Move task to Doing' }))

    expect(within(todoColumn).queryByText('Add task creation form')).not.toBeInTheDocument()
    const doingItems = within(doingColumn)
      .getAllByRole('listitem')
      .map((item) => item.textContent)
    expect(doingItems).toEqual([
      expect.stringContaining('Build the column layout'),
      expect.stringContaining('Wire up task state'),
      expect.stringContaining('Add task creation form'),
    ])
  })

  it('permanently removes a task after the delete is confirmed, leaving other tasks untouched', () => {
    render(<App />)

    const todoColumn = screen.getByRole('heading', { name: 'To do' }).closest('section')!
    const otherTodoTitles = within(todoColumn)
      .getAllByRole('listitem')
      .map((item) => item.textContent)
      .filter((text) => !text?.includes('Add task creation form'))

    fireEvent.click(within(todoColumn).getByRole('button', { name: /Delete task: Add task creation form/ }))
    fireEvent.click(
      within(todoColumn).getByRole('button', { name: /Confirm delete task: Add task creation form/ }),
    )

    expect(within(todoColumn).queryByText('Add task creation form')).not.toBeInTheDocument()
    const remainingTitles = within(todoColumn)
      .getAllByRole('listitem')
      .map((item) => item.textContent)
    expect(remainingTitles).toEqual(otherTodoTitles)
  })
})
