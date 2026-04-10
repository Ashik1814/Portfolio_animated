import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.aboutTechTag.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch about tech tags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about tech tags' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.aboutTechTag.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create about tech tag:', error)
    return NextResponse.json(
      { error: 'Failed to create about tech tag' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.aboutTechTag.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update about tech tag:', error)
    return NextResponse.json(
      { error: 'Failed to update about tech tag' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.aboutTechTag.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete about tech tag:', error)
    return NextResponse.json(
      { error: 'Failed to delete about tech tag' },
      { status: 500 }
    )
  }
}
