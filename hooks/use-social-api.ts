import { useState, useEffect } from 'react'
import { SocialPost, SocialAccount } from '@/lib/supabase'

interface SocialApiResponse {
  posts?: SocialPost[]
  accounts?: SocialAccount[]
  error?: string
}

interface UseSocialApiReturn {
  posts: SocialPost[]
  accounts: SocialAccount[]
  loading: boolean
  error: string | null
  refetch: () => void
  createPost: (postData: Partial<SocialPost>) => Promise<boolean>
  updatePost: (id: string, postData: Partial<SocialPost>) => Promise<boolean>
  deletePost: (id: string) => Promise<boolean>
  createAccount: (accountData: Partial<SocialAccount>) => Promise<boolean>
  updateAccount: (id: string, accountData: Partial<SocialAccount>) => Promise<boolean>
  deleteAccount: (id: string) => Promise<boolean>
}

export function useSocialApi(): UseSocialApiReturn {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [postsResponse, accountsResponse] = await Promise.all([
        fetch('/api/admin/social?type=posts'),
        fetch('/api/admin/social?type=accounts')
      ])

      if (!postsResponse.ok || !accountsResponse.ok) {
        throw new Error('Failed to fetch social media data')
      }

      const postsData: SocialApiResponse = await postsResponse.json()
      const accountsData: SocialApiResponse = await accountsResponse.json()

      if (postsData.error || accountsData.error) {
        throw new Error(postsData.error || accountsData.error)
      }

      setPosts(postsData.posts || [])
      setAccounts(accountsData.accounts || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createPost = async (postData: Partial<SocialPost>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'post', ...postData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create post')
      }

      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
      return false
    }
  }

  const updatePost = async (id: string, postData: Partial<SocialPost>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'post', ...postData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update post')
      }

      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
      return false
    }
  }

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin/social?id=${id}&type=post`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete post')
      }

      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
      return false
    }
  }

  const createAccount = async (accountData: Partial<SocialAccount>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'account', ...accountData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create account')
      }

      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
      return false
    }
  }

  const updateAccount = async (id: string, accountData: Partial<SocialAccount>): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'account', ...accountData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update account')
      }

      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update account')
      return false
    }
  }

  const deleteAccount = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin/social?id=${id}&type=account`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete account')
      }

      await fetchData() // Refresh data
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account')
      return false
    }
  }

  return {
    posts,
    accounts,
    loading,
    error,
    refetch: fetchData,
    createPost,
    updatePost,
    deletePost,
    createAccount,
    updateAccount,
    deleteAccount
  }
} 