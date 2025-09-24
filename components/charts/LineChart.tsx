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
import { useMemo } from 'react'
import { useLocale } from '@/contexts/LocaleProvider'
import type { SeriesPoint } from '@/lib/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function LineChart({ data, label = 'Value' }: { data: SeriesPoint[]; label?: string }) {
  const { locale } = useLocale()

  const labels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric',
    })

    return data.map((point) => {
      if (point.labels?.[locale]) {
        return point.labels[locale]!
      }

      if (point.label) {
        return point.label
      }

      const parsed = new Date(point.date)
      if (!Number.isNaN(parsed.getTime())) {
        return formatter.format(parsed)
      }

      return point.date
    })
  }, [data, locale])

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data: data.map((d) => d.value),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
      },
    ],
  }

  return <Line data={chartData} />
}
