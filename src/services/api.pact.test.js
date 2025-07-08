import { describe, it, expect } from 'vitest'
import { PactV3, MatchersV3 } from '@pact-foundation/pact'

const provider = new PactV3({
  consumer: 'cspb-registrar-ui',
  provider: 'cspb-registrar-api',
  dir: 'pacts',
})

describe('api contract', () => {
  it('lists students', async () => {
    provider
      .given('students exist')
      .uponReceiving('a request for students')
      .withRequest({
        method: 'GET',
        path: '/api/students',
        query: { page: '1', size: '5' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: MatchersV3.like([{ id: 1 }]),
      })

    await provider.executeTest(async (mockServer) => {
      process.env.VITE_API_BASE_URL = mockServer.url
      const api = (await import('./api.js')).default
      const res = await api.listStudents(1, 5)
      expect(res).toEqual([{ id: 1 }])
    })
  })
})
