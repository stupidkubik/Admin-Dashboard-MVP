"use client";

import { ComponentType, useEffect, useState } from "react";
import type { DataTableProps } from "./DataTable";

export function useClientDataTable<TData>() {
  const [DataTableComponent, setDataTableComponent] =
    useState<ComponentType<DataTableProps<TData>> | null>(null);

  useEffect(() => {
    let mounted = true;

    void import("./DataTable").then((module) => {
      if (mounted) {
        setDataTableComponent(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return DataTableComponent;
}
