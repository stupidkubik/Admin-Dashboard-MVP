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
jest.mock("../handlers", () => ({
  handlers: [],
}));

import { DEFAULT_API_BASE_URL } from "@/lib/fetcher";
import { shouldBypassWorker } from "../browser";

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
});
