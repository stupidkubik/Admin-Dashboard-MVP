import {
  createApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl, resolveRequestInfo } from "@/lib/fetcher";
import type { DashboardStats, User } from "@/lib/types";

type CreateUserPayload = Omit<User, "id">;
type CreateUserResponse = { ok: boolean; user: User };
type UpdateUserPayload = { id: string; changes: Partial<User> };
type UpdateUserResponse = { ok: boolean; user: User };
type DeleteUserResponse = { ok: boolean };

type BaseQueryError = {
  status: number | "FETCH_ERROR" | "PARSING_ERROR";
  data?: unknown;
  error?: string;
};

const isFormData = (value: unknown): value is FormData =>
  typeof FormData !== "undefined" && value instanceof FormData;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, BaseQueryError> =
  async (args) => {
    const {
      url,
      method = "GET",
      body,
      params,
      headers,
      credentials = "include",
    } = typeof args === "string" ? { url: args } : args;

    let requestUrl = resolveRequestInfo(url, getApiBaseUrl());

    if (params && isPlainObject(params)) {
      const query = new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>(
          (acc, [key, value]) => {
            if (value === undefined || value === null) {
              return acc;
            }
            acc[key] = String(value);
            return acc;
          },
          {},
        ),
      ).toString();
      if (query) {
        requestUrl += requestUrl.includes("?") ? `&${query}` : `?${query}`;
      }
    }

    const requestHeaders = new Headers(headers);
    if (!requestHeaders.has("accept")) {
      requestHeaders.set("accept", "application/json");
    }
    if (
      body !== undefined &&
      body !== null &&
      !isFormData(body) &&
      !requestHeaders.has("content-type")
    ) {
      requestHeaders.set("content-type", "application/json");
    }

    const init: RequestInit = {
      method,
      credentials,
      headers: requestHeaders,
      body:
        body === undefined || body === null
          ? undefined
          : isFormData(body)
            ? body
            : typeof body === "string"
              ? body
              : JSON.stringify(body),
    };

    try {
      const response = await fetch(requestUrl, init);
      const text = await response.text();
      let data: unknown = null;

      if (text) {
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          return {
            error: {
              status: "PARSING_ERROR",
              data: text,
              error:
                parseError instanceof Error
                  ? parseError.message
                  : String(parseError),
            },
          };
        }
      }

      if (!response.ok) {
        return { error: { status: response.status, data } };
      }

      return { data };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { status: "FETCH_ERROR", error: error.message } };
      }

      return { error: { status: "FETCH_ERROR", error: String(error) } };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Stats"],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: "LIST" },
              ...result.map((user) => ({ type: "User" as const, id: user.id })),
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getStats: build.query<DashboardStats, void>({
      query: () => "stats",
      providesTags: [{ type: "Stats", id: "SUMMARY" }],
    }),
    createUser: build.mutation<CreateUserResponse, CreateUserPayload>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
      async onQueryStarted(body, { dispatch, getState, queryFulfilled }) {
        const tempId =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const optimisticUser = { id: tempId, ...body } as User;
        const usersState = apiSlice.endpoints.getUsers.select(undefined)(
          getState(),
        );

        if (!usersState?.data) {
          dispatch(apiSlice.util.upsertQueryData("getUsers", undefined, []));
        }

        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
            draft.unshift(optimisticUser);
          }),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              const index = draft.findIndex((user) => user.id === tempId);
              if (index !== -1) {
                draft[index] = data.user;
              } else {
                draft.unshift(data.user);
              }
            }),
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateUser: build.mutation<UpdateUserResponse, UpdateUserPayload>({
      query: ({ id, changes }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: changes,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id: "LIST" },
        { type: "User", id },
      ],
      async onQueryStarted(
        { id, changes },
        { dispatch, getState, queryFulfilled },
      ) {
        const usersState = apiSlice.endpoints.getUsers.select(undefined)(
          getState(),
        );
        const patchResult = usersState?.data
          ? dispatch(
              apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
                const user = draft.find((entry) => entry.id === id);
                if (user) {
                  Object.assign(user, changes);
                }
              }),
            )
          : null;

        try {
          const { data } = await queryFulfilled;
          if (usersState?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
                const user = draft.find((entry) => entry.id === id);
                if (user) {
                  Object.assign(user, data.user);
                }
              }),
            );
          }
        } catch {
          patchResult?.undo();
        }
      },
    }),
    deleteUser: build.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id: "LIST" },
        { type: "User", id },
      ],
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const usersState = apiSlice.endpoints.getUsers.select(undefined)(
          getState(),
        );
        const patchResult = usersState?.data
          ? dispatch(
              apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
                const index = draft.findIndex((user) => user.id === id);
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              }),
            )
          : null;

        try {
          await queryFulfilled;
        } catch {
          patchResult?.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetStatsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
