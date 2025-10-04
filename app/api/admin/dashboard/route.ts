import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, logUserActivity } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'stats', 'activity', 'recent'

    const supabase = createAdminSupabaseClient()

    if (type === 'stats') {
      // Get comprehensive statistics
      const [
        newsCount,
        speechesCount,
        reportsCount,
        socialPostsCount,
        scheduledPostsCount,
        contactMessagesCount,
        mediaFilesCount,
        usersCount
      ] = await Promise.all([
        supabase.from('news_articles').select('id', { count: 'exact' }),
        supabase.from('speeches').select('id', { count: 'exact' }),
        supabase.from('reports').select('id', { count: 'exact' }),
        supabase.from('social_posts').select('id', { count: 'exact' }),
        supabase.from('scheduled_posts').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('media_files').select('id', { count: 'exact' }),
        supabase.from('users').select('id', { count: 'exact' })
      ])

      // Get published vs draft content
      const [publishedNews, draftNews] = await Promise.all([
        supabase.from('news_articles').select('id', { count: 'exact' }).eq('status', 'published'),
        supabase.from('news_articles').select('id', { count: 'exact' }).eq('status', 'draft')
      ])

      // Get recent activity counts
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const [recentNews, recentSpeeches, recentReports, recentSocialPosts] = await Promise.all([
        supabase.from('news_articles').select('id', { count: 'exact' }).gte('created_at', oneWeekAgo),
        supabase.from('speeches').select('id', { count: 'exact' }).gte('created_at', oneWeekAgo),
        supabase.from('reports').select('id', { count: 'exact' }).gte('created_at', oneWeekAgo),
        supabase.from('social_posts').select('id', { count: 'exact' }).gte('created_at', oneWeekAgo)
      ])

      // Get social media engagement stats
      const { data: socialEngagement } = await supabase
        .from('social_posts')
        .select('engagement_stats')
        .eq('status', 'published')

      const totalEngagement = socialEngagement?.reduce((acc, post) => {
        const stats = post.engagement_stats || {}
        return {
          likes: acc.likes + (stats.likes || 0),
          shares: acc.shares + (stats.shares || 0),
          comments: acc.comments + (stats.comments || 0)
        }
      }, { likes: 0, shares: 0, comments: 0 })

      // Get contact messages by status
      const [newMessages, readMessages, repliedMessages] = await Promise.all([
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('status', 'new'),
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('status', 'read'),
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('status', 'replied')
      ])

      const stats = {
        content: {
          total_news: newsCount.count || 0,
          published_news: publishedNews.count || 0,
          draft_news: draftNews.count || 0,
          total_speeches: speechesCount.count || 0,
          total_reports: reportsCount.count || 0,
          recent_news: recentNews.count || 0,
          recent_speeches: recentSpeeches.count || 0,
          recent_reports: recentReports.count || 0
        },
        social: {
          total_posts: socialPostsCount.count || 0,
          recent_posts: recentSocialPosts.count || 0,
          total_engagement: totalEngagement
        },
        schedule: {
          total_scheduled: scheduledPostsCount.count || 0
        },
        communication: {
          total_messages: contactMessagesCount.count || 0,
          new_messages: newMessages.count || 0,
          read_messages: readMessages.count || 0,
          replied_messages: repliedMessages.count || 0
        },
        media: {
          total_files: mediaFilesCount.count || 0
        },
        users: {
          total_users: usersCount.count || 0
        }
      }

      return NextResponse.json({ stats })
    } else if (type === 'activity') {
      // Get recent user activity
      const { data: activities, error } = await supabase
        .from('user_activity')
        .select(`
          *,
          users!inner(name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) {
        console.error('Error fetching user activity:', error)
        return NextResponse.json({ error: 'Failed to fetch user activity' }, { status: 500 })
      }

      return NextResponse.json({ activities })
    } else {
      // Default to recent content
      const [recentNews, recentSpeeches, recentReports, recentSocialPosts] = await Promise.all([
        supabase.from('news_articles').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('speeches').select('id, title, date, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('reports').select('id, title, category, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('social_posts').select('id, title, status, platforms, created_at').order('created_at', { ascending: false }).limit(5)
      ])

      const recent = {
        news: recentNews.data || [],
        speeches: recentSpeeches.data || [],
        reports: recentReports.data || [],
        social_posts: recentSocialPosts.data || []
      }

      return NextResponse.json({ recent })
    }
  } catch (error) {
    console.error('Error in dashboard API:', error)
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
    const { action, ...data } = body

    const supabase = createAdminSupabaseClient()

    if (action === 'quick_publish') {
      const { id, type } = data

      let table = 'news_articles'
      if (type === 'speech') table = 'speeches'
      else if (type === 'report') table = 'reports'
      else if (type === 'social_post') table = 'social_posts'

      const updateData: any = { status: 'published' }
      if (table === 'news_articles') {
        updateData.published_at = new Date().toISOString()
      }

      const { error } = await supabase
        .from(table)
        .update(updateData)
        .eq('id', id)

      if (error) {
        console.error('Error quick publishing:', error)
        return NextResponse.json({ error: 'Failed to publish content' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        type,
        id,
        { action: 'quick_publish', status: 'published' }
      )

      return NextResponse.json({ success: true })
    } else if (action === 'bulk_action') {
      const { ids, bulk_action, content_type } = data

      let table = 'news_articles'
      if (content_type === 'speech') table = 'speeches'
      else if (content_type === 'report') table = 'reports'
      else if (content_type === 'social_post') table = 'social_posts'

      let updateData: any = {}
      if (bulk_action === 'publish') {
        updateData.status = 'published'
        if (table === 'news_articles') {
          updateData.published_at = new Date().toISOString()
        }
      } else if (bulk_action === 'archive') {
        updateData.status = 'archived'
      } else if (bulk_action === 'delete') {
        const { error } = await supabase
          .from(table)
          .delete()
          .in('id', ids)

        if (error) {
          console.error('Error bulk deleting:', error)
          return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
        }

        await logUserActivity(
          session.user.id,
          'delete',
          content_type,
          undefined,
          { action: 'bulk_delete', count: ids.length }
        )

        return NextResponse.json({ success: true })
      }

      const { error } = await supabase
        .from(table)
        .update(updateData)
        .in('id', ids)

      if (error) {
        console.error('Error bulk updating:', error)
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        content_type,
        undefined,
        { action: `bulk_${bulk_action}`, count: ids.length }
      )

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error in dashboard API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 