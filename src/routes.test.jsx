import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './routes.jsx'

vi.mock('./components/StudentList.jsx', () => ({
  default: () => <div>list page</div>,
}))
vi.mock('./components/StudentForm.jsx', () => ({
  default: () => <div>form page</div>,
}))
vi.mock('./components/StudentDetails.jsx', () => ({
  default: () => <div>details page</div>,
}))

describe('AppRoutes', () => {
  it('renders list on root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('list page')).toBeInTheDocument()
  })

  it('renders form on /students/new', () => {
    render(
      <MemoryRouter initialEntries={['/students/new']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('form page')).toBeInTheDocument()
  })

  it('renders details on /students/1', () => {
    render(
      <MemoryRouter initialEntries={['/students/1']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('details page')).toBeInTheDocument()
  })
})
