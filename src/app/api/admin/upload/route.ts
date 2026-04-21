import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  if (!supabaseServiceKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
    const allowedImageExts = ['png', 'jpg', 'jpeg']
    const allowedDocExts = ['pdf', 'docx']
    const allowedExts = [...allowedImageExts, ...allowedDocExts]

    if (!allowedExts.includes(fileExt)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed: ${allowedExts.join(', ')}` },
        { status: 400 }
      )
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${safeName}`

    const folder = allowedImageExts.includes(fileExt) ? 'images' : 'documents'
    const path = `${folder}/${fileName}`

    const uploadUrl = `${supabaseUrl}/storage/v1/object/portfolio-files/${path}`

    const bytes = await file.arrayBuffer()
    const data = new Uint8Array(bytes)

    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': file.type,
        'x-upsert': 'false',
      },
      body: data,
    })

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text()
      console.error('Supabase upload error:', errorText)
      return NextResponse.json({ error: errorText }, { status: 500 })
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-files/${path}`

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('Upload route error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}