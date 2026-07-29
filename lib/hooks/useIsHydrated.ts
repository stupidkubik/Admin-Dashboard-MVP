"use client";

import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => () => {};

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
