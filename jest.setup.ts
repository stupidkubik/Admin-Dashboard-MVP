import '@testing-library/jest-dom'

const { TextDecoder, TextEncoder } = require('util')
const { ReadableStream, TransformStream, WritableStream } = require('stream/web')
const { BroadcastChannel, MessageChannel, MessagePort } = require('worker_threads')

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  WritableStream,
  TransformStream,
  MessageChannel,
  MessagePort,
  BroadcastChannel,
})

const { fetch, Headers, Request, Response } = require('undici')

Object.assign(globalThis, { fetch, Headers, Request, Response })

const { server } = require('./mocks/server')
const { resetMockData } = require('./mocks/handlers')

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => {
  server.resetHandlers()
  resetMockData()
})

afterAll(() => server.close())
