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

    fireEvent.change(screen.getByPlaceholderText('LRN'), {
      target: { value: '123456789012' },
    })
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Juan' },
    })
    fireEvent.change(screen.getByPlaceholderText('Middle Name'), {
      target: { value: 'Santos' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Dela Cruz' },
    })
    fireEvent.change(screen.getByPlaceholderText('Extension Name'), {
      target: { value: 'Jr.' },
    })
    fireEvent.change(screen.getByPlaceholderText('Birth Date'), {
      target: { value: '2010-05-14' },
    })
    fireEvent.change(screen.getByPlaceholderText('Birth Place'), {
      target: { value: 'Obando, Bulacan' },
    })
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'M' },
    })
    fireEvent.change(screen.getByPlaceholderText('Nationality'), {
      target: { value: 'Filipino' },
    })
    fireEvent.change(screen.getByPlaceholderText('Religion'), {
      target: { value: 'Catholic' },
    })
    fireEvent.change(screen.getByPlaceholderText('Number of Siblings'), {
      target: { value: '2' },
    })
    fireEvent.change(screen.getByPlaceholderText('Sibling Names'), {
      target: { value: 'Maria Dela Cruz, Jose Dela Cruz' },
    })
    fireEvent.change(screen.getByPlaceholderText('Image URL'), {
      target: { value: 'https://example.com/img.jpg' },
    })

    fireEvent.click(screen.getByText('Submit'))

    expect(apiMock.createStudents).toHaveBeenCalledWith([
      expect.objectContaining({
        lrn: '123456789012',
        firstName: 'Juan',
        middleName: 'Santos',
        lastName: 'Dela Cruz',
        extensionName: 'Jr.',
        birthDate: '2010-05-14',
        birthPlace: 'Obando, Bulacan',
        gender: 'M',
        nationality: 'Filipino',
        religion: 'Catholic',
        numSiblings: '2',
        siblingNames: 'Maria Dela Cruz, Jose Dela Cruz',
        imgPath: 'https://example.com/img.jpg',
      }),
    ])
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/', {
        state: { toast: 'student is created' },
      })
    })
  })
})
