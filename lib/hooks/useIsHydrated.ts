"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
