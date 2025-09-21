jest.mock('msw', () => {
  const createHandler = (method: string) =>
    jest.fn((path: string, resolver: (...args: unknown[]) => unknown) => ({
      method,
      path,
      resolver,
    }))

  return {
    http: {
      get: createHandler('GET'),
      post: createHandler('POST'),
    },
    HttpResponse: {
      json: jest.fn((body: unknown, init?: unknown) => ({ body, init })),
    },
  }
})

jest.mock('msw/node', () => {
  const setupServer = (...handlers: unknown[]) => ({
    listen: jest.fn(),
    close: jest.fn(),
    resetHandlers: jest.fn(),
    listHandlers: () => handlers,
  })

  return { setupServer }
})

describe('MSW server configuration', () => {
  it('exposes registered handlers', () => {
    const { server } = require('../server')

    expect(typeof server.listen).toBe('function')
    expect(typeof server.close).toBe('function')

    const handlers = server.listHandlers()
    expect(Array.isArray(handlers)).toBe(true)
    expect(handlers.length).toBeGreaterThan(0)
  })
})

describe('MSW handlers', () => {
  const users = require('../data/users.json')
  const stats = require('../data/stats.json')

  afterEach(() => {
    const { resetMockData } = require('../handlers')
    resetMockData()
  })

  const findHandler = (method: string, path: string) => {
    const { handlers } = require('../handlers')
    return handlers.find(
      (handler: { method: string; path: string }) =>
        handler.method === method && handler.path === path
    ) as { resolver: (...args: any[]) => any }
  }

  it('returns seeded users for GET /api/users', () => {
    const handler = findHandler('GET', '/api/users')

    const response = handler.resolver()
    expect(response.body).toEqual(users)
  })

  it('creates a new user on POST /api/users', async () => {
    const handler = findHandler('POST', '/api/users')

    const newUser = { name: 'New User', email: 'new@example.com' }
    const response = await handler.resolver({
      request: {
        json: () => Promise.resolve(newUser),
      },
    })

    expect(response.body.user).toMatchObject(newUser)
    expect(response.init).toMatchObject({ status: 201 })

    const listHandler = findHandler('GET', '/api/users')
    const listResponse = listHandler.resolver()
    expect(listResponse.body).toHaveLength(users.length + 1)
  })

  it('returns dashboard stats for GET /api/stats', () => {
    const handler = findHandler('GET', '/api/stats')

    const response = handler.resolver()
    expect(response.body).toEqual(stats)
  })

  it('returns user payload on POST /api/auth', async () => {
    const handler = findHandler('POST', '/api/auth')

    const credentials = { email: 'user@example.com', password: 'secret' }
    const response = await handler.resolver({
      request: {
        json: () => Promise.resolve(credentials),
      },
    })

    expect(response.body).toEqual({ ok: true, user: { id: '1', ...credentials } })
  })
})
