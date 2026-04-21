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

    if (pathParts[0] === 'images') {
      pathParts[0] = 'images'
    } else if (pathParts[0] === 'documents') {
      pathParts[0] = 'documents'
    } else {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    const fileName = pathParts[pathParts.length - 1]
    const fullPath = pathParts.slice(1).join('/')

    const { data, error } = await supabase.storage
      .from('portfolio')
      .download(fullPath)

    if (error) {
      console.error('Supabase download error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const ext = fileName.split('.').pop()?.toLowerCase() || ''
    const contentType =
      ext === 'pdf'
        ? 'application/pdf'
        : ext === 'docx'
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'application/octet-stream'

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