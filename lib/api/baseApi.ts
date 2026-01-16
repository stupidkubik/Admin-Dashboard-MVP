import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl } from "@/lib/fetcher";
import type { DashboardStats, User } from "@/lib/types";

type CreateUserPayload = Omit<User, "id">;
type CreateUserResponse = { ok: boolean; user: User };

export const baseApi = createApi({
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
  }),
});

export const {
  useGetUsersQuery,
  useGetStatsQuery,
  useCreateUserMutation,
} = baseApi;
