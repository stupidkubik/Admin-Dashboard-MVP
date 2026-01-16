import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl } from "@/lib/fetcher";
import type { DashboardStats, User } from "@/lib/types";

type CreateUserPayload = Omit<User, "id">;
type CreateUserResponse = { ok: boolean; user: User };
type UpdateUserPayload = { id: string; changes: Partial<User> };
type UpdateUserResponse = { ok: boolean; user: User };
type DeleteUserResponse = { ok: boolean };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    credentials: "include",
  }),
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
