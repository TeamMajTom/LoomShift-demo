import { render, screen } from '@testing-library/react'
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
})
