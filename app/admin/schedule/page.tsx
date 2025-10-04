"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
} from "lucide-react"
import Link from "next/link"

interface ScheduledPost {
  id: number
  title: string
  type: "news" | "social" | "announcement"
  content: string
  platforms: string[]
  scheduledDate: string
  scheduledTime: string
  status: "scheduled" | "published" | "failed" | "cancelled"
  author: string
  createdDate: string
  recurring?: {
    enabled: boolean
    frequency: "daily" | "weekly" | "monthly"
    endDate?: string
  }
}

export default function ScheduledPosts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: 1,
      title: "AU Summit Participation Announcement",
      type: "news",
      content: "Preparing for the upcoming African Union Summit. Ghana's voice will be strong in discussions about continental development and unity.",
      platforms: ["website", "twitter", "facebook"],
      scheduledDate: "2025-01-15",
      scheduledTime: "09:00",
      status: "scheduled",
      author: "News Editor",
      createdDate: "2025-01-10",
      recurring: {
        enabled: false,
        frequency: "weekly"
      }
    },
    {
      id: 2,
      title: "Weekly Diplomatic Update",
      type: "social",
      content: "Weekly update on Ghana's diplomatic activities and international relations progress.",
      platforms: ["twitter", "linkedin"],
      scheduledDate: "2025-01-16",
      scheduledTime: "14:30",
      status: "scheduled",
      author: "Social Media Manager",
      createdDate: "2025-01-09",
      recurring: {
        enabled: true,
        frequency: "weekly",
        endDate: "2025-12-31"
      }
    },
    {
      id: 3,
      title: "Youth Engagement Program Launch",
      type: "announcement",
      content: "Launching our new youth engagement program focused on diplomatic careers and international relations.",
      platforms: ["website", "instagram", "facebook"],
      scheduledDate: "2025-01-18",
      scheduledTime: "10:00",
      status: "scheduled",
      author: "Content Editor",
      createdDate: "2025-01-08",
      recurring: {
        enabled: false,
        frequency: "monthly"
      }
    },
    {
      id: 4,
      title: "Parliamentary Session Update",
      type: "news",
      content: "Updates from today's parliamentary session on foreign affairs and diplomatic initiatives.",
      platforms: ["website", "twitter"],
      scheduledDate: "2025-01-12",
      scheduledTime: "16:00",
      status: "published",
      author: "News Editor",
      createdDate: "2025-01-05",
      recurring: {
        enabled: false,
        frequency: "daily"
      }
    },
    {
      id: 5,
      title: "International Relations Seminar",
      type: "social",
      content: "Join us for an exclusive seminar on international relations and diplomatic best practices.",
      platforms: ["linkedin", "twitter"],
      scheduledDate: "2025-01-11",
      scheduledTime: "11:30",
      status: "failed",
      author: "Event Coordinator",
      createdDate: "2025-01-03",
      recurring: {
        enabled: false,
        frequency: "monthly"
      }
    },
    {
      id: 6,
      title: "Trade Mission Preparation",
      type: "announcement",
      content: "Preparing for the upcoming trade mission to strengthen Ghana's economic partnerships.",
      platforms: ["website", "linkedin"],
      scheduledDate: "2025-01-20",
      scheduledTime: "08:00",
      status: "cancelled",
      author: "Trade Team",
      createdDate: "2025-01-07",
      recurring: {
        enabled: false,
        frequency: "weekly"
      }
    }
  ])

  const filteredPosts = scheduledPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || post.type === filterType
    const matchesStatus = filterStatus === "all" || post.status === filterStatus
    const matchesDate = selectedDate === "" || post.scheduledDate === selectedDate
    return matchesSearch && matchesType && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "published":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "cancelled":
        return <Pause className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "news":
        return "bg-purple-100 text-purple-800"
      case "social":
        return "bg-orange-100 text-orange-800"
      case "announcement":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const statusCounts = {
    scheduled: scheduledPosts.filter(p => p.status === "scheduled").length,
    published: scheduledPosts.filter(p => p.status === "published").length,
    failed: scheduledPosts.filter(p => p.status === "failed").length,
    cancelled: scheduledPosts.filter(p => p.status === "cancelled").length,
  }

  const recurringPosts = scheduledPosts.filter(p => p.recurring?.enabled).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scheduled Posts</h1>
          <p className="text-gray-600">Manage and schedule your content across all platforms.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Schedule
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.scheduled}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.published}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.failed}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-600">{statusCounts.cancelled}</p>
              </div>
              <Pause className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recurring</p>
                <p className="text-2xl font-bold text-purple-600">{recurringPosts}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search scheduled posts..."
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
              <option value="news">News</option>
              <option value="social">Social Media</option>
              <option value="announcement">Announcements</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(post.status)}
                      <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                      <Badge className={getTypeColor(post.type)}>{post.type}</Badge>
                      {post.recurring?.enabled && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          Recurring
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.scheduledDate} at {post.scheduledTime}
                      </span>
                      <span>by {post.author}</span>
                      <span>Created: {post.createdDate}</span>
                      {post.recurring?.enabled && (
                        <span className="flex items-center text-purple-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.recurring.frequency}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.status === "scheduled" && (
                      <Button size="sm" variant="ghost" className="text-green-600">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    {post.status === "failed" && (
                      <Button size="sm" variant="ghost" className="text-blue-600">
                        <Upload className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule News Article
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Social Post
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Recurring Post
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today</span>
                <span className="font-semibold">0 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tomorrow</span>
                <span className="font-semibold">1 post</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold">3 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Next Week</span>
                <span className="font-semibold">2 posts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Website</span>
                <span className="font-semibold">4 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Twitter</span>
                <span className="font-semibold">5 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Facebook</span>
                <span className="font-semibold">3 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">LinkedIn</span>
                <span className="font-semibold">3 posts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 