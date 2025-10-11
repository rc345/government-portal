"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  ImageIcon,
  Video,
  File,
  Download,
  Trash2,
  Edit,
  Eye,
  FolderPlus,
  MoreHorizontal,
} from "lucide-react"
import Image from "next/image"

interface MediaItem {
  id: number
  name: string
  type: "image" | "video" | "document"
  size: string
  dimensions?: string
  uploadDate: string
  uploadedBy: string
  url: string
  alt?: string
  category: string
  tags: string[]
}

export default function MediaManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      name: "ablakwa-community.jpeg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2025-01-10",
      uploadedBy: "Admin User",
      url: "/images/ablakwa-community.jpeg",
      alt: "Community engagement in North Tongu",
      category: "events",
      tags: ["community", "north-tongu", "engagement"],
    },
    {
      id: 2,
      name: "ablakwa-official.jpeg",
      type: "image",
      size: "1.8 MB",
      dimensions: "1600x900",
      uploadDate: "2025-01-09",
      uploadedBy: "Content Editor",
      url: "/images/ablakwa-official.jpeg",
      alt: "Official government ceremony",
      category: "official",
      tags: ["official", "ceremony", "government"],
    },
    {
      id: 3,
      name: "ablakwa-diplomacy.jpeg",
      type: "image",
      size: "2.1 MB",
      dimensions: "1800x1200",
      uploadDate: "2025-01-08",
      uploadedBy: "Media Manager",
      url: "/images/ablakwa-diplomacy.jpeg",
      alt: "Diplomatic meeting",
      category: "diplomacy",
      tags: ["diplomacy", "international", "meeting"],
    },
    {
      id: 4,
      name: "ablakwa-meeting.jpeg",
      type: "image",
      size: "1.9 MB",
      dimensions: "1600x1200",
      uploadDate: "2025-01-07",
      uploadedBy: "Admin User",
      url: "/images/ablakwa-meeting.jpeg",
      alt: "Ministerial meeting",
      category: "meetings",
      tags: ["meeting", "ministerial", "conference"],
    },
    {
      id: 5,
      name: "foreign-policy-document.pdf",
      type: "document",
      size: "5.2 MB",
      uploadDate: "2025-01-06",
      uploadedBy: "Policy Team",
      url: "/documents/foreign-policy.pdf",
      category: "documents",
      tags: ["policy", "document", "foreign-affairs"],
    },
    {
      id: 6,
      name: "press-conference-video.mp4",
      type: "video",
      size: "45.6 MB",
      dimensions: "1920x1080",
      uploadDate: "2025-01-05",
      uploadedBy: "Media Team",
      url: "/videos/press-conference.mp4",
      category: "videos",
      tags: ["press", "conference", "video"],
    },
  ])

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === "all" || item.type === filterType
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const categories = ["all", "events", "official", "diplomacy", "meetings", "documents", "videos"]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5 text-amber-600" />
      case "video":
        return <Video className="w-5 h-5 text-green-600" />
      case "document":
        return <File className="w-5 h-5 text-green-600" />
      default:
        return <File className="w-5 h-5 text-gray-600" />
    }
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on items:`, selectedItems)
    setSelectedItems([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600">Upload, organize, and manage all your media files.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-900">{mediaItems.length}</p>
              </div>
              <File className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mediaItems.filter((item) => item.type === "image").length}
                </p>
              </div>
              <ImageIcon className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mediaItems.filter((item) => item.type === "video").length}
                </p>
              </div>
              <Video className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mediaItems.filter((item) => item.type === "document").length}
                </p>
              </div>
              <File className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2 mr-4">
                  <span className="text-sm text-gray-600">{selectedItems.length} selected</span>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("download")}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("delete")}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Media Files ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`relative group border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedItems.includes(item.id)
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleSelectItem(item.id)}
                >
                  <div className="aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                    {item.type === "image" ? (
                      <Image
                        src={item.url || "/placeholder.svg"}
                        alt={item.alt || item.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">{getFileIcon(item.type)}</div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size}</p>
                    {item.dimensions && <p className="text-xs text-gray-500">{item.dimensions}</p>}
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedItems.includes(item.id)
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleSelectItem(item.id)}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.type === "image" ? (
                      <Image
                        src={item.url || "/placeholder.svg"}
                        alt={item.alt || item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{item.size}</span>
                      {item.dimensions && <span>{item.dimensions}</span>}
                      <span>Uploaded {item.uploadDate}</span>
                      <span>by {item.uploadedBy}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
