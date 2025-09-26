import { FetchError, fetcher } from "../fetcher";

describe("fetcher", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    delete process.env.__NEXT_ROUTER_BASEPATH;
    delete (window as typeof window & { __NEXT_DATA__?: unknown }).__NEXT_DATA__;
  });

  it("returns json for successful responses", async () => {
    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    const result = await fetcher<typeof data>("stats");
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/stats",
      expect.objectContaining({
        credentials: "include",
      }),
    );
    expect(result).toEqual(data);
  });

  it("throws for error responses", async () => {
    const clone = jest
      .fn()
      .mockReturnValueOnce({
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
        text: jest.fn(),
      })
      .mockReturnValueOnce({
        json: jest.fn(),
        text: jest.fn().mockResolvedValue(""),
      });

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      clone,
    } as any);

    await expect(fetcher("stats")).rejects.toThrow(
      "Failed to fetch data: 500 Internal Server Error",
    );
  });

  it("attaches parsed json error details", async () => {
    const details = { message: "Too many requests" };
    const clone = jest.fn().mockReturnValue({
      json: jest.fn().mockResolvedValue(details),
      text: jest.fn(),
    });

    const response = {
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      clone,
    } as any;

    global.fetch = jest.fn().mockResolvedValue(response);

    expect.assertions(6);

    try {
      await fetcher("stats");
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);
      expect((error as FetchError).status).toBe(429);
      expect(error).toHaveProperty(
        "message",
        "Failed to fetch data: 429 Too Many Requests",
      );
      expect((error as FetchError).details).toEqual(details);
      expect((error as FetchError).response).toBe(response);
      expect(clone).toHaveBeenCalledTimes(1);
    }
  });

  it("falls back to text details when json parsing fails", async () => {
    const clone = jest
      .fn()
      .mockReturnValueOnce({
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
        text: jest.fn(),
      })
      .mockReturnValueOnce({
        json: jest.fn(),
        text: jest.fn().mockResolvedValue("Plain error message"),
      });

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      clone,
    } as any);

    expect.assertions(5);

    try {
      await fetcher("stats");
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);
      expect((error as FetchError).status).toBe(400);
      expect(error).toHaveProperty(
        "message",
        "Failed to fetch data: 400 Bad Request",
      );
      expect((error as FetchError).details).toBe("Plain error message");
      expect(clone).toHaveBeenCalledTimes(2);
    }
  });

  it("resolves requests against the configured api base url", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://example.com/api";
    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    await fetcher("users");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/api/users",
      expect.any(Object),
    );
  });

  it("prefixes the default api base with the configured base path", async () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/preview";
    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    await fetcher("stats");

    expect(global.fetch).toHaveBeenCalledWith(
      "/preview/api/stats",
      expect.any(Object),
    );
  });

  it("reads the base path from runtime next data", async () => {
    (window as typeof window & {
      __NEXT_DATA__?: { config?: { basePath?: string } };
    }).__NEXT_DATA__ = { config: { basePath: "/docs" } };

    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    await fetcher("users");

    expect(global.fetch).toHaveBeenCalledWith(
      "/docs/api/users",
      expect.any(Object),
    );
  });

  it("merges default request init options", async () => {
    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    await fetcher("stats", {
      headers: {
        Accept: "text/plain",
      },
    });

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    const headers = init?.headers as Headers;

    expect(init).toMatchObject({
      credentials: "include",
    });
    expect(headers).toBeInstanceOf(Headers);
    expect(headers.get("Accept")).toBe("text/plain");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("preserves request objects", async () => {
    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    const request = {
      url: "https://example.com/test",
      headers: {
        Authorization: "Bearer token",
      },
    } as Request;

    await fetcher(request);

    expect(global.fetch).toHaveBeenCalledWith(
      request,
      expect.objectContaining({
        credentials: "include",
      }),
    );
  });
});
