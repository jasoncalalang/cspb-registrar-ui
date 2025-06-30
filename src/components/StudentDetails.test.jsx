import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import StudentDetails from './StudentDetails.jsx'

vi.mock('../services/api.js', () => ({
  default: {
    getStudent: vi.fn(),
  },
}))
const { default: apiMock } = await import('../services/api.js')

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('StudentDetails', () => {
  it('fetches and displays student', async () => {
    apiMock.getStudent.mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'M',
      lrn: '123',
    })

    render(
      <MemoryRouter initialEntries={['/students/1']}>
        <Routes>
          <Route path="/students/:id" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    )

    expect(apiMock.getStudent).toHaveBeenCalledWith('1', expect.any(Object))
    expect(await screen.findByText(/John/)).toBeInTheDocument()
  })
})
