import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin-session')
    if (session?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { currentPassword, newPassword } = await request.json()
    const auth = await db.adminAuth.findUnique({ where: { id: 'admin-auth' } })
    if (!auth || auth.passwordHash !== currentPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }
    await db.adminAuth.update({
      where: { id: 'admin-auth' },
      data: { passwordHash: newPassword },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to change password:', error)
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}
