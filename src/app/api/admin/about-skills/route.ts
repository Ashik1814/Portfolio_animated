import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

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
    
    if (data.title && (typeof data.title !== 'string' || data.title.length > 100)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }
    if (data.description && (typeof data.description !== 'string' || data.description.length > 500)) {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 })
    }
    if (data.metric && (typeof data.metric !== 'string' || data.metric.length > 20)) {
      return NextResponse.json({ error: 'Invalid metric' }, { status: 400 })
    }
    if (data.metricLabel && (typeof data.metricLabel !== 'string' || data.metricLabel.length > 50)) {
      return NextResponse.json({ error: 'Invalid metricLabel' }, { status: 400 })
    }
    
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
    
    if (data.title && (typeof data.title !== 'string' || data.title.length > 100)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }
    if (data.description && (typeof data.description !== 'string' || data.description.length > 500)) {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 })
    }
    if (data.metric && (typeof data.metric !== 'string' || data.metric.length > 20)) {
      return NextResponse.json({ error: 'Invalid metric' }, { status: 400 })
    }
    if (data.metricLabel && (typeof data.metricLabel !== 'string' || data.metricLabel.length > 50)) {
      return NextResponse.json({ error: 'Invalid metricLabel' }, { status: 400 })
    }
    
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
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
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
