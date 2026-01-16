import { useGetUsersQuery } from "@/lib/apiSlice";

export type UseUsersOptions = Parameters<typeof useGetUsersQuery>[1];

export function useUsers(options?: UseUsersOptions) {
  return useGetUsersQuery(undefined, options);
}
