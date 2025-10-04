import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, User, UserActivity, logUserActivity } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'profile' or 'activity'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createAdminSupabaseClient()

    if (type === 'activity') {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching user activity:', error)
        return NextResponse.json({ error: 'Failed to fetch user activity' }, { status: 500 })
      }

      return NextResponse.json({ activities: data })
    } else {
      // Default to profile
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, role, status, created_at, updated_at, last_login')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 })
      }

      return NextResponse.json({ profile: data })
    }
  } catch (error) {
    console.error('Error in profile API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, ...data } = body

    const supabase = createAdminSupabaseClient()

    if (type === 'password') {
      const { current_password, new_password } = data

      if (!current_password || !new_password) {
        return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 })
      }

      // Verify current password
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('password_hash')
        .eq('id', session.user.id)
        .single()

      if (userError || !user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const isValidPassword = await bcrypt.compare(current_password, user.password_hash)
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Invalid current password' }, { status: 400 })
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(new_password, 12)

      const { error } = await supabase
        .from('users')
        .update({ password_hash: hashedPassword })
        .eq('id', session.user.id)

      if (error) {
        console.error('Error updating password:', error)
        return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'user',
        session.user.id,
        { action: 'password_change' }
      )

      return NextResponse.json({ success: true })
    } else {
      // Default to profile update
      const { name, email } = data

      const updateData: Partial<User> = {}
      if (name) updateData.name = name
      if (email) updateData.email = email

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', session.user.id)

      if (error) {
        console.error('Error updating profile:', error)
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'user',
        session.user.id,
        { action: 'profile_update', changes: updateData }
      )

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error in profile API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Additional endpoint for admin user management
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, user_id, ...data } = body

    const supabase = createAdminSupabaseClient()

    if (action === 'update_user') {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user_id)

      if (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'user',
        user_id,
        { action: 'admin_user_update', changes: data }
      )

      return NextResponse.json({ success: true })
    } else if (action === 'get_all_users') {
      const { data: users, error } = await supabase
        .from('users')
        .select('id, email, name, role, status, created_at, updated_at, last_login')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
      }

      return NextResponse.json({ users })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error in profile API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 