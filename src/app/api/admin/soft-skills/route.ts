import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.softSkill.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch soft skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch soft skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.softSkill.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create soft skill:', error)
    return NextResponse.json(
      { error: 'Failed to create soft skill' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.softSkill.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update soft skill:', error)
    return NextResponse.json(
      { error: 'Failed to update soft skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.softSkill.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete soft skill:', error)
    return NextResponse.json(
      { error: 'Failed to delete soft skill' },
      { status: 500 }
    )
  }
}
