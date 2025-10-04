"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function NewContent() {
  const [contentData, setContentData] = useState({
    title: "",
    slug: "",
    type: "news",
    status: "draft",
    content: "",
    excerpt: "",
    category: "",
    author: "Hon. Samuel Okudzeto Ablakwa",
    image_url: "",
    
    // Speech-specific fields
    date: "",
    venue: "",
    speech_type: "keynote",
    duration: "",
    description: "",
    
    // Report-specific fields
    pages: 0,
    download_url: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = async (status: string) => {
    if (!contentData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        type: contentData.type === 'news' ? 'news' : contentData.type,
        title: contentData.title,
        status,
        author: contentData.author,
      }

      // Add type-specific fields
      if (contentData.type === 'news') {
        Object.assign(payload, {
          content: contentData.content,
          excerpt: contentData.excerpt,
          category: contentData.category,
          slug: contentData.slug || generateSlug(contentData.title),
          image_url: contentData.image_url || null,
        })
      } else if (contentData.type === 'speech') {
        Object.assign(payload, {
          description: contentData.description,
          date: contentData.date,
          venue: contentData.venue,
          speech_type: contentData.speech_type,
          duration: contentData.duration,
        })
      } else if (contentData.type === 'report') {
        Object.assign(payload, {
          description: contentData.description,
          date: contentData.date,
          category: contentData.category,
          pages: contentData.pages || null,
          download_url: contentData.download_url,
        })
      }

      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Content ${status === 'published' ? 'published' : 'saved as draft'} successfully`,
        })
        router.push('/admin/content')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const updateField = (field: string, value: any) => {
    setContentData(prev => ({ ...prev, [field]: value }))
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
            <h1 className="text-3xl font-bold text-gray-900">Create New Content</h1>
            <p className="text-gray-600">Add new content to your website.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button 
            onClick={() => handleSave("published")}
            disabled={isSaving}
          >
            {isSaving ? 'Publishing...' : 'Publish'}
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
                  onChange={(e) => {
                    const title = e.target.value
                    updateField('title', title)
                    if (contentData.type === 'news') {
                      updateField('slug', generateSlug(title))
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter content title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select
                  value={contentData.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="news">News Article</option>
                  <option value="speech">Speech</option>
                  <option value="report">Report</option>
                </select>
              </div>

              {/* News Article Fields */}
              {contentData.type === 'news' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        /
                      </span>
                      <input
                        type="text"
                        value={contentData.slug}
                        onChange={(e) => updateField('slug', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="url-slug"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={contentData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., Parliamentary Affairs, Education, Healthcare"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      value={contentData.excerpt}
                      onChange={(e) => updateField('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Brief description or excerpt..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
                    <input
                      type="url"
                      value={contentData.image_url}
                      onChange={(e) => updateField('image_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </>
              )}

              {/* Speech Fields */}
              {contentData.type === 'speech' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={contentData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        value={contentData.duration}
                        onChange={(e) => updateField('duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="e.g., 45 minutes"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                    <input
                      type="text"
                      value={contentData.venue}
                      onChange={(e) => updateField('venue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., Parliament House, Accra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Speech Type</label>
                    <select
                      value={contentData.speech_type}
                      onChange={(e) => updateField('speech_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="keynote">Keynote</option>
                      <option value="parliamentary">Parliamentary</option>
                      <option value="press conference">Press Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* Report Fields */}
              {contentData.type === 'report' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={contentData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                      <input
                        type="number"
                        value={contentData.pages}
                        onChange={(e) => updateField('pages', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Number of pages"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={contentData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., Financial Report, Policy Document"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Download URL</label>
                    <input
                      type="url"
                      value={contentData.download_url}
                      onChange={(e) => updateField('download_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="https://example.com/report.pdf"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>
                {contentData.type === 'news' ? 'Content' : 'Description'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={contentData.type === 'news' ? contentData.content : contentData.description}
                onChange={(e) => updateField(contentData.type === 'news' ? 'content' : 'description', e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={`Start writing your ${contentData.type === 'news' ? 'article content' : 'description'} here...`}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={contentData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={contentData.author}
                  onChange={(e) => updateField('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>News Articles:</strong> Full articles with content, excerpts, and categories.</p>
                <p><strong>Speeches:</strong> Speech records with date, venue, and description.</p>
                <p><strong>Reports:</strong> Document reports with download links and metadata.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
