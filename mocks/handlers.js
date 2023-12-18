import { rest } from 'msw'

export const handlers = [
  rest.get('/categories/statistik', (req, res, ctx) => {
    return res(
      ctx.json({
        activeUsers: 6,
        premiumClass: 4,
        activeClass: 7,
      })
    )
  }),
]
