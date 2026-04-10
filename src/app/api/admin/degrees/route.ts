import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.degree.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch degrees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch degrees' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.degree.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create degree:', error)
    return NextResponse.json(
      { error: 'Failed to create degree' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.degree.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update degree:', error)
    return NextResponse.json(
      { error: 'Failed to update degree' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.degree.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete degree:', error)
    return NextResponse.json(
      { error: 'Failed to delete degree' },
      { status: 500 }
    )
  }
}
