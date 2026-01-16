import { useGetStatsQuery } from "@/lib/api/baseApi";

export type UseDashboardStatsOptions = Parameters<typeof useGetStatsQuery>[1];

export function useDashboardStats(options?: UseDashboardStatsOptions) {
  return useGetStatsQuery(undefined, options);
}
