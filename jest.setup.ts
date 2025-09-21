import '@testing-library/jest-dom'

let server
let resetMockData

try {
  ;({ server } = require('./mocks/server'))
  ;({ resetMockData } = require('./mocks/handlers'))
} catch {
  // MSW isn't available (e.g. older Node runtime without fetch/Response); skip wiring.
}

if (server) {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterEach(() => {
    server.resetHandlers()
    resetMockData?.()
  })

  afterAll(() => server.close())
}
