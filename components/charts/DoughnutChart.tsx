"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { JSX } from "react";

type DoughnutData = Array<{ label: string; value: number }>;

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  data,
  label = "Value",
}: {
  data: DoughnutData;
  label?: string;
}): JSX.Element {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label,
        data: data.map((d) => d.value),
        backgroundColor: [
          "rgba(37, 99, 235, 0.5)",
          "rgba(59, 130, 246, 0.5)",
          "rgba(96, 165, 250, 0.5)",
          "rgba(147, 197, 253, 0.5)",
        ],
        borderColor: [
          "rgb(37, 99, 235)",
          "rgb(59, 130, 246)",
          "rgb(96, 165, 250)",
          "rgb(147, 197, 253)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="relative h-[260px] w-full">
      <Doughnut
        data={chartData}
        options={options}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
