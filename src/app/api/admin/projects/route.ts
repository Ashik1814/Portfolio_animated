import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const items = await db.project.findMany({
      orderBy: { order: 'asc' },
      include: { tags: { orderBy: { order: 'asc' } } },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
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
    
    if (data.title && (typeof data.title !== 'string' || data.title.length > 200)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }
    if (data.description && (typeof data.description !== 'string' || data.description.length > 5000)) {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 })
    }
    
    const item = await db.project.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
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
    
    if (data.title && (typeof data.title !== 'string' || data.title.length > 200)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }
    if (data.description && (typeof data.description !== 'string' || data.description.length > 5000)) {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 })
    }
    
    const item = await db.project.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
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
    await db.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
