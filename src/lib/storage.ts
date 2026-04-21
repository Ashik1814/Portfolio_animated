import { supabase } from './supabase'

const ALLOWED_IMAGE_EXTS = ['png', 'jpg', 'jpeg']
const ALLOWED_DOC_EXTS = ['pdf', 'docx']
const ALLOWED_EXTS = [...ALLOWED_IMAGE_EXTS, ...ALLOWED_DOC_EXTS]

function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || ''
}

function isImageType(ext: string): boolean {
  return ALLOWED_IMAGE_EXTS.includes(ext.toLowerCase())
}

export async function uploadImage(file: File): Promise<string> {
  const ext = getFileExtension(file.name)
  if (!ALLOWED_IMAGE_EXTS.includes(ext)) {
    throw new Error(`Invalid image format. Allowed: ${ALLOWED_IMAGE_EXTS.join(', ')}`)
  }

  return uploadToStorage(file, 'images')
}

export async function uploadDocument(file: File): Promise<string> {
  const ext = getFileExtension(file.name)
  if (!ALLOWED_DOC_EXTS.includes(ext)) {
    throw new Error(`Invalid document format. Allowed: ${ALLOWED_DOC_EXTS.join(', ')}`)
  }

  return uploadToStorage(file, 'documents')
}

async function uploadToStorage(file: File, folder: 'images' | 'documents'): Promise<string> {
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const fileName = `${timestamp}-${safeName}`
  const path = `${folder}/${fileName}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { data, error } = await supabase.storage.from('portfolio').upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    console.error('Supabase upload error:', error)
    throw new Error(error.message)
  }

  const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(path)
  return urlData.publicUrl
}

export async function downloadFile(path: string): Promise<Blob> {
  const pathParts = path.split('/').filter(Boolean)
  if (pathParts.length < 2) {
    throw new Error('Invalid file path')
  }

  const { data, error } = await supabase.storage.from('portfolio').download(pathParts.slice(1).join('/'))

  if (error) {
    console.error('Supabase download error:', error)
    throw new Error(error.message)
  }

  return data
}

export function getFileUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return `${supabaseUrl}/storage/v1/object/public/portfolio-files/${path}`;
}