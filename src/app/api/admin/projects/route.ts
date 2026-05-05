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
    
    const item = await db.project.create({ 
      data: { 
        title: data.title || "Untitled",
        description: data.description || "",
        category: data.category || "Development",
        gradient: data.gradient || "from-[#00e5ff] to-[#64b5f6]",
        imageUrl: data.imageUrl || "",
        videoUrl: data.videoUrl || "",
        liveUrl: data.liveUrl || "#",
        order: Number(data.order) || 0,
        images: data.images || "[]",
      }
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create project:', error)
    let errorMessage = 'Failed to create project'
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      if ((error as any).code) console.error('Prisma error code:', (error as any).code)
      if ((error as any).meta) console.error('Prisma error meta:', JSON.stringify((error as any).meta))
      // Return detailed error message for debugging (non-production only)
      if (process.env.NODE_ENV !== 'production') {
        errorMessage = error.message
      }
    }
    return NextResponse.json(
      { error: errorMessage },
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
    
    const item = await db.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        gradient: data.gradient,
        imageUrl: data.imageUrl || "",
        videoUrl: data.videoUrl || "",
        liveUrl: data.liveUrl,
        order: Number(data.order) || 0,
        images: data.images,
      }
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to update project:', error)
    let errorMessage = 'Failed to update project'
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      // Log additional Prisma error details if available
      if ((error as any).code) {
        console.error('Prisma error code:', (error as any).code)
      }
      if ((error as any).meta) {
        console.error('Prisma error meta:', JSON.stringify((error as any).meta))
      }
      // Return detailed error message for debugging (non-production only)
      if (process.env.NODE_ENV !== 'production') {
        errorMessage = error.message
      }
    }
    return NextResponse.json(
      { error: errorMessage },
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
    let errorMessage = 'Failed to delete project'
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      if ((error as any).code) {
        console.error('Prisma error code:', (error as any).code)
      }
      if ((error as any).meta) {
        console.error('Prisma error meta:', JSON.stringify((error as any).meta))
      }
      // Return detailed error message for debugging (non-production only)
      if (process.env.NODE_ENV !== 'production') {
        errorMessage = error.message
      }
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
