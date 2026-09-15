import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Board } from './Board'

describe('Board', () => {
  it('adds a task to the To do column when a title is submitted', async () => {
    const user = userEvent.setup()
    render(<Board />)

    const input = screen.getByLabelText('New task title')
    await user.type(input, 'Write acceptance tests')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    const todoColumn = screen.getByRole('region', { name: 'To do' })
    expect(
      within(todoColumn).getByText('Write acceptance tests'),
    ).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('rejects a whitespace-only title and adds nothing', async () => {
    const user = userEvent.setup()
    render(<Board />)

    const input = screen.getByLabelText('New task title')
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a task title before adding.',
    )
    const todoColumn = screen.getByRole('region', { name: 'To do' })
    expect(within(todoColumn).queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('can be operated using only the keyboard', async () => {
    const user = userEvent.setup()
    render(<Board />)

    await user.tab()
    expect(screen.getByLabelText('New task title')).toHaveFocus()

    await user.keyboard('Keyboard-only task{Enter}')

    const todoColumn = screen.getByRole('region', { name: 'To do' })
    expect(
      within(todoColumn).getByText('Keyboard-only task'),
    ).toBeInTheDocument()
  })
})
