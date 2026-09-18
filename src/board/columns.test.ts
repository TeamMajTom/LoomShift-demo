import { describe, expect, it } from 'vitest'
import { getAdjacentColumn } from './columns'

describe('getAdjacentColumn', () => {
  it('has no previous column for the first column (To do)', () => {
    expect(getAdjacentColumn('todo', 'previous')).toBeUndefined()
  })

  it('returns the next column for the first column (To do)', () => {
    expect(getAdjacentColumn('todo', 'next')).toEqual({ status: 'doing', label: 'Doing' })
  })

  it('returns both neighbours for a middle column (Doing)', () => {
    expect(getAdjacentColumn('doing', 'previous')).toEqual({ status: 'todo', label: 'To do' })
    expect(getAdjacentColumn('doing', 'next')).toEqual({ status: 'done', label: 'Done' })
  })

  it('returns the previous column for the last column (Done)', () => {
    expect(getAdjacentColumn('done', 'previous')).toEqual({ status: 'doing', label: 'Doing' })
  })

  it('has no next column for the last column (Done)', () => {
    expect(getAdjacentColumn('done', 'next')).toBeUndefined()
  })
})
