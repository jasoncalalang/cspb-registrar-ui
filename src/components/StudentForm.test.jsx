import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import StudentForm from './StudentForm.jsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: vi.fn() }
})

vi.mock('../services/api.js', () => ({
  default: {
    createStudents: vi.fn(() => Promise.resolve([])),
  },
}))
const { default: apiMock } = await import('../services/api.js')

const navigateMock = vi.fn()
useNavigate.mockReturnValue(navigateMock)

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('StudentForm', () => {
  it('submits student data', async () => {
    render(<StudentForm />)

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.click(screen.getByText('Submit'))

    expect(apiMock.createStudents).toHaveBeenCalledWith([
      expect.objectContaining({ firstName: 'John', lastName: 'Doe' }),
    ])
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/', { state: { toast: 'student is created' } })
    })
  })
})
