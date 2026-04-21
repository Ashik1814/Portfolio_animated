import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const items = await db.journeyItem.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch journey items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journey items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const item = await db.journeyItem.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create journey item:', error)
    return NextResponse.json(
      { error: 'Failed to create journey item' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, ...data } = await request.json()
    const item = await db.journeyItem.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update journey item:', error)
    return NextResponse.json(
      { error: 'Failed to update journey item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await db.journeyItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete journey item:', error)
    return NextResponse.json(
      { error: 'Failed to delete journey item' },
      { status: 500 }
    )
  }
}
