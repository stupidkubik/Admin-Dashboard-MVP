import { useGetUsersQuery } from "@/lib/api/baseApi";

export type UseUsersOptions = Parameters<typeof useGetUsersQuery>[1];

export function useUsers(options?: UseUsersOptions) {
  return useGetUsersQuery(undefined, options);
}
