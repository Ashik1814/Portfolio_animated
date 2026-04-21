import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const items = await db.heroStat.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch hero stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero stats' },
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
    const item = await db.heroStat.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create hero stat:', error)
    return NextResponse.json(
      { error: 'Failed to create hero stat' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    const item = await db.heroStat.update({ where: { id }, data: updateData })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update hero stat:', error)
    return NextResponse.json(
      { error: 'Failed to update hero stat' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    await db.heroStat.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete hero stat:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero stat' },
      { status: 500 }
    )
  }
}
