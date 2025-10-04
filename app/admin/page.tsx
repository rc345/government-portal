"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ImageIcon,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  ArrowUpRight,
  Plus,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPages: 12,
    totalImages: 48,
    totalUsers: 5,
    monthlyViews: 15420,
    pendingContent: 3,
    scheduledPosts: 7,
    lastBackup: "2 hours ago",
    systemStatus: "healthy",
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: "Content Updated",
      item: "About Page",
      user: "John Doe",
      time: "5 minutes ago",
      type: "update",
    },
    {
      id: 2,
      action: "Image Uploaded",
      item: "Diplomatic Meeting Photo",
      user: "Jane Smith",
      time: "1 hour ago",
      type: "upload",
    },
    {
      id: 3,
      action: "User Created",
      item: "Content Editor Role",
      user: "Admin",
      time: "2 hours ago",
      type: "user",
    },
    {
      id: 4,
      action: "Backup Completed",
      item: "Full System Backup",
      user: "System",
      time: "2 hours ago",
      type: "system",
    },
  ])

  const [quickActions, setQuickActions] = useState([
    {
      name: "Add New Content",
      href: "/admin/content/new",
      icon: FileText,
      color: "bg-blue-500",
      description: "Create new pages or posts",
    },
    {
      name: "Upload Media",
      href: "/admin/media/upload",
      icon: ImageIcon,
      color: "bg-green-500",
      description: "Add images and files",
    },
    {
      name: "Schedule Post",
      href: "/admin/schedule/new",
      icon: Calendar,
      color: "bg-purple-500",
      description: "Plan future content",
    },
    {
      name: "Manage Users",
      href: "/admin/users",
      icon: Users,
      color: "bg-orange-500",
      description: "User roles and permissions",
    },
  ])

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-amber-100 text-lg">Here's what's happening with your website today.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-amber-100 text-sm">System Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Pages</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPages}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+2 this month</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Media Files</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalImages}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12 this week</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <ImageIcon className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.monthlyViews.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+8.2% from last month</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Eye className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>All active</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.name} href={action.href}>
                <Card className="border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.name}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === "update"
                        ? "bg-blue-100"
                        : activity.type === "upload"
                          ? "bg-green-100"
                          : activity.type === "user"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                    }`}
                  >
                    {activity.type === "update" && <FileText className="w-5 h-5 text-blue-600" />}
                    {activity.type === "upload" && <ImageIcon className="w-5 h-5 text-green-600" />}
                    {activity.type === "user" && <Users className="w-5 h-5 text-purple-600" />}
                    {activity.type === "system" && <CheckCircle className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>by {activity.user}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">System Status</CardTitle>
              <Button variant="ghost" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Website Status</p>
                    <p className="text-xs text-gray-600">All systems operational</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Last Backup</p>
                    <p className="text-xs text-gray-600">{stats.lastBackup}</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Pending Content</p>
                    <p className="text-xs text-gray-600">{stats.pendingContent} items awaiting review</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Review</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Scheduled Posts</p>
                    <p className="text-xs text-gray-600">{stats.scheduledPosts} posts scheduled</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Performance Overview</CardTitle>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Page Speed</h3>
              <p className="text-2xl font-bold text-blue-600">94/100</p>
              <p className="text-sm text-gray-600">Excellent performance</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">SEO Score</h3>
              <p className="text-2xl font-bold text-green-600">98/100</p>
              <p className="text-sm text-gray-600">Optimized well</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Experience</h3>
              <p className="text-2xl font-bold text-purple-600">96/100</p>
              <p className="text-sm text-gray-600">Great usability</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
