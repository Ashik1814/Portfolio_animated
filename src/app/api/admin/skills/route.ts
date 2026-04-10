import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.skill.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.skill.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create skill:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.skill.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update skill:', error)
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.skill.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete skill:', error)
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}
