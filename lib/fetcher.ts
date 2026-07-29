export const DEFAULT_API_BASE_URL = "/api";

type NextData = {
  config?: {
    basePath?: string;
  };
};

type WindowWithNextData = typeof window & {
  __NEXT_DATA__?: NextData;
};

const DEFAULT_INIT: RequestInit = {
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

function ensureTrailingSlash(value: string): string {
  if (!value) {
    return "";
  }

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
  const mergedHeaders = mergeHeaders(DEFAULT_INIT.headers, init?.headers);

  return {
    ...DEFAULT_INIT,
    ...init,
    headers: mergedHeaders,
  };
}

export function getApiBaseUrl(): string {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredBaseUrl && configuredBaseUrl !== DEFAULT_API_BASE_URL) {
    return configuredBaseUrl;
  }

  const basePath = getBasePath();

  if (basePath) {
    const normalizedBasePath = basePath.endsWith("/")
      ? basePath.slice(0, -1)
      : basePath;
    return `${normalizedBasePath}${DEFAULT_API_BASE_URL}`;
  }

  return configuredBaseUrl || DEFAULT_API_BASE_URL;
}

function getBasePath(): string {
  if (typeof window !== "undefined") {
    const nextData = (window as WindowWithNextData).__NEXT_DATA__;
    const runtimeBasePath = nextData?.config?.basePath?.trim();

    if (runtimeBasePath) {
      return runtimeBasePath;
    }
  }

  const envBasePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.trim() ||
    process.env.__NEXT_ROUTER_BASEPATH?.trim();

  return envBasePath?.replace(/\/+$/, "") || "";
}

function normalizeLocalBase(base: string): string {
  if (!base) {
    return "";
  }

  const hasLeadingSlash = base.startsWith("/");
  const trimmed = base.replace(/^\/+/, "");
  const normalized = hasLeadingSlash ? `/${trimmed}` : trimmed;

  if (!normalized) {
    return hasLeadingSlash ? "/" : "";
  }

  return ensureTrailingSlash(normalized);
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
    const normalizedInput = input.replace(/^\/+/, "");
    return new URL(normalizedInput, absoluteBase).toString();
  }

  const normalizedBase = normalizeLocalBase(normalizedBaseUrl);
  const normalizedInput = input.replace(/^\/+/, "");

  if (!normalizedBase) {
    return normalizedInput;
  }

  return `${normalizedBase}${normalizedInput}`;
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
  init: RequestInit | undefined,
  schema: z.ZodType<T>,
): Promise<T>;
export async function fetcher(
  input: RequestInfo,
  init?: RequestInit,
): Promise<unknown>;
export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
  schema?: z.ZodType<T>,
): Promise<T | unknown> {
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

  const payload: unknown = await response.json();
  return schema ? schema.parse(payload) : payload;
}
import type { z } from "zod";
