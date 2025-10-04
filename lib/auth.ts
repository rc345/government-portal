import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createServerSupabaseClient, isSupabaseConfigured } from "./supabase"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
            async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Always check demo credentials first
        if (credentials.email === 'admin@ablakwa.gov.gh' && credentials.password === 'admin123') {
          return {
            id: 'demo-user',
            email: 'admin@ablakwa.gov.gh',
            name: 'Demo Admin',
            role: 'super_admin',
            status: 'active',
          }
        }

        // If Supabase is not configured, return null after demo check
        if (!isSupabaseConfigured()) {
          return null
        }

                try {
          const supabase = await createServerSupabaseClient()
          
          // Find user by email
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .eq('status', 'active')
            .single()

          if (error || !user) {
            return null
          }

          // Check password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isValidPassword) {
            return null
          }

          // Update last login
          await supabase
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', user.id)

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.status = user.status
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.status = token.status as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
}

// Utility functions for role-based access control
export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    'super_admin': 5,
    'content_editor': 4,
    'media_manager': 3,
    'news_editor': 2,
    'viewer': 1
  }

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0

  return userLevel >= requiredLevel
}

export const canAccessResource = (userRole: string, resource: string): boolean => {
  const permissions = {
    'super_admin': ['*'],
    'content_editor': ['content', 'media', 'news'],
    'media_manager': ['media'],
    'news_editor': ['news', 'content'],
    'viewer': ['read']
  }

  const userPermissions = permissions[userRole as keyof typeof permissions] || []
  return userPermissions.includes('*') || userPermissions.includes(resource)
} 