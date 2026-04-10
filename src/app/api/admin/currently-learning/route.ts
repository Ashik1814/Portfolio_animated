import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.currentlyLearning.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch currently learning:', error)
    return NextResponse.json(
      { error: 'Failed to fetch currently learning' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.currentlyLearning.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create currently learning:', error)
    return NextResponse.json(
      { error: 'Failed to create currently learning' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.currentlyLearning.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update currently learning:', error)
    return NextResponse.json(
      { error: 'Failed to update currently learning' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.currentlyLearning.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete currently learning:', error)
    return NextResponse.json(
      { error: 'Failed to delete currently learning' },
      { status: 500 }
    )
  }
}
