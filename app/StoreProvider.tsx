"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore, type RootState } from "@/lib/store";

type StoreProviderProps = {
  children: ReactNode;
  preloadedState?: RootState;
};

export default function StoreProvider({
  children,
  preloadedState,
}: StoreProviderProps) {
  const [store] = useState<AppStore>(() => makeStore(preloadedState));

  return <Provider store={store}>{children}</Provider>;
}
