import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

type LineChartProps = Parameters<(typeof import("./LineChart"))["default"]>[0];
type BarChartProps = Parameters<(typeof import("./BarChart"))["default"]>[0];
type DoughnutChartProps = Parameters<(typeof import("./DoughnutChart"))["default"]>[0];

function ChartSkeleton() {
  return <Skeleton className="h-64 w-full" />;
}

export const LineChart = dynamic<LineChartProps>(
  () => import("./LineChart").then((mod) => mod.default),
  {
    ssr: false,
    loading: ChartSkeleton,
  },
);

export const BarChart = dynamic<BarChartProps>(
  () => import("./BarChart").then((mod) => mod.default),
  {
    ssr: false,
    loading: ChartSkeleton,
  },
);

export const DoughnutChart = dynamic<DoughnutChartProps>(
  () => import("./DoughnutChart").then((mod) => mod.default),
  {
    ssr: false,
    loading: ChartSkeleton,
  },
);
