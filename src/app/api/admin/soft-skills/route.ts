import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

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
    
    if (data.name && (typeof data.name !== 'string' || data.name.length > 100)) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (data.percentage !== undefined && (typeof data.percentage !== 'number' || data.percentage < 0 || data.percentage > 100)) {
      return NextResponse.json({ error: 'Invalid percentage' }, { status: 400 })
    }
    
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
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    
    const { id, ...data } = body
    
    if (data.name && (typeof data.name !== 'string' || data.name.length > 100)) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (data.percentage !== undefined && (typeof data.percentage !== 'number' || data.percentage < 0 || data.percentage > 100)) {
      return NextResponse.json({ error: 'Invalid percentage' }, { status: 400 })
    }
    
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
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
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
