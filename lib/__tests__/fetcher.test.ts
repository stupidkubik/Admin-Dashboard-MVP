import { FetchError, fetcher } from "../fetcher";

describe("fetcher", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns json for successful responses", async () => {
    const data = { ok: true };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    } as any);

    const result = await fetcher<typeof data>("/api");
    expect(result).toEqual(data);
  });

  it("throws for error responses", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as any);

    await expect(fetcher("/api")).rejects.toThrow(
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
      await fetcher("/api");
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
});
