"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  Settings,
  Shield,
  Mail,
  Globe,
  Database,
  Key,
  Bell,
  Palette,
  Code,
  Upload,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<"general" | "security" | "email" | "integrations" | "appearance" | "advanced">("general")
  const [showApiKey, setShowApiKey] = useState(false)
  const [showDatabasePassword, setShowDatabasePassword] = useState(false)

  const [settings, setSettings] = useState({
    general: {
      siteName: "Hon. Samuel Okudzeto Ablakwa",
      siteDescription: "Official website of Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs of Ghana",
      siteUrl: "https://ablakwa.gov.gh",
      adminEmail: "admin@ablakwa.gov.gh",
      timezone: "GMT",
      language: "en",
      maintenanceMode: false,
      registrationEnabled: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireSpecialChars: true,
      maxLoginAttempts: 5,
      ipWhitelist: "",
      sslEnabled: true,
      securityHeaders: true,
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUser: "admin@ablakwa.gov.gh",
      smtpPassword: "",
      fromEmail: "noreply@ablakwa.gov.gh",
      fromName: "Ministry of Foreign Affairs",
      emailVerification: true,
    },
    integrations: {
      googleAnalytics: "",
      facebookPixel: "",
      supabaseUrl: "",
      supabaseKey: "",
      openaiApiKey: "",
      socialMediaTokens: {
        twitter: "",
        facebook: "",
        linkedin: "",
        instagram: "",
      },
    },
    appearance: {
      theme: "light",
      primaryColor: "#f59e0b",
      secondaryColor: "#1f2937",
      logo: "/placeholder-logo.png",
      favicon: "/favicon.ico",
      customCss: "",
    },
    advanced: {
      debugMode: false,
      cacheEnabled: true,
      compressionEnabled: true,
      cdnEnabled: false,
      backupFrequency: "daily",
      logLevel: "info",
      maxFileSize: 10,
    },
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings...`)
    // Here you would typically save to your backend
  }

  const handleTestEmail = () => {
    console.log("Testing email configuration...")
    // Here you would test email sending
  }

  const handleBackupNow = () => {
    console.log("Creating backup...")
    // Here you would trigger a backup
  }

  const handleClearCache = () => {
    console.log("Clearing cache...")
    // Here you would clear the cache
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your website configuration and preferences.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleBackupNow}>
            <Download className="w-4 h-4 mr-2" />
            Backup Now
          </Button>
          <Button variant="outline" onClick={handleClearCache}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "general", label: "General", icon: Settings },
            { key: "security", label: "Security", icon: Shield },
            { key: "email", label: "Email", icon: Mail },
            { key: "integrations", label: "Integrations", icon: Globe },
            { key: "appearance", label: "Appearance", icon: Palette },
            { key: "advanced", label: "Advanced", icon: Code },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.key
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, siteName: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  rows={3}
                  value={settings.general.siteDescription}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, siteDescription: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteUrl: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, adminEmail: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, timezone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="GMT">GMT</option>
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, language: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="en">English</option>
                    <option value="tw">Twi</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, maintenanceMode: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Maintenance Mode</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.registrationEnabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, registrationEnabled: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Allow User Registration</span>
                </label>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("general")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Minimum Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, passwordMinLength: parseInt(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (comma separated)</label>
                <textarea
                  rows={3}
                  value={settings.security.ipWhitelist}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, ipWhitelist: e.target.value }
                  })}
                  placeholder="192.168.1.1, 10.0.0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, twoFactorAuth: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.requireSpecialChars}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, requireSpecialChars: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Require Special Characters</span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.sslEnabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sslEnabled: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Force SSL/HTTPS</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.securityHeaders}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, securityHeaders: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enable Security Headers</span>
                </label>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("security")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === "email" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.email.smtpHost}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpHost: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                  <input
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPort: parseInt(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                  <input
                    type="email"
                    value={settings.email.smtpUser}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpUser: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                  <input
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPassword: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                  <input
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, fromEmail: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                  <input
                    type="text"
                    value={settings.email.fromName}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, fromName: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.email.emailVerification}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, emailVerification: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Require Email Verification</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={handleTestEmail}>
                  <Mail className="w-4 h-4 mr-2" />
                  Test Email
                </Button>
                <Button onClick={() => handleSave("email")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Email Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tabs would continue here... */}
      {/* For brevity, I'll show the structure for the remaining tabs */}
      
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                <input
                  type="text"
                  value={settings.integrations.googleAnalytics}
                  onChange={(e) => setSettings({
                    ...settings,
                    integrations: { ...settings.integrations, googleAnalytics: e.target.value }
                  })}
                  placeholder="GA-XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supabase URL</label>
                <input
                  type="url"
                  value={settings.integrations.supabaseUrl}
                  onChange={(e) => setSettings({
                    ...settings,
                    integrations: { ...settings.integrations, supabaseUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supabase API Key</label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={settings.integrations.supabaseKey}
                    onChange={(e) => setSettings({
                      ...settings,
                      integrations: { ...settings.integrations, supabaseKey: e.target.value }
                    })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("integrations")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Integration Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add other tabs similarly... */}
      
      {activeTab === "advanced" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                  <select
                    value={settings.advanced.backupFrequency}
                    onChange={(e) => setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, backupFrequency: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                  <input
                    type="number"
                    value={settings.advanced.maxFileSize}
                    onChange={(e) => setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, maxFileSize: parseInt(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.advanced.debugMode}
                    onChange={(e) => setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, debugMode: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Debug Mode</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.advanced.cacheEnabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, cacheEnabled: e.target.checked }
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enable Caching</span>
                </label>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("advanced")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 