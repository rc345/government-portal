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
  ExternalLink,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react"
import Link from "next/link"

interface SocialPost {
  id: number
  title: string
  content: string
  platforms: string[]
  status: "published" | "scheduled" | "draft"
  publishDate: string
  author: string
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  image?: string
}

interface SocialAccount {
  id: number
  platform: string
  username: string
  followers: number
  status: "connected" | "disconnected"
  lastSync: string
}

export default function SocialMediaManagement() {
  const [activeTab, setActiveTab] = useState<"posts" | "accounts" | "analytics">("posts")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: 1,
      title: "Ghana-China Partnership Success",
      content: "Excited to announce the successful completion of our diplomatic mission to China, securing $30M in infrastructure funding for Ghana. 🇬🇭🇨🇳 #Diplomacy #Ghana #Development",
      platforms: ["twitter", "facebook", "linkedin"],
      status: "published",
      publishDate: "2025-01-10 14:30",
      author: "Admin User",
      engagement: {
        likes: 1240,
        shares: 89,
        comments: 156
      },
      image: "/images/ablakwa-diplomacy.jpeg"
    },
    {
      id: 2,
      title: "Passport Reform Update",
      content: "Great news! Our new passport delivery system has successfully delivered over 5,000 passports directly to citizens' homes. Innovation in public service! 📋✈️ #PassportReform #PublicService",
      platforms: ["twitter", "facebook"],
      status: "published",
      publishDate: "2025-01-09 10:15",
      author: "Content Editor",
      engagement: {
        likes: 892,
        shares: 234,
        comments: 67
      }
    },
    {
      id: 3,
      title: "AU Summit Preparation",
      content: "Preparing for the upcoming African Union Summit. Ghana's voice will be strong in discussions about continental development and unity. 🌍 #AUSummit #Africa #Unity",
      platforms: ["twitter", "facebook", "linkedin"],
      status: "scheduled",
      publishDate: "2025-01-15 09:00",
      author: "News Editor",
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0
      }
    },
    {
      id: 4,
      title: "Youth Engagement Initiative",
      content: "Launching our new youth engagement program focused on diplomatic careers and international relations. The future of Ghana's diplomacy is bright! 🎓 #YouthDiplomacy #Education",
      platforms: ["instagram", "twitter"],
      status: "draft",
      publishDate: "",
      author: "Content Editor",
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0
      }
    }
  ])

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    {
      id: 1,
      platform: "twitter",
      username: "@Hon_Ablakwa",
      followers: 145000,
      status: "connected",
      lastSync: "2025-01-10 15:30"
    },
    {
      id: 2,
      platform: "facebook",
      username: "Hon. Samuel Okudzeto Ablakwa",
      followers: 89000,
      status: "connected",
      lastSync: "2025-01-10 15:25"
    },
    {
      id: 3,
      platform: "linkedin",
      username: "Samuel Okudzeto Ablakwa",
      followers: 34000,
      status: "connected",
      lastSync: "2025-01-10 15:20"
    },
    {
      id: 4,
      platform: "instagram",
      username: "@ablakwa_official",
      followers: 67000,
      status: "disconnected",
      lastSync: "2025-01-08 12:00"
    }
  ])

  const filteredPosts = socialPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || post.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="w-4 h-4 text-blue-500" />
      case "facebook":
        return <Facebook className="w-4 h-4 text-amber-600" />
      case "linkedin":
        return <Linkedin className="w-4 h-4 text-amber-700" />
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-500" />
      default:
        return <Globe className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-amber-100 text-amber-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "scheduled":
        return <Clock className="w-4 h-4 text-amber-600" />
      case "draft":
        return <Edit className="w-4 h-4 text-gray-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const totalEngagement = socialPosts.reduce((acc, post) => ({
    likes: acc.likes + post.engagement.likes,
    shares: acc.shares + post.engagement.shares,
    comments: acc.comments + post.engagement.comments
  }), { likes: 0, shares: 0, comments: 0 })

  const totalFollowers = socialAccounts.reduce((acc, account) => acc + account.followers, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media Management</h1>
          <p className="text-gray-600">Manage social media posts, accounts, and analytics across all platforms.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{socialPosts.length}</p>
              </div>
              <Share2 className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-900">{totalFollowers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(totalEngagement.likes + totalEngagement.shares + totalEngagement.comments).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Accounts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {socialAccounts.filter(acc => acc.status === "connected").length}
                </p>
              </div>
              <Globe className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "posts"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("accounts")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "accounts"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Accounts
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "analytics"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Posts ({filteredPosts.length})</CardTitle>
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
                          <div className="flex items-center space-x-1">
                            {post.platforms.map((platform) => (
                              <div key={platform} className="flex items-center">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>{post.publishDate || "Not scheduled"}</span>
                          {post.status === "published" && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Heart className="w-4 h-4 mr-1" />
                                  {post.engagement.likes}
                                </span>
                                <span className="flex items-center">
                                  <Repeat2 className="w-4 h-4 mr-1" />
                                  {post.engagement.shares}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {post.engagement.comments}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Accounts Tab */}
      {activeTab === "accounts" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Social Media Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {socialAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      {getPlatformIcon(account.platform)}
                      <div>
                        <h3 className="font-medium text-gray-900">{account.username}</h3>
                        <p className="text-sm text-gray-500">
                          {account.followers.toLocaleString()} followers
                        </p>
                        <p className="text-xs text-gray-400">
                          Last sync: {account.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          account.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {account.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {account.status === "connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Likes</span>
                    <span className="font-semibold">{totalEngagement.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Shares</span>
                    <span className="font-semibold">{totalEngagement.shares.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Comments</span>
                    <span className="font-semibold">{totalEngagement.comments.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialAccounts.map((account) => (
                    <div key={account.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcon(account.platform)}
                        <span className="text-sm text-gray-600 capitalize">{account.platform}</span>
                      </div>
                      <span className="font-semibold">{account.followers.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-600">Last post published</p>
                    <p className="font-medium">2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Next scheduled post</p>
                    <p className="font-medium">Jan 15, 09:00</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Avg. engagement rate</p>
                    <p className="font-medium">4.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
} 