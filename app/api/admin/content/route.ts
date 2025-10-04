import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, NewsArticle, Speech, Report, logUserActivity } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'news', 'speeches', 'reports'
    const id = searchParams.get('id') // For fetching individual items
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const search = searchParams.get('search')

    const supabase = createAdminSupabaseClient()

    if (type === 'speeches') {
      let query = supabase
        .from('speeches')
        .select('*')

      if (id) {
        query = query.eq('id', id)
      } else {
        query = query.order('date', { ascending: false })

        if (search) {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
        }
        query = query.range(offset, offset + limit - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching speeches:', error)
        return NextResponse.json({ error: 'Failed to fetch speeches' }, { status: 500 })
      }

      return NextResponse.json({ speeches: data })
    } else if (type === 'reports') {
      let query = supabase
        .from('reports')
        .select('*')

      if (id) {
        query = query.eq('id', id)
      } else {
        query = query.order('date', { ascending: false })

        if (category) {
          query = query.eq('category', category)
        }

        if (search) {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
        }
        query = query.range(offset, offset + limit - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching reports:', error)
        return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
      }

      return NextResponse.json({ reports: data })
    } else {
      // Default to news articles
      let query = supabase
        .from('news_articles')
        .select('*')

      if (id) {
        query = query.eq('id', id)
      } else {
        query = query.order('created_at', { ascending: false })

        if (status) {
          query = query.eq('status', status)
        }

        if (category) {
          query = query.eq('category', category)
        }

        if (search) {
          query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
        }
        query = query.range(offset, offset + limit - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching news articles:', error)
        return NextResponse.json({ error: 'Failed to fetch news articles' }, { status: 500 })
      }

      return NextResponse.json({ articles: data })
    }
  } catch (error) {
    console.error('Error in content API:', error)
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

    if (type === 'speech') {
      const { title, description, date, venue, speech_type, duration, transcript_url, video_url, thumbnail_url } = data

      const { data: speech, error } = await supabase
        .from('speeches')
        .insert({
          title,
          description,
          date,
          venue,
          type: speech_type,
          duration,
          transcript_url,
          video_url,
          thumbnail_url,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating speech:', error)
        return NextResponse.json({ error: 'Failed to create speech' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'speech',
        speech.id,
        { title, date, type: speech_type }
      )

      return NextResponse.json({ speech })
    } else if (type === 'report') {
      const { title, description, date, pages, category, download_url } = data

      const { data: report, error } = await supabase
        .from('reports')
        .insert({
          title,
          description,
          date,
          pages,
          category,
          download_url,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating report:', error)
        return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'report',
        report.id,
        { title, category, pages }
      )

      return NextResponse.json({ report })
    } else {
      // Default to news article
      const { title, excerpt, content, image_url, author, category, read_time, slug, status } = data

      const { data: article, error } = await supabase
        .from('news_articles')
        .insert({
          title,
          excerpt,
          content,
          image_url,
          author: author || session.user.name,
          category,
          read_time,
          slug,
          status: status || 'draft',
          published_at: status === 'published' ? new Date().toISOString() : null,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating news article:', error)
        return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'news_article',
        article.id,
        { title, category, status }
      )

      return NextResponse.json({ article })
    }
  } catch (error) {
    console.error('Error in content API:', error)
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

    if (type === 'speech') {
      const { error } = await supabase
        .from('speeches')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating speech:', error)
        return NextResponse.json({ error: 'Failed to update speech' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'speech',
        id,
        data
      )

      return NextResponse.json({ success: true })
    } else if (type === 'report') {
      const { error } = await supabase
        .from('reports')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating report:', error)
        return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'report',
        id,
        data
      )

      return NextResponse.json({ success: true })
    } else {
      // Default to news article
      // Handle status changes
      if (data.status === 'published' && !data.published_at) {
        data.published_at = new Date().toISOString()
      }

      const { error } = await supabase
        .from('news_articles')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating news article:', error)
        return NextResponse.json({ error: 'Failed to update news article' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'news_article',
        id,
        data
      )

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error in content API:', error)
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

    if (type === 'speech') {
      const { error } = await supabase
        .from('speeches')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting speech:', error)
        return NextResponse.json({ error: 'Failed to delete speech' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'speech',
        id
      )
    } else if (type === 'report') {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting report:', error)
        return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'report',
        id
      )
    } else {
      // Default to news article
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting news article:', error)
        return NextResponse.json({ error: 'Failed to delete news article' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'news_article',
        id
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in content API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 