import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { logUserActivity } from '@/lib/supabase'

export interface ApiError {
  message: string
  status: number
  code?: string
}

export class ApiErrorHandler extends Error {
  status: number
  code?: string

  constructor(message: string, status: number = 500, code?: string) {
    super(message)
    this.status = status
    this.code = code
    this.name = 'ApiErrorHandler'
  }
}

export function createApiError(message: string, status: number = 500, code?: string): ApiErrorHandler {
  return new ApiErrorHandler(message, status, code)
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)

  if (error instanceof ApiErrorHandler) {
    return NextResponse.json(
      { 
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString()
      },
      { status: error.status }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { 
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { 
      error: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}

export async function withAuth<T>(
  request: NextRequest,
  handler: (session: any, request: NextRequest) => Promise<T>
): Promise<T | NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      throw createApiError('Unauthorized', 401, 'UNAUTHORIZED')
    }

    return await handler(session, request)
  } catch (error) {
    if (error instanceof ApiErrorHandler) {
      throw error
    }
    throw createApiError('Authentication failed', 401, 'AUTH_FAILED')
  }
}

export async function withPermission<T>(
  request: NextRequest,
  requiredRole: string,
  handler: (session: any, request: NextRequest) => Promise<T>
): Promise<T | NextResponse> {
  return withAuth(request, async (session, req) => {
    const userRole = session.user.role
    const roleHierarchy = {
      'super_admin': 5,
      'content_editor': 4,
      'media_manager': 3,
      'news_editor': 2,
      'viewer': 1
    }

    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0

    if (userLevel < requiredLevel) {
      throw createApiError('Insufficient permissions', 403, 'INSUFFICIENT_PERMISSIONS')
    }

    return await handler(session, req)
  })
}

export function validateRequestBody(body: any, requiredFields: string[]): void {
  if (!body || typeof body !== 'object') {
    throw createApiError('Invalid request body', 400, 'INVALID_BODY')
  }

  const missingFields = requiredFields.filter(field => !(field in body))
  if (missingFields.length > 0) {
    throw createApiError(
      `Missing required fields: ${missingFields.join(', ')}`,
      400,
      'MISSING_FIELDS'
    )
  }
}

export function validatePagination(request: NextRequest): { limit: number; offset: number } {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100) // Max 100 items
  const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0)

  return { limit, offset }
}

export async function withRateLimit<T>(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<T>
): Promise<T | NextResponse> {
  // Simple rate limiting based on IP
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const key = `rate_limit:${ip}`
  
  // In production, you'd use Redis or similar for rate limiting
  // For now, we'll just log and continue
  console.log(`API request from IP: ${ip}`)
  
  return await handler(request)
}

export async function logApiActivity(
  userId: string,
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: Record<string, any>,
  request?: NextRequest
): Promise<void> {
  try {
    const ipAddress = request?.ip || request?.headers.get('x-forwarded-for') || undefined
    const userAgent = request?.headers.get('user-agent') || undefined

    await logUserActivity(
      userId,
      action,
      resourceType,
      resourceId,
      details,
      ipAddress,
      userAgent
    )
  } catch (error) {
    console.error('Failed to log API activity:', error)
    // Don't throw here to avoid breaking the main operation
  }
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  // Basic sanitization - remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validateDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return !isNaN(start.getTime()) && !isNaN(end.getTime()) && start <= end
}

export async function withTransaction<T>(
  operation: () => Promise<T>
): Promise<T> {
  // In a real implementation, you'd use database transactions
  // For now, we'll just execute the operation
  try {
    return await operation()
  } catch (error) {
    // In a real implementation, you'd rollback the transaction here
    throw error
  }
}

export function createSuccessResponse(data: any, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  })
}

export function createPaginatedResponse(
  data: any[],
  total: number,
  limit: number,
  offset: number
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit)
    },
    timestamp: new Date().toISOString()
  })
} 