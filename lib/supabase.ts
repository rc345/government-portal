import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || supabaseUrl.includes('your_supabase') || !supabaseUrl.startsWith('http')) {
  console.warn('⚠️  Supabase URL not configured properly. Using fallback configuration.')
}

if (!supabaseAnonKey || supabaseAnonKey.includes('your_supabase')) {
  console.warn('⚠️  Supabase Anon Key not configured properly. Using fallback configuration.')
}

// Use fallback values for development
const validUrl = (supabaseUrl && supabaseUrl.startsWith('http')) ? supabaseUrl : 'https://fallback.supabase.co'
const validAnonKey = (supabaseAnonKey && !supabaseAnonKey.includes('your_supabase')) ? supabaseAnonKey : 'fallback-key'
const validServiceKey = (supabaseServiceKey && !supabaseServiceKey.includes('your_supabase')) ? supabaseServiceKey : 'fallback-service-key'

// Create client-side Supabase client
export const supabase = createClient(validUrl, validAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'ablakwa-auth',
  },
})

// Create server-side Supabase client
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(validUrl, validAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookie setting errors in middleware/edge cases
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // Handle cookie removal errors
        }
      },
    },
  })
}

// Create admin Supabase client with service role key
export function createAdminSupabaseClient() {
  return createClient(validUrl, validServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Database types and interfaces
export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'content_editor' | 'media_manager' | 'news_editor' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  created_at: string
  updated_at: string
  last_login?: string
  password_hash: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  image_url?: string
  author: string
  published_at?: string
  category: string
  read_time?: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface Speech {
  id: string
  title: string
  description?: string
  date: string
  venue?: string
  type: 'keynote' | 'parliamentary' | 'press conference' | 'other'
  duration?: string
  transcript_url?: string
  video_url?: string
  thumbnail_url?: string
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  title: string
  description?: string
  date: string
  pages?: number
  category: string
  download_url: string
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
  updated_at: string
}

export interface MediaFile {
  id: string
  name: string
  type: 'image' | 'video' | 'document'
  size: number
  dimensions?: string
  url: string
  alt_text?: string
  category?: string
  tags?: string[]
  uploaded_by?: string
  created_at: string
  updated_at: string
}

// New interfaces for admin features
export interface SocialPost {
  id: string
  title: string
  content: string
  platforms: string[]
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduled_at?: string
  published_at?: string
  image_url?: string
  link_url?: string
  engagement_stats: Record<string, any>
  created_by?: string
  created_at: string
  updated_at: string
}

export interface SocialAccount {
  id: string
  platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram'
  account_name: string
  account_url: string
  is_connected: boolean
  followers_count: number
  last_sync?: string
  api_credentials?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface SEOPage {
  id: string
  page_url: string
  page_title: string
  meta_description?: string
  meta_keywords?: string[]
  seo_score: number
  issues?: string[]
  recommendations?: string[]
  last_crawled?: string
  created_at: string
  updated_at: string
}

export interface SEOKeyword {
  id: string
  keyword: string
  current_rank?: number
  previous_rank?: number
  search_volume: number
  difficulty: number
  target_url?: string
  created_at: string
  updated_at: string
}

export interface ScheduledPost {
  id: string
  title: string
  content: string
  type: 'news' | 'speech' | 'social' | 'report'
  platforms?: string[]
  scheduled_at: string
  status: 'scheduled' | 'published' | 'failed' | 'cancelled'
  is_recurring: boolean
  recurrence_pattern?: string
  recurrence_end?: string
  published_at?: string
  error_message?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface SystemSetting {
  id: string
  category: string
  key: string
  value: any
  description?: string
  is_public: boolean
  updated_by?: string
  created_at: string
  updated_at: string
}

export interface UserActivity {
  id: string
  user_id?: string
  action: string
  resource_type?: string
  resource_id?: string
  details?: Record<string, any>
  ip_address?: string
  user_agent?: string
  created_at: string
}

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return !!(
    supabaseUrl && 
    !supabaseUrl.includes('your_supabase') &&
    supabaseUrl.startsWith('http') &&
    supabaseAnonKey && 
    !supabaseAnonKey.includes('your_supabase')
  )
}

// Development mode helper
export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV === 'development'
}

// Database utility functions
export async function logUserActivity(
  userId: string,
  action: string,
  resourceType?: string,
  resourceId?: string,
  details?: Record<string, any>,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    const supabase = createAdminSupabaseClient()
    
    const { error } = await supabase
      .from('user_activity')
      .insert({
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        ip_address: ipAddress,
        user_agent: userAgent,
      })

    if (error) {
      console.error('Error logging user activity:', error)
    }
  } catch (error) {
    console.error('Error logging user activity:', error)
  }
}

export async function getSystemSetting(category: string, key: string): Promise<any> {
  try {
    const supabase = createAdminSupabaseClient()
    
    const { data, error } = await supabase
      .from('system_settings')
      .select('value')
      .eq('category', category)
      .eq('key', key)
      .single()

    if (error) {
      console.error('Error fetching system setting:', error)
      return null
    }

    return data?.value
  } catch (error) {
    console.error('Error fetching system setting:', error)
    return null
  }
}

export async function updateSystemSetting(
  category: string,
  key: string,
  value: any,
  updatedBy: string,
  description?: string
): Promise<boolean> {
  try {
    const supabase = createAdminSupabaseClient()
    
    const { error } = await supabase
      .from('system_settings')
      .upsert({
        category,
        key,
        value,
        description,
        updated_by: updatedBy,
      })

    if (error) {
      console.error('Error updating system setting:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error updating system setting:', error)
    return false
  }
} 