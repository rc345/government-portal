import { useState, useEffect } from 'react'
import { 
  SEOPage, 
  SEOKeyword, 
  ScheduledPost, 
  SystemSetting, 
  UserActivity,
  NewsArticle,
  Speech,
  Report
} from '@/lib/supabase'

// SEO API Hook
export function useSEOApi() {
  const [pages, setPages] = useState<SEOPage[]>([])
  const [keywords, setKeywords] = useState<SEOKeyword[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [pagesResponse, keywordsResponse] = await Promise.all([
        fetch('/api/admin/seo?type=pages'),
        fetch('/api/admin/seo?type=keywords')
      ])

      if (!pagesResponse.ok || !keywordsResponse.ok) {
        throw new Error('Failed to fetch SEO data')
      }

      const pagesData = await pagesResponse.json()
      const keywordsData = await keywordsResponse.json()

      if (pagesData.error || keywordsData.error) {
        throw new Error(pagesData.error || keywordsData.error)
      }

      setPages(pagesData.pages || [])
      setKeywords(keywordsData.keywords || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createPage = async (pageData: Partial<SEOPage>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'page', ...pageData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create page')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page')
      return false
    }
  }

  const updatePage = async (id: string, pageData: Partial<SEOPage>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'page', ...pageData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update page')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update page')
      return false
    }
  }

  const createKeyword = async (keywordData: Partial<SEOKeyword>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'keyword', ...keywordData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create keyword')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create keyword')
      return false
    }
  }

  const updateKeyword = async (id: string, keywordData: Partial<SEOKeyword>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'keyword', ...keywordData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update keyword')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update keyword')
      return false
    }
  }

  return {
    pages,
    keywords,
    loading,
    error,
    refetch: fetchData,
    createPage,
    updatePage,
    createKeyword,
    updateKeyword
  }
}

// Schedule API Hook
export function useScheduleApi() {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/admin/schedule')
      if (!response.ok) {
        throw new Error('Failed to fetch scheduled posts')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setPosts(data.posts || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createPost = async (postData: Partial<ScheduledPost>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create scheduled post')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create scheduled post')
      return false
    }
  }

  const updatePost = async (id: string, postData: Partial<ScheduledPost>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...postData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update scheduled post')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update scheduled post')
      return false
    }
  }

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin/schedule?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete scheduled post')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete scheduled post')
      return false
    }
  }

  return {
    posts,
    loading,
    error,
    refetch: fetchData,
    createPost,
    updatePost,
    deletePost
  }
}

// Settings API Hook
export function useSettingsApi() {
  const [settings, setSettings] = useState<Record<string, Record<string, any>>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/admin/settings')
      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setSettings(data.settings || {})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateSettings = async (settingsData: Record<string, Record<string, any>>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update settings')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings')
      return false
    }
  }

  return {
    settings,
    loading,
    error,
    refetch: fetchData,
    updateSettings
  }
}

// Profile API Hook
export function useProfileApi() {
  const [profile, setProfile] = useState<any>(null)
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [profileResponse, activitiesResponse] = await Promise.all([
        fetch('/api/admin/profile?type=profile'),
        fetch('/api/admin/profile?type=activity')
      ])

      if (!profileResponse.ok || !activitiesResponse.ok) {
        throw new Error('Failed to fetch profile data')
      }

      const profileData = await profileResponse.json()
      const activitiesData = await activitiesResponse.json()

      if (profileData.error || activitiesData.error) {
        throw new Error(profileData.error || activitiesData.error)
      }

      setProfile(profileData.profile)
      setActivities(activitiesData.activities || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateProfile = async (profileData: any): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'profile', ...profileData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      return false
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'password', 
          current_password: currentPassword,
          new_password: newPassword
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update password')
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
      return false
    }
  }

  return {
    profile,
    activities,
    loading,
    error,
    refetch: fetchData,
    updateProfile,
    updatePassword
  }
}

// Dashboard API Hook
export function useDashboardApi() {
  const [stats, setStats] = useState<any>(null)
  const [recentContent, setRecentContent] = useState<any>(null)
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [statsResponse, recentResponse, activitiesResponse] = await Promise.all([
        fetch('/api/admin/dashboard?type=stats'),
        fetch('/api/admin/dashboard?type=recent'),
        fetch('/api/admin/dashboard?type=activity')
      ])

      if (!statsResponse.ok || !recentResponse.ok || !activitiesResponse.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const statsData = await statsResponse.json()
      const recentData = await recentResponse.json()
      const activitiesData = await activitiesResponse.json()

      if (statsData.error || recentData.error || activitiesData.error) {
        throw new Error(statsData.error || recentData.error || activitiesData.error)
      }

      setStats(statsData.stats)
      setRecentContent(recentData.recent)
      setActivities(activitiesData.activities || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const quickPublish = async (id: string, type: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'quick_publish', id, type })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to publish content')
      }

      await fetchData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish content')
      return false
    }
  }

  return {
    stats,
    recentContent,
    activities,
    loading,
    error,
    refetch: fetchData,
    quickPublish
  }
} 