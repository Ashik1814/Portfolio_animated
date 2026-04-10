import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.certification.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch certifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.certification.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create certification:', error)
    return NextResponse.json(
      { error: 'Failed to create certification' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.certification.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update certification:', error)
    return NextResponse.json(
      { error: 'Failed to update certification' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.certification.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete certification:', error)
    return NextResponse.json(
      { error: 'Failed to delete certification' },
      { status: 500 }
    )
  }
}
