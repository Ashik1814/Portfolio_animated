import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await db.additionalTech.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch additional tech:', error)
    return NextResponse.json(
      { error: 'Failed to fetch additional tech' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const item = await db.additionalTech.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create additional tech:', error)
    return NextResponse.json(
      { error: 'Failed to create additional tech' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const item = await db.additionalTech.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update additional tech:', error)
    return NextResponse.json(
      { error: 'Failed to update additional tech' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.additionalTech.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete additional tech:', error)
    return NextResponse.json(
      { error: 'Failed to delete additional tech' },
      { status: 500 }
    )
  }
}
