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
})
