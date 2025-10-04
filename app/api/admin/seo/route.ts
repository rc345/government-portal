import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, SEOPage, SEOKeyword, logUserActivity } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'pages' or 'keywords'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createAdminSupabaseClient()

    if (type === 'keywords') {
      const { data, error } = await supabase
        .from('seo_keywords')
        .select('*')
        .order('search_volume', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching SEO keywords:', error)
        return NextResponse.json({ error: 'Failed to fetch SEO keywords' }, { status: 500 })
      }

      return NextResponse.json({ keywords: data })
    } else {
      // Default to pages
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .order('seo_score', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching SEO pages:', error)
        return NextResponse.json({ error: 'Failed to fetch SEO pages' }, { status: 500 })
      }

      return NextResponse.json({ pages: data })
    }
  } catch (error) {
    console.error('Error in SEO API:', error)
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

    if (type === 'keyword') {
      const { keyword, current_rank, search_volume, difficulty, target_url } = data

      const { data: keywordData, error } = await supabase
        .from('seo_keywords')
        .insert({
          keyword,
          current_rank,
          search_volume: search_volume || 0,
          difficulty: difficulty || 0,
          target_url,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating SEO keyword:', error)
        return NextResponse.json({ error: 'Failed to create SEO keyword' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'seo_keyword',
        keywordData.id,
        { keyword, search_volume, difficulty }
      )

      return NextResponse.json({ keyword: keywordData })
    } else {
      // Default to page
      const { page_url, page_title, meta_description, meta_keywords, seo_score, issues, recommendations } = data

      const { data: pageData, error } = await supabase
        .from('seo_pages')
        .insert({
          page_url,
          page_title,
          meta_description,
          meta_keywords,
          seo_score: seo_score || 0,
          issues,
          recommendations,
          last_crawled: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating SEO page:', error)
        return NextResponse.json({ error: 'Failed to create SEO page' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'create',
        'seo_page',
        pageData.id,
        { page_url, page_title, seo_score }
      )

      return NextResponse.json({ page: pageData })
    }
  } catch (error) {
    console.error('Error in SEO API:', error)
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

    if (type === 'keyword') {
      // Store previous rank before updating
      const { data: currentKeyword } = await supabase
        .from('seo_keywords')
        .select('current_rank')
        .eq('id', id)
        .single()

      if (currentKeyword && data.current_rank && data.current_rank !== currentKeyword.current_rank) {
        data.previous_rank = currentKeyword.current_rank
      }

      const { error } = await supabase
        .from('seo_keywords')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating SEO keyword:', error)
        return NextResponse.json({ error: 'Failed to update SEO keyword' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'seo_keyword',
        id,
        data
      )

      return NextResponse.json({ success: true })
    } else {
      // Default to page
      if (data.page_url || data.page_title) {
        data.last_crawled = new Date().toISOString()
      }

      const { error } = await supabase
        .from('seo_pages')
        .update(data)
        .eq('id', id)

      if (error) {
        console.error('Error updating SEO page:', error)
        return NextResponse.json({ error: 'Failed to update SEO page' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'update',
        'seo_page',
        id,
        data
      )

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error in SEO API:', error)
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

    if (type === 'keyword') {
      const { error } = await supabase
        .from('seo_keywords')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting SEO keyword:', error)
        return NextResponse.json({ error: 'Failed to delete SEO keyword' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'seo_keyword',
        id
      )
    } else {
      // Default to page
      const { error } = await supabase
        .from('seo_pages')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting SEO page:', error)
        return NextResponse.json({ error: 'Failed to delete SEO page' }, { status: 500 })
      }

      await logUserActivity(
        session.user.id,
        'delete',
        'seo_page',
        id
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in SEO API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 