import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'No path provided' }, { status: 400 })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const pathParts = path.split('/')

    if (pathParts[0] !== 'images' && pathParts[0] !== 'documents' && pathParts[0] !== 'videos') {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    const fileName = pathParts[pathParts.length - 1]
    const fullPath = pathParts.join('/')

    const { data, error } = await supabase.storage
      .from('portfolio-files')
      .download(fullPath)

    if (error) {
      console.error('Supabase download error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const ext = fileName.split('.').pop()?.toLowerCase() || ''
    const contentTypeMap: Record<string, string> = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      doc: 'application/msword',
      txt: 'text/plain',
      mp4: 'video/mp4',
      webm: 'video/webm',
      ogg: 'video/ogg',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    }
    const contentType = contentTypeMap[ext] || 'application/octet-stream'

    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error('Download route error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}