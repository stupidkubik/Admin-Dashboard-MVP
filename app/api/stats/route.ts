import { NextResponse } from 'next/server'
import data from '@/mocks/data/stats.json'

export async function GET() {
  return NextResponse.json(data)
}
