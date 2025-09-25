import { DashboardStats } from "../types";
import { useData, UseDataConfig } from "./useData";

export function useDashboardStats(config?: UseDataConfig<DashboardStats>) {
  return useData<DashboardStats>("stats", config);
}
