"use client";

import { ChangeEvent } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/Input";
import ColumnVisibilityMenu from "./ColumnVisibilityMenu";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  filter: string;
  onFilterChange: (value: string) => void;
  showSearch: boolean;
  searchPlaceholder: string;
};

export default function DataTableToolbar<TData>({
  table,
  filter,
  onFilterChange,
  showSearch,
  searchPlaceholder,
}: DataTableToolbarProps<TData>) {
  const handleFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {showSearch ? (
        <div className="w-full sm:w-64">
          <Input
            aria-label={searchPlaceholder}
            placeholder={searchPlaceholder}
            value={filter}
            onChange={handleFilterInput}
          />
        </div>
      ) : (
        <span />
      )}
      <ColumnVisibilityMenu table={table} />
    </div>
  );
}
