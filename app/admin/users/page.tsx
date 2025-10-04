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
  Shield,
  User,
  Mail,
  Calendar,
  MoreHorizontal,
  UserCheck,
  UserX,
  Settings,
} from "lucide-react"
import Image from "next/image"

interface UserData {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  joinDate: string
  avatar: string
  permissions: string[]
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      name: "Admin User",
      email: "admin@mfa.gov.gh",
      role: "Super Administrator",
      status: "active",
      lastLogin: "2025-01-10 14:30",
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@mfa.gov.gh",
      role: "Content Editor",
      status: "active",
      lastLogin: "2025-01-10 09:15",
      joinDate: "2024-03-20",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: ["content:read", "content:write", "media:read", "media:write"],
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@mfa.gov.gh",
      role: "Media Manager",
      status: "active",
      lastLogin: "2025-01-09 16:45",
      joinDate: "2024-05-10",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: ["media:read", "media:write", "media:delete"],
    },
    {
      id: 4,
      name: "Robert Wilson",
      email: "robert.wilson@mfa.gov.gh",
      role: "News Editor",
      status: "active",
      lastLogin: "2025-01-08 11:20",
      joinDate: "2024-07-05",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: ["content:read", "content:write", "social:read", "social:write"],
    },
    {
      id: 5,
      name: "Sarah Johnson",
      email: "sarah.johnson@mfa.gov.gh",
      role: "Viewer",
      status: "pending",
      lastLogin: "Never",
      joinDate: "2025-01-05",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: ["content:read"],
    },
  ])

  const roles = [
    { name: "Super Administrator", color: "bg-red-100 text-red-800", permissions: "Full Access" },
    { name: "Content Editor", color: "bg-blue-100 text-blue-800", permissions: "Content Management" },
    { name: "Media Manager", color: "bg-green-100 text-green-800", permissions: "Media Management" },
    { name: "News Editor", color: "bg-purple-100 text-purple-800", permissions: "News & Social Media" },
    { name: "Viewer", color: "bg-gray-100 text-gray-800", permissions: "Read Only" },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    const roleData = roles.find((r) => r.name === role)
    return roleData?.color || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts, roles, and permissions.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((user) => user.status === "active").length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((user) => user.status === "pending").length}
                </p>
              </div>
              <UserX className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Roles</p>
                <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle>User Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={role.color}>{role.name}</Badge>
                  <span className="text-sm text-gray-600">
                    {users.filter((user) => user.role === role.name).length} users
                  </span>
                </div>
                <p className="text-sm text-gray-600">{role.permissions}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {user.email}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Last login: {user.lastLogin}
                      </span>
                      <span>Joined: {user.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
