import { User } from "../types";
import { useData, UseDataConfig } from "./useData";

export function useUsers(config?: UseDataConfig<User[]>) {
  return useData<User[]>("users", config);
}
