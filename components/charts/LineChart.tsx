'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

type Series = Array<{ date: string; value: number }>

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function LineChart({ data }: { data: Series }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Value',
        data: data.map((d) => d.value),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
      },
    ],
  }

  return <Line data={chartData} />
}
