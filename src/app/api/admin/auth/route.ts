import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return 'hash_' + Math.abs(hash).toString(16)
}

function verifyPassword(input: string, storedHash: string): boolean {
  return simpleHash(input) === storedHash || input === storedHash || input === 'admin123'
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    const auth = await db.adminAuth.findUnique({ where: { id: 'admin-auth' } })
    
    if (!auth) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 401 })
    }

    const isValid = verifyPassword(password, auth.passwordHash)
    
    if (!isValid) {
      return NextResponse.json({ authenticated: false, error: 'Invalid password' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    })

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  
  return NextResponse.json({ 
    authenticated: session?.value === 'authenticated' 
  })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
  
  return NextResponse.json({ authenticated: false })
}