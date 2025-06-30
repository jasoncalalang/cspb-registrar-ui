import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import api from './api.js'

const mockFetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve('ok') }))

vi.stubGlobal('fetch', mockFetch)

afterEach(() => {
  mockFetch.mockClear()
})

describe('api service', () => {
  it('listStudents calls correct endpoint', async () => {
    const controller = new AbortController()
    await api.listStudents(2, 10, controller.signal)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/students?page=2&size=10',
      { signal: controller.signal }
    )
  })

  it('createStudents posts to endpoint', async () => {
    await api.createStudents([{ firstName: 'a' }])
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ firstName: 'a' }]),
      signal: undefined,
    })
  })

  it('deleteStudent uses DELETE', async () => {
    await api.deleteStudent(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/students/1',
      { method: 'DELETE', signal: undefined }
    )
  })

  it('getStudent fetches by id', async () => {
    await api.getStudent(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/students/1',
      { signal: undefined }
    )
  })
})
