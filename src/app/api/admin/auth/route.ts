import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const auth = await db.adminAuth.findUnique({ where: { id: 'admin-auth' } })
    if (!auth) {
      // Create default auth if not exists
      await db.adminAuth.create({ data: { id: 'admin-auth', passwordHash: 'admin123' } })
      if (password === 'admin123') {
        const cookieStore = await cookies()
        cookieStore.set('admin-session', 'authenticated', {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: '/',
        })
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
    if (password === auth.passwordHash) {
      const cookieStore = await cookies()
      cookieStore.set('admin-session', 'authenticated', {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
      })
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin-session')
    return NextResponse.json({ authenticated: session?.value === 'authenticated' })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin-session')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}
