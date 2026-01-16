import { useGetStatsQuery } from "@/lib/apiSlice";

export type UseDashboardStatsOptions = Parameters<typeof useGetStatsQuery>[1];

export function useDashboardStats(options?: UseDashboardStatsOptions) {
  return useGetStatsQuery(undefined, options);
}
