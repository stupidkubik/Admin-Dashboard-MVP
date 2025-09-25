export const DEFAULT_API_BASE_URL = "/api";

const DEFAULT_INIT: RequestInit = {
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function isAbsoluteUrl(value: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
}

function mergeHeaders(base?: HeadersInit, override?: HeadersInit): Headers {
  const headers = new Headers(base);
  if (!override) {
    return headers;
  }

  const overrideHeaders = new Headers(override);
  overrideHeaders.forEach((value, key) => {
    headers.set(key, value);
  });

  return headers;
}

function mergeRequestInit(init?: RequestInit): RequestInit {
  const mergedHeaders = mergeHeaders(
    DEFAULT_INIT.headers,
    init?.headers,
  );

  return {
    ...DEFAULT_INIT,
    ...init,
    headers: mergedHeaders,
  };
}

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;
}

function resolveRelativePath(url: URL, base: string): string {
  if (!base.startsWith("/")) {
    return url.toString();
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function resolveRequestInfo(
  input: RequestInfo,
  baseUrl = getApiBaseUrl(),
): RequestInfo {
  if (typeof input !== "string") {
    return input;
  }

  if (isAbsoluteUrl(input) || input.startsWith("//")) {
    return input;
  }

  const normalizedBaseUrl = baseUrl || DEFAULT_API_BASE_URL;

  if (isAbsoluteUrl(normalizedBaseUrl) || normalizedBaseUrl.startsWith("//")) {
    const absoluteBase = ensureTrailingSlash(normalizedBaseUrl);
    const normalizedInput = input.replace(/^\//, "");
    return new URL(normalizedInput, absoluteBase).toString();
  }

  const dummyOrigin = "http://localhost";
  const baseWithOrigin = new URL(
    ensureTrailingSlash(normalizedBaseUrl),
    dummyOrigin,
  );

  const normalizedInput = input.startsWith("/")
    ? input.replace(/^\/+/, "")
    : input;

  const resolved = new URL(normalizedInput, baseWithOrigin);

  return resolveRelativePath(resolved, normalizedBaseUrl);
}

export class FetchError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
    public response?: Response,
  ) {
    super(message);
    this.name = "FetchError";
  }
}

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const resolvedInput = resolveRequestInfo(input);
  const response = await fetch(resolvedInput, mergeRequestInit(init));

  if (!response.ok) {
    let details: unknown;

    try {
      details = await response.clone().json();
    } catch {
      try {
        const text = await response.clone().text();
        details = text || undefined;
      } catch {
        details = undefined;
      }
    }

    const error = new FetchError(
      response.status,
      `Failed to fetch data: ${response.status} ${response.statusText}`,
      details,
      response,
    );
    throw error;
  }

  return response.json() as Promise<T>;
}
