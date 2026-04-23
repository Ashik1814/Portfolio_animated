import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const items = await db.contactCard.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch contact cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact cards' },
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
    
    if (data.label && (typeof data.label !== 'string' || data.label.length > 100)) {
      return NextResponse.json({ error: 'Invalid label' }, { status: 400 })
    }
    if (data.value && (typeof data.value !== 'string' || data.value.length > 200)) {
      return NextResponse.json({ error: 'Invalid value' }, { status: 400 })
    }
    if (data.href && (typeof data.href !== 'string' || data.href.length > 500)) {
      return NextResponse.json({ error: 'Invalid href' }, { status: 400 })
    }
    
    const item = await db.contactCard.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create contact card:', error)
    return NextResponse.json(
      { error: 'Failed to create contact card' },
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
    
    if (data.label && (typeof data.label !== 'string' || data.label.length > 100)) {
      return NextResponse.json({ error: 'Invalid label' }, { status: 400 })
    }
    if (data.value && (typeof data.value !== 'string' || data.value.length > 200)) {
      return NextResponse.json({ error: 'Invalid value' }, { status: 400 })
    }
    if (data.href && (typeof data.href !== 'string' || data.href.length > 500)) {
      return NextResponse.json({ error: 'Invalid href' }, { status: 400 })
    }
    
    const item = await db.contactCard.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update contact card:', error)
    return NextResponse.json(
      { error: 'Failed to update contact card' },
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
    await db.contactCard.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete contact card:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact card' },
      { status: 500 }
    )
  }
}
