"use client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";

type Props = {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  className?: string;
};

export default function StatCard({
  label,
  value,
  trend,
  trendLabel,
  className = "",
}: Props) {
  const showTrend = trend !== undefined;
  const isPositive = typeof trend === "number" && trend > 0;
  const isNegative = typeof trend === "number" && trend < 0;
  const isNeutral = trend === 0;

  return (
    <div className={`rounded-lg bg-card p-4 shadow ${className}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {showTrend && (
        <div className="mt-2 flex items-center text-sm">
          <span
            className={`flex items-center ${
              isNeutral
                ? "text-muted-foreground"
                : isPositive
                  ? "text-success"
                  : "text-danger"
            }`}
          >
            {isNeutral ? (
              <MinusIcon className="h-4 w-4" />
            ) : isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            {Math.abs(trend ?? 0)}%
          </span>
          {trendLabel && (
            <span className="ml-2 text-muted-foreground">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
