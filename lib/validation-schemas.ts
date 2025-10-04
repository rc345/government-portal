import { z } from 'zod'

// User validation schemas
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['super_admin', 'content_editor', 'media_manager', 'news_editor', 'viewer']),
  status: z.enum(['active', 'inactive', 'pending']).optional()
})

export const passwordChangeSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

// Content validation schemas
export const newsArticleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  image_url: z.string().url('Invalid image URL').optional(),
  author: z.string().min(2, 'Author name must be at least 2 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  read_time: z.string().optional(),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  status: z.enum(['draft', 'published', 'archived'])
})

export const speechSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  venue: z.string().min(3, 'Venue must be at least 3 characters').optional(),
  type: z.enum(['keynote', 'parliamentary', 'press conference', 'other']),
  duration: z.string().optional(),
  transcript_url: z.string().url('Invalid transcript URL').optional(),
  video_url: z.string().url('Invalid video URL').optional(),
  thumbnail_url: z.string().url('Invalid thumbnail URL').optional()
})

export const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  pages: z.number().min(1, 'Pages must be at least 1').optional(),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  download_url: z.string().url('Invalid download URL')
})

// Social media validation schemas
export const socialPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(2000, 'Content must be less than 2000 characters'),
  platforms: z.array(z.enum(['twitter', 'facebook', 'linkedin', 'instagram'])).min(1, 'At least one platform must be selected'),
  status: z.enum(['draft', 'scheduled', 'published', 'failed']),
  scheduled_at: z.string().datetime().optional(),
  image_url: z.string().url('Invalid image URL').optional(),
  link_url: z.string().url('Invalid link URL').optional()
})

export const socialAccountSchema = z.object({
  platform: z.enum(['twitter', 'facebook', 'linkedin', 'instagram']),
  account_name: z.string().min(1, 'Account name is required'),
  account_url: z.string().url('Invalid account URL'),
  is_connected: z.boolean().optional(),
  followers_count: z.number().min(0, 'Followers count must be non-negative').optional()
})

// SEO validation schemas
export const seoPageSchema = z.object({
  page_url: z.string().url('Invalid page URL'),
  page_title: z.string().min(10, 'Page title must be at least 10 characters').max(60, 'Page title should be less than 60 characters'),
  meta_description: z.string().min(50, 'Meta description must be at least 50 characters').max(160, 'Meta description should be less than 160 characters').optional(),
  meta_keywords: z.array(z.string()).optional(),
  seo_score: z.number().min(0, 'SEO score must be non-negative').max(100, 'SEO score cannot exceed 100').optional(),
  issues: z.array(z.string()).optional(),
  recommendations: z.array(z.string()).optional()
})

export const seoKeywordSchema = z.object({
  keyword: z.string().min(2, 'Keyword must be at least 2 characters').max(100, 'Keyword must be less than 100 characters'),
  current_rank: z.number().min(1, 'Rank must be at least 1').optional(),
  search_volume: z.number().min(0, 'Search volume must be non-negative').optional(),
  difficulty: z.number().min(0, 'Difficulty must be non-negative').max(100, 'Difficulty cannot exceed 100').optional(),
  target_url: z.string().url('Invalid target URL').optional()
})

// Scheduled post validation schema
export const scheduledPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  type: z.enum(['news', 'speech', 'social', 'report']),
  platforms: z.array(z.string()).optional(),
  scheduled_at: z.string().datetime('Invalid scheduled date'),
  is_recurring: z.boolean().optional(),
  recurrence_pattern: z.enum(['daily', 'weekly', 'monthly', 'custom']).optional(),
  recurrence_end: z.string().datetime().optional()
})

// System settings validation schema
export const systemSettingSchema = z.object({
  category: z.string().min(2, 'Category must be at least 2 characters'),
  key: z.string().min(2, 'Key must be at least 2 characters'),
  value: z.any(),
  description: z.string().optional(),
  is_public: z.boolean().optional()
})

// Media file validation schema
export const mediaFileSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  type: z.enum(['image', 'video', 'document']),
  size: z.number().min(1, 'File size must be greater than 0'),
  url: z.string().url('Invalid file URL'),
  alt_text: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional()
})

// Contact message validation schema
export const contactMessageSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  status: z.enum(['new', 'read', 'replied', 'archived']).optional()
})

// Validation helper functions
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return { success: false, errors }
    }
    return { success: false, errors: ['Validation failed'] }
  }
}

export function validatePartialData<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: Partial<T>; errors?: string[] } {
  try {
    const partialSchema = schema.partial()
    const validatedData = partialSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return { success: false, errors }
    }
    return { success: false, errors: ['Validation failed'] }
  }
}

// Export all schemas for use in API routes
export const schemas = {
  user: userSchema,
  passwordChange: passwordChangeSchema,
  newsArticle: newsArticleSchema,
  speech: speechSchema,
  report: reportSchema,
  socialPost: socialPostSchema,
  socialAccount: socialAccountSchema,
  seoPage: seoPageSchema,
  seoKeyword: seoKeywordSchema,
  scheduledPost: scheduledPostSchema,
  systemSetting: systemSettingSchema,
  mediaFile: mediaFileSchema,
  contactMessage: contactMessageSchema
} 