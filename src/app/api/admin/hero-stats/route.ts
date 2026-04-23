import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const items = await db.heroStat.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch hero stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero stats' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    let data;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    
    if (data.value && (typeof data.value !== 'string' || data.value.length > 20)) {
      return NextResponse.json({ error: 'Invalid value' }, { status: 400 })
    }
    if (data.label && (typeof data.label !== 'string' || data.label.length > 50)) {
      return NextResponse.json({ error: 'Invalid label' }, { status: 400 })
    }
    if (data.position && !['left-top', 'right-middle', 'left-bottom'].includes(data.position)) {
      return NextResponse.json({ error: 'Invalid position' }, { status: 400 })
    }
    
    const item = await db.heroStat.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create hero stat:', error)
    return NextResponse.json(
      { error: 'Failed to create hero stat' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    let data;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    
    const { id, ...updateData } = data
    
    if (updateData.value && (typeof updateData.value !== 'string' || updateData.value.length > 20)) {
      return NextResponse.json({ error: 'Invalid value' }, { status: 400 })
    }
    if (updateData.label && (typeof updateData.label !== 'string' || updateData.label.length > 50)) {
      return NextResponse.json({ error: 'Invalid label' }, { status: 400 })
    }
    if (updateData.position && !['left-top', 'right-middle', 'left-bottom'].includes(updateData.position)) {
      return NextResponse.json({ error: 'Invalid position' }, { status: 400 })
    }
    
    const item = await db.heroStat.update({ where: { id }, data: updateData })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update hero stat:', error)
    return NextResponse.json(
      { error: 'Failed to update hero stat' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    await db.heroStat.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete hero stat:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero stat' },
      { status: 500 }
    )
  }
}
