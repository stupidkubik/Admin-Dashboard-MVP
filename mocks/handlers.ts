import { http, HttpResponse } from 'msw'
import users from './data/users.json'
import stats from './data/stats.json'

type User = (typeof users)[number]

type LoginPayload = {
  email?: string
  password?: string
  [key: string]: unknown
}

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

let usersDb: User[] = clone(users)

const generateId = () => Math.random().toString(36).slice(2, 10)

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(usersDb)
  }),
  http.post('/api/users', async ({ request }) => {
    const body = (await request.json()) as Partial<User>
    const newUser = {
      id: generateId(),
      ...body,
    } as User

    usersDb = [...usersDb, newUser]

    return HttpResponse.json({ ok: true, user: newUser }, { status: 201 })
  }),
  http.get('/api/stats', () => {
    return HttpResponse.json(clone(stats))
  }),
  http.post('/api/auth', async ({ request }) => {
    const body = (await request.json()) as LoginPayload
    return HttpResponse.json({ ok: true, user: { id: '1', ...body } })
  }),
]

export function resetMockData() {
  usersDb = clone(users)
}
