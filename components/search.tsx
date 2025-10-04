'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, X, FileText, Video, Image, Newspaper } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  content?: string
  excerpt?: string
  summary?: string
  type: 'news' | 'speech' | 'media'
  category?: string
  published_at?: string
  speech_date?: string
  created_at?: string
  url?: string
  author?: { name: string }
  uploader?: { name: string }
  relevance?: number
}

interface SearchResponse {
  results: SearchResult[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  suggestions: string[]
  query: string
  type: string
}

export function SearchComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get('q') || '')
  const [type, setType] = useState(searchParams?.get('type') || 'all')
  const [category, setCategory] = useState(searchParams?.get('category') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [showFilters, setShowFilters] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  const performSearch = useCallback(async (searchQuery: string, page = 1) => {
    if (!searchQuery.trim()) {
      setResults([])
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        type,
        page: page.toString(),
        limit: '10'
      })

      if (category) {
        params.append('category', category)
      }

      const response = await fetch(`/api/search?${params}`)
      const data: SearchResponse = await response.json()

      if (response.ok) {
        setResults(data.results)
        setSuggestions(data.suggestions)
        setPagination(data.pagination)
        
        // Update URL
        const urlParams = new URLSearchParams()
        urlParams.set('q', searchQuery)
        if (type !== 'all') urlParams.set('type', type)
        if (category) urlParams.set('category', category)
        if (page > 1) urlParams.set('page', page.toString())
        
        router.push(`/search?${urlParams}`, { scroll: false })
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [type, category, router])

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery)
    }
  }, [debouncedQuery, performSearch])

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    performSearch(suggestion)
  }

  const clearFilters = () => {
    setType('all')
    setCategory('')
    setPagination(prev => ({ ...prev, page: 1 }))
    if (query) {
      performSearch(query, 1)
    }
  }

  const getResultIcon = (result: SearchResult) => {
    switch (result.type) {
      case 'news':
        return <Newspaper className="h-4 w-4 text-blue-500" />
      case 'speech':
        return <Video className="h-4 w-4 text-green-500" />
      case 'media':
        return <Image className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'news':
        return `/news#${result.id}`
      case 'speech':
        return `/speeches#${result.id}`
      case 'media':
        return `/media/${result.id}`
      default:
        return '#'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news, speeches, media..."
          className="pl-10 pr-12"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Filters
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="news">News & Events</SelectItem>
                    <SelectItem value="speeches">Speeches & Reports</SelectItem>
                    <SelectItem value="media">Media Files</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="foreign-affairs">Foreign Affairs</SelectItem>
                    <SelectItem value="diplomacy">Diplomacy</SelectItem>
                    <SelectItem value="trade">Trade</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && query && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {pagination.total} results found for "{query}"
            </p>
            <p className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </div>

          {results.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getResultIcon(result)}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={getResultLink(result)}
                      className="text-lg font-semibold text-primary hover:underline block mb-1"
                    >
                      {highlightText(result.title, query)}
                    </Link>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="capitalize">{result.type}</span>
                      {result.category && (
                        <Badge variant="secondary" className="text-xs">
                          {result.category}
                        </Badge>
                      )}
                      <span>
                        {formatDate(
                          result.published_at || result.speech_date || result.created_at
                        )}
                      </span>
                      {(result.author?.name || result.uploader?.name) && (
                        <span>by {result.author?.name || result.uploader?.name}</span>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {highlightText(
                        result.excerpt || result.summary || result.content?.slice(0, 200) + '...' || '',
                        query
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={pagination.page <= 1}
                onClick={() => performSearch(query, pagination.page - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => performSearch(query, pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!isLoading && query && results.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.slice(0, 4).map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 