"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Download,
  Upload,
  Calendar,
  Clock,
  Database,
  HardDrive,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Archive,
} from "lucide-react"

interface BackupData {
  id: number
  name: string
  type: "full" | "content" | "media" | "database"
  size: string
  date: string
  status: "completed" | "in-progress" | "failed"
  downloadUrl?: string
}

export default function BackupRestore() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [backupType, setBackupType] = useState("full")

  const [backups, setBackups] = useState<BackupData[]>([
    {
      id: 1,
      name: "Full System Backup",
      type: "full",
      size: "2.4 GB",
      date: "2025-01-10 14:30",
      status: "completed",
      downloadUrl: "/backups/full-backup-20250110.zip",
    },
    {
      id: 2,
      name: "Content Only Backup",
      type: "content",
      size: "45.2 MB",
      date: "2025-01-09 10:15",
      status: "completed",
      downloadUrl: "/backups/content-backup-20250109.zip",
    },
    {
      id: 3,
      name: "Media Files Backup",
      type: "media",
      size: "1.8 GB",
      date: "2025-01-08 16:45",
      status: "completed",
      downloadUrl: "/backups/media-backup-20250108.zip",
    },
    {
      id: 4,
      name: "Database Backup",
      type: "database",
      size: "12.5 MB",
      date: "2025-01-07 08:30",
      status: "completed",
      downloadUrl: "/backups/database-backup-20250107.sql",
    },
    {
      id: 5,
      name: "Scheduled Full Backup",
      type: "full",
      size: "Calculating...",
      date: "2025-01-10 18:00",
      status: "in-progress",
    },
  ])

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: "daily",
    retentionDays: 30,
    includeMedia: true,
    includeDatabase: true,
    includeContent: true,
    notifyOnComplete: true,
  })

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true)
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: BackupData = {
        id: Date.now(),
        name: `Manual ${backupType.charAt(0).toUpperCase() + backupType.slice(1)} Backup`,
        type: backupType as any,
        size: "Calculating...",
        date: new Date().toLocaleString(),
        status: "in-progress",
      }
      setBackups((prev) => [newBackup, ...prev])
      setIsCreatingBackup(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "full":
        return <Shield className="w-5 h-5 text-purple-600" />
      case "content":
        return <Database className="w-5 h-5 text-blue-600" />
      case "media":
        return <Archive className="w-5 h-5 text-green-600" />
      case "database":
        return <HardDrive className="w-5 h-5 text-orange-600" />
      default:
        return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backup & Restore</h1>
          <p className="text-gray-600">Manage system backups and restore points to protect your data.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Restore from File
          </Button>
          <Button onClick={handleCreateBackup} disabled={isCreatingBackup}>
            {isCreatingBackup ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Shield className="w-4 h-4 mr-2" />
            )}
            Create Backup
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Backups</p>
                <p className="text-2xl font-bold text-gray-900">{backups.length}</p>
              </div>
              <Archive className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Backup</p>
                <p className="text-2xl font-bold text-gray-900">2h ago</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">4.2 GB</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Auto Backup</p>
                <p className="text-2xl font-bold text-gray-900">{backupSettings.autoBackup ? "ON" : "OFF"}</p>
              </div>
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Create New Backup */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Type</label>
              <select
                value={backupType}
                onChange={(e) => setBackupType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="full">Full System Backup</option>
                <option value="content">Content Only</option>
                <option value="media">Media Files Only</option>
                <option value="database">Database Only</option>
              </select>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Full System:</strong> Complete website backup including all files and database
              </p>
              <p>
                <strong>Content Only:</strong> Pages, posts, and content data
              </p>
              <p>
                <strong>Media Files:</strong> Images, videos, and documents
              </p>
              <p>
                <strong>Database:</strong> User data, settings, and configurations
              </p>
            </div>
            <Button className="w-full" onClick={handleCreateBackup} disabled={isCreatingBackup}>
              {isCreatingBackup ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Create Backup Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Backup Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Auto Backup</label>
              <input
                type="checkbox"
                checked={backupSettings.autoBackup}
                onChange={(e) => setBackupSettings({ ...backupSettings, autoBackup: e.target.checked })}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select
                value={backupSettings.frequency}
                onChange={(e) => setBackupSettings({ ...backupSettings, frequency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retention (Days)</label>
              <input
                type="number"
                value={backupSettings.retentionDays}
                onChange={(e) =>
                  setBackupSettings({ ...backupSettings, retentionDays: Number.parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Include Media</label>
                <input
                  type="checkbox"
                  checked={backupSettings.includeMedia}
                  onChange={(e) => setBackupSettings({ ...backupSettings, includeMedia: e.target.checked })}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Include Database</label>
                <input
                  type="checkbox"
                  checked={backupSettings.includeDatabase}
                  onChange={(e) => setBackupSettings({ ...backupSettings, includeDatabase: e.target.checked })}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Backup System</p>
                  <p className="text-xs text-gray-600">Operational</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Storage Space</p>
                  <p className="text-xs text-gray-600">15.8 GB available</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Good</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Next Auto Backup</p>
                  <p className="text-xs text-gray-600">In 6 hours</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {getTypeIcon(backup.type)}
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{backup.name}</h3>
                      <Badge className={getStatusColor(backup.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(backup.status)}
                          <span>{backup.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {backup.date}
                      </span>
                      <span className="flex items-center">
                        <HardDrive className="w-4 h-4 mr-1" />
                        {backup.size}
                      </span>
                      <span className="capitalize">{backup.type} backup</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {backup.status === "completed" && backup.downloadUrl && (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore
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
