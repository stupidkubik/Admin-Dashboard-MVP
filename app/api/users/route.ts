import { NextResponse } from 'next/server'
import data from '@/mocks/data/users.json'

export async function GET() {
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json({ ok: true, user: { id: crypto.randomUUID(), ...body } }, { status: 201 })
}
