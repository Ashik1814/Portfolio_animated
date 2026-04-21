import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const items = await db.skillCategory.findMany({
      orderBy: { order: 'asc' },
      include: { skills: { orderBy: { order: 'asc' } } },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch skill categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skill categories' },
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
    const item = await db.skillCategory.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create skill category:', error)
    return NextResponse.json(
      { error: 'Failed to create skill category' },
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
    const item = await db.skillCategory.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update skill category:', error)
    return NextResponse.json(
      { error: 'Failed to update skill category' },
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
    await db.skillCategory.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete skill category:', error)
    return NextResponse.json(
      { error: 'Failed to delete skill category' },
      { status: 500 }
    )
  }
}
