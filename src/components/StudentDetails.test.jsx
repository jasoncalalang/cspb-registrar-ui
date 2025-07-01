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
      lrn: '123456789012',
      lastName: 'Dela Cruz',
      firstName: 'Juan',
      middleName: 'Santos',
      extensionName: 'Jr.',
      birthDate: '2010-05-14',
      birthPlace: 'Obando, Bulacan',
      gender: 'M',
      nationality: 'Filipino',
      religion: 'Catholic',
      numSiblings: 2,
      siblingNames: 'Maria Dela Cruz, Jose Dela Cruz',
      imgPath: 'https://example.com/img.jpg',
      createdAt: '2025-07-01T01:43:27.671836Z',
      updatedAt: '2025-07-01T01:43:27.671836Z',
    })

    render(
      <MemoryRouter initialEntries={['/students/1']}>
        <Routes>
          <Route path="/students/:id" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    )

    expect(apiMock.getStudent).toHaveBeenCalledWith('1', expect.any(Object))
    expect(await screen.findByText('First Name: Juan')).toBeInTheDocument()
    expect(screen.getByText('Last Name: Dela Cruz')).toBeInTheDocument()
    expect(screen.getByText('Middle Name: Santos')).toBeInTheDocument()
    expect(screen.getByText('Extension Name: Jr.')).toBeInTheDocument()
    const created = new Date('2025-07-01T01:43:27.671836Z').toLocaleString(
      'en-PH',
      { timeZone: 'Asia/Manila' }
    )
    const updated = new Date('2025-07-01T01:43:27.671836Z').toLocaleString(
      'en-PH',
      { timeZone: 'Asia/Manila' }
    )
    const dateRegex = new RegExp(created.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    expect(screen.getAllByText(dateRegex)).toHaveLength(2)
  })
})
