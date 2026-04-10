import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.coursework.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch coursework:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coursework' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.coursework.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create coursework:', error)
    return NextResponse.json(
      { error: 'Failed to create coursework' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.coursework.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update coursework:', error)
    return NextResponse.json(
      { error: 'Failed to update coursework' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.coursework.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete coursework:', error)
    return NextResponse.json(
      { error: 'Failed to delete coursework' },
      { status: 500 }
    )
  }
}
