import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'

vi.mock('../services/api.js', () => ({
  default: {
    listStudents: vi.fn(),
    deleteStudent: vi.fn(() => Promise.resolve()),
  },
}))
const { default: apiMock } = await import('../services/api.js')

const mockData = {
  content: [
    { id: 1, lrn: 'A1', firstName: 'John', lastName: 'Doe', middleName: 'M', gender: 'M', imgPath: '' },
    { id: 2, lrn: 'B2', firstName: 'Jane', lastName: 'Smith', middleName: 'N', gender: 'F', imgPath: '' },
  ],
  totalPages: 2,
  totalElements: 2,
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('Dashboard', () => {
  beforeEach(() => {
    apiMock.listStudents.mockResolvedValue(mockData)
  })

  it('renders students and metrics', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(apiMock.listStudents).toHaveBeenCalledWith(0, 10, expect.any(Object))
    expect((await screen.findAllByText('John Doe')).length).toBeGreaterThan(0)
    expect(screen.getByText('Total Students')).toBeInTheDocument()
  })

  it('fetches next page when Next is clicked', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )
    await screen.findAllByText('John Doe')

    apiMock.listStudents.mockResolvedValueOnce(mockData)
    fireEvent.click(screen.getByText('Next'))

    expect(apiMock.listStudents).toHaveBeenCalledWith(1, 10, expect.any(Object))
  })

  it('deletes a student when confirmed', async () => {
    const confirmMock = vi.fn(() => true)
    vi.stubGlobal('confirm', confirmMock)

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    await screen.findAllByText('John Doe')
    fireEvent.click(screen.getAllByTitle('Delete Student')[0])

    expect(confirmMock).toHaveBeenCalled()
    expect(apiMock.deleteStudent).toHaveBeenCalledWith(1)
    expect(await screen.findByText('Student deleted successfully')).toBeInTheDocument()
  })

  it('filters students based on search input', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    await screen.findAllByText('John Doe')
    const search = screen.getByPlaceholderText('Search by name or LRN...')
    fireEvent.change(search, { target: { value: 'Jane' } })

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect((await screen.findAllByText('Jane Smith')).length).toBeGreaterThan(0)
  })
})
