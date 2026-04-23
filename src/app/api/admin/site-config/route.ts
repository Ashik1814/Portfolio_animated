import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/auth'

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
    
    const stringFields = ['siteName', 'heroWelcomeText', 'heroName', 'heroTitle', 'heroDescription', 'aboutDescription', 'skillsDescription', 'projectsDescription', 'contactDescription', 'logoText', 'logoUrl', 'heroCtaText', 'heroCtaLink', 'heroSecondaryCtaText', 'heroSecondaryCtaLink', 'heroFollowText', 'heroAvailableText', 'heroProfileImage', 'cvUrl', 'footerCopyright', 'seoTitle', 'seoDescription', 'seoKeywords', 'seoOgTitle', 'seoOgDescription', 'approachTitle', 'approachText1', 'approachText2', 'contactLocationText']
    for (const field of stringFields) {
      if (data[field] && typeof data[field] !== 'string') {
        return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 })
      }
      if (data[field] && data[field].length > 5000) {
        return NextResponse.json({ error: `${field} exceeds maximum length` }, { status: 400 })
      }
    }
    
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
