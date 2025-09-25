import { FetchError, fetcher } from "../fetcher";

describe("fetcher", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
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
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as any);

    await expect(fetcher("stats")).rejects.toThrow(
      "Failed to fetch data: 500 Internal Server Error",
    );
  });

  it("exposes FetchError metadata when request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    } as any);

    expect.assertions(4);

    try {
      await fetcher("stats");
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);
      expect((error as FetchError).status).toBe(400);
      expect(error).toHaveProperty(
        "message",
        "Failed to fetch data: 400 Bad Request",
      );
      expect((error as FetchError).name).toBe("FetchError");
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
