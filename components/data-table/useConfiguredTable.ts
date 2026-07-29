"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ColumnDef,
  FilterFn,
  Table,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLocale } from "@/contexts/LocaleProvider";

export type UseConfiguredTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchKey?: string;
  searchKeys?: string[];
  initialPageSize?: number;
};

export type UseConfiguredTableResult<TData> = {
  table: Table<TData>;
  filter: string;
  onFilterChange: (value: string) => void;
  effectiveSearchKeys?: string[];
  searchPlaceholder: string;
  hasToolbar: boolean;
  filteredRowCount: number;
  totalRowCount: number;
};

export function useConfiguredTable<TData>({
  columns,
  data,
  searchKey,
  searchKeys,
  initialPageSize = 10,
}: UseConfiguredTableProps<TData>): UseConfiguredTableResult<TData> {
  const [filter, setFilter] = useState("");
  const { t } = useLocale();

  const effectiveSearchKeys = useMemo(() => {
    if (searchKeys && searchKeys.length > 0) {
      return searchKeys;
    }
    if (searchKey) {
      return [searchKey];
    }
    return undefined;
  }, [searchKeys, searchKey]);

  const searchPlaceholder = useMemo(() => {
    if (!effectiveSearchKeys || effectiveSearchKeys.length === 0) {
      return t("common.table.search.default", "Search...");
    }
    if (effectiveSearchKeys.length === 1) {
      return t("common.table.search.single", "Search {{field}}...").replace(
        "{{field}}",
        effectiveSearchKeys[0],
      );
    }
    return t("common.table.search.multiple", "Search {{fields}}...").replace(
      "{{fields}}",
      effectiveSearchKeys.join(" / "),
    );
  }, [effectiveSearchKeys, t]);

  const globalFilterFn: FilterFn<TData> = useMemo(() => {
    return (row, _columnId, value) => {
      if (!value) return true;
      if (!effectiveSearchKeys || effectiveSearchKeys.length === 0) {
        return String(row.original ?? "")
          .toLowerCase()
          .includes(String(value).toLowerCase());
      }
      const searchValue = String(value).toLowerCase();
      return effectiveSearchKeys.some((key) => {
        const cellValue = (row.original as Record<string, unknown>)[key];
        if (cellValue == null) return false;
        return String(cellValue).toLowerCase().includes(searchValue);
      });
    };
  }, [effectiveSearchKeys]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter,
    },
    initialState: {
      pagination: { pageSize: initialPageSize },
    },
    onGlobalFilterChange: setFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasToolbar =
    Boolean(effectiveSearchKeys) || table.getAllLeafColumns().length > 1;
  const filteredRowCount = table.getFilteredRowModel().rows.length;
  const totalRowCount = table.getPreFilteredRowModel().rows.length;

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  return {
    table,
    filter,
    onFilterChange: handleFilterChange,
    effectiveSearchKeys,
    searchPlaceholder,
    hasToolbar,
    filteredRowCount,
    totalRowCount,
  };
}
