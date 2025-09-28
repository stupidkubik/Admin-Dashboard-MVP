import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

type LineChartComponent = (typeof import("./LineChart"))["default"];
type BarChartComponent = (typeof import("./BarChart"))["default"];
type DoughnutChartComponent = (typeof import("./DoughnutChart"))["default"];

function ChartSkeleton() {
  return <Skeleton className="h-64 w-full" />;
}

export const LineChart = dynamic<LineChartComponent>(
  () => import("./LineChart"),
  {
    ssr: false,
    loading: ChartSkeleton,
  },
);

export const BarChart = dynamic<BarChartComponent>(
  () => import("./BarChart"),
  {
    ssr: false,
    loading: ChartSkeleton,
  },
);

export const DoughnutChart = dynamic<DoughnutChartComponent>(
  () => import("./DoughnutChart"),
  {
    ssr: false,
    loading: ChartSkeleton,
  },
);
