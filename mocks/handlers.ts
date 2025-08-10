import { rest } from 'msw'
import users from './data/users.json'
import stats from './data/stats.json'

export const handlers = [
  rest.get('/api/users', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users))
  }),
  rest.get('/api/stats', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(stats))
  }),
]
