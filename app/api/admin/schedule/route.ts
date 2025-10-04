import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, ScheduledPost, logUserActivity } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const is_recurring = searchParams.get('is_recurring')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createAdminSupabaseClient()

    let query = supabase
      .from('scheduled_posts')
      .select('*')
      .order('scheduled_at', { ascending: true })

    if (status) {
      query = query.eq('status', status)
    }

    if (type) {
      query = query.eq('type', type)
    }

    if (is_recurring) {
      query = query.eq('is_recurring', is_recurring === 'true')
    }

    const { data, error } = await query.range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching scheduled posts:', error)
      return NextResponse.json({ error: 'Failed to fetch scheduled posts' }, { status: 500 })
    }

    return NextResponse.json({ posts: data })
  } catch (error) {
    console.error('Error in schedule API:', error)
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
    const { 
      title, 
      content, 
      type, 
      platforms, 
      scheduled_at, 
      is_recurring, 
      recurrence_pattern, 
      recurrence_end 
    } = body

    const supabase = createAdminSupabaseClient()

    const { data: post, error } = await supabase
      .from('scheduled_posts')
      .insert({
        title,
        content,
        type,
        platforms,
        scheduled_at,
        is_recurring: is_recurring || false,
        recurrence_pattern,
        recurrence_end,
        status: 'scheduled',
        created_by: session.user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating scheduled post:', error)
      return NextResponse.json({ error: 'Failed to create scheduled post' }, { status: 500 })
    }

    await logUserActivity(
      session.user.id,
      'create',
      'scheduled_post',
      post.id,
      { title, type, scheduled_at, is_recurring }
    )

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error in schedule API:', error)
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
    const { id, ...data } = body

    const supabase = createAdminSupabaseClient()

    // Handle status changes
    if (data.status === 'published' && !data.published_at) {
      data.published_at = new Date().toISOString()
    }

    const { error } = await supabase
      .from('scheduled_posts')
      .update(data)
      .eq('id', id)

    if (error) {
      console.error('Error updating scheduled post:', error)
      return NextResponse.json({ error: 'Failed to update scheduled post' }, { status: 500 })
    }

    await logUserActivity(
      session.user.id,
      'update',
      'scheduled_post',
      id,
      data
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in schedule API:', error)
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

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const supabase = createAdminSupabaseClient()

    const { error } = await supabase
      .from('scheduled_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting scheduled post:', error)
      return NextResponse.json({ error: 'Failed to delete scheduled post' }, { status: 500 })
    }

    await logUserActivity(
      session.user.id,
      'delete',
      'scheduled_post',
      id
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in schedule API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 