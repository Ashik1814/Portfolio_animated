import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.projectTag.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch project tags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project tags' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.projectTag.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create project tag:', error)
    return NextResponse.json(
      { error: 'Failed to create project tag' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.projectTag.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update project tag:', error)
    return NextResponse.json(
      { error: 'Failed to update project tag' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.projectTag.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete project tag:', error)
    return NextResponse.json(
      { error: 'Failed to delete project tag' },
      { status: 500 }
    )
  }
}
