import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, SocialPost, SocialAccount, logUserActivity } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'posts' or 'accounts'
    const status = searchParams.get('status')
    const platform = searchParams.get('platform')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createAdminSupabaseClient()

    if (type === 'accounts') {
      let query = supabase
        .from('social_accounts')
        .select('*')
        .order('created_at', { ascending: false })

      if (platform) {
        query = query.eq('platform', platform)
      }

      const { data, error } = await query.range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching social accounts:', error)
        return NextResponse.json({ error: 'Failed to fetch social accounts' }, { status: 500 })
      }

      return NextResponse.json({ accounts: data })
    } else {
      // Default to posts
      let query = supabase
        .from('social_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      if (platform) {
        query = query.contains('platforms', [platform])
      }

      const { data, error } = await query.range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching social posts:', error)
        return NextResponse.json({ error: 'Failed to fetch social posts' }, { status: 500 })
      }

      return NextResponse.json({ posts: data })
    }
  } catch (error) {
    console.error('Error in social API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, ...data } = body

    const supabase = createAdminSupabaseClient()

    if (type === 'account') {
      const { platform, account_name, account_url, is_connected, followers_count } = data

      const { data: account, error } = await supabase
        .from('social_accounts')
        .insert({
          platform,
          account_name,
          account_url,
          is_connected: is_connected || false,
          followers_count: followers_count || 0,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating social account:', error)
        return NextResponse.json({ error: 'Failed to create social account' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'social_account',
        account.id,
        { platform, account_name }
      )

      return NextResponse.json({ account })
    } else {
      // Default to post
      const { title, content, platforms, status, scheduled_at, image_url, link_url } = data

      const { data: post, error } = await supabase
        .from('social_posts')
        .insert({
          title,
          content,
          platforms,
          status: status || 'draft',
          scheduled_at,
          image_url,
          link_url,
          created_by: session.user.id,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating social post:', error)
        return NextResponse.json({ error: 'Failed to create social post' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'social_post',
        post.id,
        { title, platforms, status }
      )

      return NextResponse.json({ post })
    }
  } catch (error) {
    console.error('Error in social API:', error)
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
    const { id, type, ...data } = body

    const supabase = createAdminSupabaseClient()

    if (type === 'account') {
      const { error } = await supabase
        .from('social_accounts')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating social account:', error)
        return NextResponse.json({ error: 'Failed to update social account' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'social_account',
        id,
        data
      )

      return NextResponse.json({ success: true })
    } else {
      // Default to post
      const { error } = await supabase
        .from('social_posts')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating social post:', error)
        return NextResponse.json({ error: 'Failed to update social post' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'social_post',
        id,
        data
      )

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error in social API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const supabase = createAdminSupabaseClient()

    if (type === 'account') {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting social account:', error)
        return NextResponse.json({ error: 'Failed to delete social account' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'social_account',
        id
      )
    } else {
      // Default to post
      const { error } = await supabase
        .from('social_posts')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting social post:', error)
        return NextResponse.json({ error: 'Failed to delete social post' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'social_post',
        id
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in social API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 