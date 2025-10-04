import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1),
  type: z.enum(['all', 'news', 'speeches', 'content', 'media']).optional(),
  category: z.string().optional().nullable(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
})

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        results: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        suggestions: [],
        query: '',
        type: 'all',
        error: 'Search service not configured'
      })
    }

    const { searchParams } = new URL(request.url)
    const params = {
      query: searchParams.get('query') || '',
      type: searchParams.get('type') || 'all',
      category: searchParams.get('category'),
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }

    const validation = searchSchema.safeParse(params)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { query, type, category, page, limit } = validation.data
    const supabase = await createServerSupabaseClient()

    let results: any[] = []
    let totalCount = 0

    // Search in news articles
    if (type === 'all' || type === 'news') {
      const newsQuery = supabase
        .from('news_articles')
        .select('*', { count: 'exact' })
        .or(`title.ilike.%${query}%, content.ilike.%${query}%, excerpt.ilike.%${query}%`)
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (category) {
        newsQuery.eq('category', category)
      }

      if (type === 'news') {
        newsQuery.range((page - 1) * limit, page * limit - 1)
      }

      const { data: newsData, error: newsError, count: newsCount } = await newsQuery

      if (newsError) {
        console.error('News search error:', newsError)
      } else {
        const formattedNews = newsData?.map(item => ({
          ...item,
          type: 'news',
          relevance: calculateRelevance(query, [item.title, item.content, item.excerpt])
        })) || []
        
        results.push(...formattedNews)
        if (type === 'news') totalCount = newsCount || 0
      }
    }

    // Search in speeches
    if (type === 'all' || type === 'speeches') {
      const speechesQuery = supabase
        .from('speeches')
        .select('*', { count: 'exact' })
        .or(`title.ilike.%${query}%, description.ilike.%${query}%, venue.ilike.%${query}%`)
        .order('date', { ascending: false })

      if (type === 'speeches') {
        speechesQuery.range((page - 1) * limit, page * limit - 1)
      }

      const { data: speechesData, error: speechesError, count: speechesCount } = await speechesQuery

      if (speechesError) {
        console.error('Speeches search error:', speechesError)
      } else {
        const formattedSpeeches = speechesData?.map(item => ({
          ...item,
          type: 'speech',
          relevance: calculateRelevance(query, [item.title, item.description, item.venue])
        })) || []
        
        results.push(...formattedSpeeches)
        if (type === 'speeches') totalCount = speechesCount || 0
      }
    }

    // Search in media files
    if (type === 'all' || type === 'media') {
      const mediaQuery = supabase
        .from('media_files')
        .select('*', { count: 'exact' })
        .or(`name.ilike.%${query}%, alt_text.ilike.%${query}%, category.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (category) {
        mediaQuery.eq('category', category)
      }

      if (type === 'media') {
        mediaQuery.range((page - 1) * limit, page * limit - 1)
      }

      const { data: mediaData, error: mediaError, count: mediaCount } = await mediaQuery

      if (mediaError) {
        console.error('Media search error:', mediaError)
      } else {
        const formattedMedia = mediaData?.map(item => ({
          ...item,
          type: 'media',
          relevance: calculateRelevance(query, [item.name, item.alt_text, item.category])
        })) || []
        
        results.push(...formattedMedia)
        if (type === 'media') totalCount = mediaCount || 0
      }
    }

    // For 'all' searches, sort by relevance and paginate
    if (type === 'all') {
      results.sort((a, b) => b.relevance - a.relevance)
      totalCount = results.length
      const startIndex = (page - 1) * limit
      results = results.slice(startIndex, startIndex + limit)
    }

    // Get search suggestions based on query
    const suggestions = await getSearchSuggestions(query, supabase)

    return NextResponse.json({
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      },
      suggestions,
      query,
      type
    })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Calculate relevance score based on query matches
function calculateRelevance(query: string, fields: (string | null | undefined)[]): number {
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2)
  let score = 0

  fields.forEach((field, fieldIndex) => {
    if (!field) return

    const fieldContent = field.toLowerCase()
    
    queryWords.forEach(word => {
      // Exact phrase match (highest score)
      if (fieldContent.includes(query.toLowerCase())) {
        score += 10
      }
      
      // Individual word matches
      if (fieldContent.includes(word)) {
        score += 3
      }
      
      // Word at start of field (higher relevance)
      if (fieldContent.startsWith(word)) {
        score += 2
      }
      
      // Partial word matches
      const wordRegex = new RegExp(word.slice(0, -1), 'i')
      if (wordRegex.test(fieldContent)) {
        score += 1
      }
    })

    // Boost score for title fields (assuming first field is title)
    if (fieldIndex === 0) {
      score *= 1.5
    }
  })

  return score
}

// Get search suggestions based on popular terms and similar content
async function getSearchSuggestions(query: string, supabase: any): Promise<string[]> {
  try {
    const suggestions: string[] = []

    // Get popular news categories
    const { data: newsCategories } = await supabase
      .from('news_articles')
      .select('category')
      .eq('status', 'published')
      .limit(5)

    // Get popular tags from media
    const { data: mediaTags } = await supabase
      .from('media_files')
      .select('tags')
      .not('tags', 'is', null)
      .limit(10)

    // Extract unique categories
    const categories = [...new Set(newsCategories?.map(item => item.category) || [])]
    suggestions.push(...categories.filter(cat => 
      cat && cat.toLowerCase().includes(query.toLowerCase().slice(0, 3))
    ))

    // Extract popular tags
    const allTags = mediaTags?.flatMap(item => item.tags || []) || []
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const popularTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag)
      .filter(tag => tag.toLowerCase().includes(query.toLowerCase().slice(0, 3)))

    suggestions.push(...popularTags)

    // Add some common government-related terms
    const governmentTerms = [
      'foreign affairs', 'diplomacy', 'international relations', 
      'trade', 'visa', 'passport', 'embassy', 'consulate',
      'parliament', 'ministry', 'policy', 'development'
    ]

    const relevantTerms = governmentTerms.filter(term =>
      term.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(term.slice(0, 4))
    )

    suggestions.push(...relevantTerms)

    // Remove duplicates and limit to 8 suggestions
    return [...new Set(suggestions)].slice(0, 8)

  } catch (error) {
    console.error('Suggestions error:', error)
    return []
  }
} 