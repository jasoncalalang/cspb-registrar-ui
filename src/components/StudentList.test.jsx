import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import StudentList from './StudentList.jsx'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../services/api.js', () => ({
  default: {
    listStudents: vi.fn(),
    deleteStudent: vi.fn(() => Promise.resolve()),
  },
}))
const { default: apiMock } = await import('../services/api.js')

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const mockStudents = [
  { id: 1, lrn: 'A1', lastName: 'Doe', firstName: 'John', middleName: 'M', imgPath: '' },
  { id: 2, lrn: 'B2', lastName: 'Smith', firstName: 'Jane', middleName: 'N', imgPath: '' },
]

describe('StudentList', () => {
  beforeEach(() => {
    apiMock.listStudents.mockResolvedValue(mockStudents)
  })

  it('renders students in a table', async () => {
    render(
      <MemoryRouter>
        <StudentList />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /new student/i })).toHaveAttribute(
      'href',
      '/students/new'
    )

    expect(apiMock.listStudents).toHaveBeenCalledWith(1, 5, expect.any(Object))

    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })

  it('changes page when next button is clicked', async () => {
    render(
      <MemoryRouter>
        <StudentList />
      </MemoryRouter>
    )
    await screen.findByText('John')

    apiMock.listStudents.mockResolvedValueOnce(mockStudents)
    fireEvent.click(screen.getAllByText('Next')[0])

    expect(apiMock.listStudents).toHaveBeenCalledWith(2, 5, expect.any(Object))
  })

  it('deletes a student when delete button is clicked', async () => {
    render(
      <MemoryRouter>
        <StudentList />
      </MemoryRouter>
    )
    await screen.findByText('John')
    fireEvent.click(screen.getByLabelText('delete-1'))
    expect(apiMock.deleteStudent).toHaveBeenCalledWith(1)
    expect(await screen.findByText('user is deleted')).toBeInTheDocument()
  })

  it('displays toast from navigation state', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { toast: 'student is created' } }]}>
        <StudentList />
      </MemoryRouter>
    )
    expect(await screen.findByText('student is created')).toBeInTheDocument()
  })
})
