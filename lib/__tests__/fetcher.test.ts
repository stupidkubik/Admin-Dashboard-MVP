import { fetcher } from '../fetcher'

describe('fetcher', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns json for successful responses', async () => {
    const data = { ok: true }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any)

    const result = await fetcher<typeof data>('/api')
    expect(result).toEqual(data)
  })

  it('throws for error responses', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as any)

    await expect(fetcher('/api')).rejects.toThrow(
      'Failed to fetch data: 500 Internal Server Error'
    )
  })
})
