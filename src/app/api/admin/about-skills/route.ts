import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.aboutSkill.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch about skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.aboutSkill.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create about skill:', error)
    return NextResponse.json(
      { error: 'Failed to create about skill' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.aboutSkill.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update about skill:', error)
    return NextResponse.json(
      { error: 'Failed to update about skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.aboutSkill.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete about skill:', error)
    return NextResponse.json(
      { error: 'Failed to delete about skill' },
      { status: 500 }
    )
  }
}
