import { TextDecoder, TextEncoder } from "util";

if (!globalThis.TextEncoder) {
  // @ts-expect-error TextEncoder is available in browsers but must be polyfilled for Node tests
  globalThis.TextEncoder = TextEncoder;
}

if (!globalThis.TextDecoder) {
  // @ts-expect-error TextDecoder is available in browsers but must be polyfilled for Node tests
  globalThis.TextDecoder = TextDecoder;
}

jest.mock("msw/browser", () => ({
  setupWorker: jest.fn(() => ({
    start: jest.fn(),
  })),
}));
jest.mock("../../lib/fetcher", () => {
  const actual = jest.requireActual("../../lib/fetcher");
  return {
    ...actual,
    getApiBaseUrl: jest.fn(() => actual.DEFAULT_API_BASE_URL),
  };
});
jest.mock("../handlers", () => ({
  handlers: [],
}));

import { DEFAULT_API_BASE_URL, getApiBaseUrl } from "../../lib/fetcher";
import { shouldBypassWorker, startBrowserWorker, worker } from "../browser";

describe("MockServiceWorker bootstrap", () => {
  it("starts when using the default relative base url", () => {
    expect(shouldBypassWorker(DEFAULT_API_BASE_URL)).toBe(false);
    expect(shouldBypassWorker(`${DEFAULT_API_BASE_URL}/`)).toBe(false);
  });

  it("skips when using a custom relative path", () => {
    expect(shouldBypassWorker("/api/v1")).toBe(true);
  });

  it("skips when using an absolute base url", () => {
    expect(shouldBypassWorker("https://example.com/api")).toBe(true);
  });

  it("starts the worker when the base url matches the mock api", async () => {
    const startMock = worker.start as jest.Mock;
    startMock.mockClear();
    (getApiBaseUrl as jest.Mock).mockReturnValue(DEFAULT_API_BASE_URL);

    await startBrowserWorker();

    expect(startMock).toHaveBeenCalledWith({
      onUnhandledRequest: "bypass",
    });
  });

  it("does not start the worker when the base url is custom", async () => {
    const startMock = worker.start as jest.Mock;
    startMock.mockClear();
    (getApiBaseUrl as jest.Mock).mockReturnValue("/api/v1");

    await startBrowserWorker();

    expect(startMock).not.toHaveBeenCalled();
  });
});
