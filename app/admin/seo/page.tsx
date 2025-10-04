"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Globe,
  Target,
  BarChart3,
  Eye,
  ExternalLink,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface SEOPage {
  id: number
  title: string
  url: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  status: "optimized" | "needs-attention" | "poor"
  score: number
  lastUpdated: string
  issues: string[]
}

interface SEOKeyword {
  id: number
  keyword: string
  ranking: number
  volume: number
  difficulty: string
  trend: "up" | "down" | "stable"
  lastChecked: string
}

export default function SEOMetadata() {
  const [activeTab, setActiveTab] = useState<"pages" | "keywords" | "settings">("pages")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [seoPages, setSeoPages] = useState<SEOPage[]>([
    {
      id: 1,
      title: "Home Page",
      url: "/",
      metaTitle: "Hon. Samuel Okudzeto Ablakwa - Minister for Foreign Affairs",
      metaDescription: "Official website of Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs of Ghana. Latest news, speeches, and diplomatic initiatives.",
      keywords: ["ghana", "foreign affairs", "minister", "ablakwa", "diplomacy"],
      status: "optimized",
      score: 92,
      lastUpdated: "2025-01-10",
      issues: []
    },
    {
      id: 2,
      title: "About Page",
      url: "/about",
      metaTitle: "About Hon. Samuel Okudzeto Ablakwa",
      metaDescription: "Learn about Hon. Samuel Okudzeto Ablakwa's background, achievements, and vision for Ghana's foreign relations.",
      keywords: ["about", "biography", "background", "achievements"],
      status: "needs-attention",
      score: 76,
      lastUpdated: "2025-01-09",
      issues: ["Meta description too short", "Missing alt tags on images"]
    },
    {
      id: 3,
      title: "News Page",
      url: "/news",
      metaTitle: "Latest News - Hon. Samuel Okudzeto Ablakwa",
      metaDescription: "Stay updated with the latest news, announcements, and diplomatic developments from the Ministry of Foreign Affairs.",
      keywords: ["news", "announcements", "updates", "diplomatic"],
      status: "optimized",
      score: 88,
      lastUpdated: "2025-01-08",
      issues: []
    },
    {
      id: 4,
      title: "Platform Page",
      url: "/platform",
      metaTitle: "Our Platform for Ghana's Future",
      metaDescription: "",
      keywords: ["platform", "vision", "policies"],
      status: "poor",
      score: 45,
      lastUpdated: "2025-01-07",
      issues: ["Missing meta description", "No H1 tag", "Keyword density too low"]
    },
    {
      id: 5,
      title: "Contact Page",
      url: "/contact",
      metaTitle: "Contact Us - Ministry of Foreign Affairs",
      metaDescription: "Get in touch with Hon. Samuel Okudzeto Ablakwa and the Ministry of Foreign Affairs. Contact information and office hours.",
      keywords: ["contact", "office", "ministry", "foreign affairs"],
      status: "needs-attention",
      score: 68,
      lastUpdated: "2025-01-06",
      issues: ["Page loading speed needs improvement"]
    }
  ])

  const [keywords, setKeywords] = useState<SEOKeyword[]>([
    {
      id: 1,
      keyword: "ghana foreign minister",
      ranking: 3,
      volume: 8900,
      difficulty: "medium",
      trend: "up",
      lastChecked: "2025-01-10"
    },
    {
      id: 2,
      keyword: "samuel ablakwa",
      ranking: 1,
      volume: 12000,
      difficulty: "low",
      trend: "stable",
      lastChecked: "2025-01-10"
    },
    {
      id: 3,
      keyword: "ghana diplomacy",
      ranking: 7,
      volume: 3400,
      difficulty: "high",
      trend: "down",
      lastChecked: "2025-01-10"
    },
    {
      id: 4,
      keyword: "north tongu mp",
      ranking: 2,
      volume: 5600,
      difficulty: "low",
      trend: "up",
      lastChecked: "2025-01-10"
    },
    {
      id: 5,
      keyword: "ghana china relations",
      ranking: 12,
      volume: 2100,
      difficulty: "medium",
      trend: "stable",
      lastChecked: "2025-01-10"
    }
  ])

  const filteredPages = seoPages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || page.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimized":
        return "bg-green-100 text-green-800"
      case "needs-attention":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimized":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "needs-attention":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "poor":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      case "stable":
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const averageScore = Math.round(seoPages.reduce((acc, page) => acc + page.score, 0) / seoPages.length)
  const totalIssues = seoPages.reduce((acc, page) => acc + page.issues.length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO & Metadata</h1>
          <p className="text-gray-600">Optimize your website's search engine visibility and metadata.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            SEO Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average SEO Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}/100</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{seoPages.length}</p>
              </div>
              <Globe className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SEO Issues</p>
                <p className="text-2xl font-bold text-red-600">{totalIssues}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tracked Keywords</p>
                <p className="text-2xl font-bold text-gray-900">{keywords.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("pages")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "pages"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pages
          </button>
          <button
            onClick={() => setActiveTab("keywords")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "keywords"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Keywords
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "settings"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search pages..."
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
                  <option value="optimized">Optimized</option>
                  <option value="needs-attention">Needs Attention</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Pages List */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Pages ({filteredPages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(page.status)}
                          <Badge className={getStatusColor(page.status)}>{page.status}</Badge>
                          <span className={`text-lg font-bold ${getScoreColor(page.score)}`}>
                            {page.score}/100
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{page.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{page.url}</p>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">Meta Title:</p>
                          <p className="text-sm text-gray-600">{page.metaTitle}</p>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">Meta Description:</p>
                          <p className="text-sm text-gray-600">
                            {page.metaDescription || "No meta description set"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">Keywords:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {page.keywords.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {page.issues.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-red-700">Issues:</p>
                            <ul className="text-sm text-red-600 list-disc list-inside">
                              {page.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Last updated: {page.lastUpdated}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={page.url} target="_blank">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
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

      {/* Keywords Tab */}
      {activeTab === "keywords" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywords.map((keyword) => (
                  <div
                    key={keyword.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{keyword.keyword}</h3>
                        {getTrendIcon(keyword.trend)}
                        <Badge className={getDifficultyColor(keyword.difficulty)}>
                          {keyword.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>Ranking: #{keyword.ranking}</span>
                        <span>Volume: {keyword.volume.toLocaleString()}</span>
                        <span>Last checked: {keyword.lastChecked}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meta Title Template
                </label>
                <input
                  type="text"
                  defaultValue="{page_title} - Hon. Samuel Okudzeto Ablakwa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meta Description
                </label>
                <textarea
                  rows={3}
                  defaultValue="Official website of Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs of Ghana."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Keywords
                </label>
                <input
                  type="text"
                  defaultValue="ghana, foreign affairs, minister, ablakwa, diplomacy, government"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  placeholder="GA-XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Search Console
                </label>
                <input
                  type="text"
                  placeholder="Verification code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Enable XML Sitemap</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Enable Robots.txt</span>
                </label>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 