import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const config = await db.siteConfig.findUnique({
      where: { id: 'site-config' },
    })
    return NextResponse.json(config)
  } catch (error) {
    console.error('Failed to fetch site config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site config' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const config = await db.siteConfig.upsert({
      where: { id: 'site-config' },
      update: data,
      create: { id: 'site-config', ...data },
    })
    return NextResponse.json(config)
  } catch (error) {
    console.error('Failed to update site config:', error)
    return NextResponse.json(
      { error: 'Failed to update site config' },
      { status: 500 }
    )
  }
}
