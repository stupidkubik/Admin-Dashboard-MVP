import type { z } from "zod";

export type ApiSuccess<T> = { data: T };
export type ApiError = {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
};

export type ParsedRequest<T> =
  | { success: true; data: T }
  | { success: false; status: 400 | 422; body: ApiError };

export const success = <T>(data: T): ApiSuccess<T> => ({ data });

export const error = (
  code: string,
  message: string,
  fields?: Record<string, string[]>,
): ApiError => ({ error: { code, message, ...(fields ? { fields } : {}) } });

export async function parseJsonRequest<T>(
  request: Pick<Request, "json">,
  schema: z.ZodType<T>,
): Promise<ParsedRequest<T>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return {
      success: false,
      status: 400,
      body: error("MALFORMED_JSON", "Request body must be valid JSON"),
    };
  }

  const parsed = schema.safeParse(payload);
  if (parsed.success) {
    return { success: true, data: parsed.data };
  }

  const fields = parsed.error.issues.reduce<Record<string, string[]>>(
    (result, issue) => {
      const key = issue.path.join(".") || "root";
      result[key] = [...(result[key] ?? []), issue.message];
      return result;
    },
    {},
  );

  return {
    success: false,
    status: 422,
    body: error("VALIDATION_ERROR", "Request validation failed", fields),
  };
}
