"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface ContentData {
  id: string
  title: string
  content?: string
  excerpt?: string
  description?: string
  status: string
  author: string
  category?: string
  slug?: string
  image_url?: string
  published_at?: string
  date?: string
  venue?: string
  type?: string
  duration?: string
  transcript_url?: string
  video_url?: string
  thumbnail_url?: string
  pages?: number
  download_url?: string
  created_at?: string
  updated_at?: string
}

export default function EditContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const id = params.id as string
  const type = searchParams.get('type') || 'news'
  
  const [contentData, setContentData] = useState<ContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch content data
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/admin/content?type=${type}&id=${id}`)
        if (response.ok) {
          const data = await response.json()
          
          // Extract the content item based on type
          let content = null
          if (type === 'news' && data.articles) {
            content = data.articles.find((item: any) => item.id === id)
          } else if (type === 'speeches' && data.speeches) {
            content = data.speeches.find((item: any) => item.id === id)
          } else if (type === 'reports' && data.reports) {
            content = data.reports.find((item: any) => item.id === id)
          }
          
          if (content) {
            setContentData(content)
          } else {
            toast({
              title: "Error",
              description: "Content not found",
              variant: "destructive",
            })
            router.push('/admin/content')
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error)
        toast({
          title: "Error",
          description: "Failed to fetch content",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id && type) {
      fetchContent()
    }
  }, [id, type, toast, router])

  const handleSave = async () => {
    if (!contentData) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type === 'speeches' ? 'speech' : type === 'reports' ? 'report' : 'news',
          ...contentData
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Content updated successfully",
        })
      } else {
        throw new Error('Failed to update content')
      }
    } catch (error) {
      console.error('Error updating content:', error)
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const response = await fetch(`/api/admin/content?id=${id}&type=${type}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Content deleted successfully",
        })
        router.push('/admin/content')
      } else {
        throw new Error('Failed to delete content')
      }
    } catch (error) {
      console.error('Error deleting content:', error)
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      })
    }
  }

  const updateField = (field: string, value: any) => {
    if (contentData) {
      setContentData({ ...contentData, [field]: value })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/content">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Content
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!contentData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/content">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Content
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Not Found</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/content">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Content
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit {type}</h1>
            <p className="text-gray-600">Edit existing content</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button 
            variant="outline"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={contentData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter title..."
                />
              </div>

              {/* Fields specific to news articles */}
              {type === 'news' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <input
                      type="text"
                      value={contentData.slug || ''}
                      onChange={(e) => updateField('slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="url-slug"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={contentData.category || ''}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Article category"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      value={contentData.excerpt || ''}
                      onChange={(e) => updateField('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Brief description..."
                    />
                  </div>
                </>
              )}

              {/* Fields specific to speeches */}
              {type === 'speeches' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={contentData.date || ''}
                      onChange={(e) => updateField('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                    <input
                      type="text"
                      value={contentData.venue || ''}
                      onChange={(e) => updateField('venue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Speech venue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={contentData.type || ''}
                      onChange={(e) => updateField('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="keynote">Keynote</option>
                      <option value="parliamentary">Parliamentary</option>
                      <option value="press conference">Press Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={contentData.duration || ''}
                      onChange={(e) => updateField('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., 45 minutes"
                    />
                  </div>
                </>
              )}

              {/* Fields specific to reports */}
              {type === 'reports' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={contentData.date || ''}
                      onChange={(e) => updateField('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                      <input
                        type="number"
                        value={contentData.pages || ''}
                        onChange={(e) => updateField('pages', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Number of pages"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={contentData.category || ''}
                        onChange={(e) => updateField('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Report category"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Download URL</label>
                    <input
                      type="url"
                      value={contentData.download_url || ''}
                      onChange={(e) => updateField('download_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="https://..."
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={contentData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>
                {type === 'news' ? 'Content' : type === 'speeches' ? 'Description' : 'Description'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={contentData.content || contentData.description || ''}
                onChange={(e) => updateField(type === 'news' ? 'content' : 'description', e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter content here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Info */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={contentData.author}
                  onChange={(e) => updateField('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              {type === 'news' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={contentData.image_url || ''}
                    onChange={(e) => updateField('image_url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="https://..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
                <p className="text-gray-600 text-sm">
                  {new Date(contentData.created_at || '').toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                <p className="text-gray-600 text-sm">
                  {new Date(contentData.updated_at || '').toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 