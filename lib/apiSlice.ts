import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl } from "@/lib/fetcher";
import type { DashboardStats, User } from "@/lib/types";
import type { CreateUserRequest, UpdateUserRequest } from "@/lib/api/contracts";
import type { ApiSuccess } from "@/lib/api/response";

type CreateUserPayload = CreateUserRequest;
type CreateUserResponse = ApiSuccess<{ user: User }>;
type UpdateUserPayload = { id: string; changes: UpdateUserRequest };
type UpdateUserResponse = ApiSuccess<{ user: User }>;
type DeleteUserResponse = ApiSuccess<Record<string, never>>;

const baseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    if (!headers.has("accept")) {
      headers.set("accept", "application/json");
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Stats"],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "users",
      transformResponse: (response: ApiSuccess<User[]>) => response.data,
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
      transformResponse: (response: ApiSuccess<DashboardStats>) =>
        response.data,
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
        const optimisticUser: User = {
          id: tempId,
          ...body,
          createdAt: new Date().toISOString(),
        };
        const usersState =
          apiSlice.endpoints.getUsers.select(undefined)(getState());

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
                draft[index] = data.data.user;
              } else {
                draft.unshift(data.data.user);
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
        const usersState =
          apiSlice.endpoints.getUsers.select(undefined)(getState());
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
                  Object.assign(user, data.data.user);
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
        const usersState =
          apiSlice.endpoints.getUsers.select(undefined)(getState());
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
  useLazyGetUsersQuery,
  useLazyGetStatsQuery,
} = apiSlice;
