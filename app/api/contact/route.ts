import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { EmailService } from '@/lib/email'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  newsletter: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        message: 'Contact form submitted successfully (demo mode)',
        id: 'demo-mode'
      })
    }

    const body = await request.json()
    
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const data = validation.data
    const supabase = await createServerSupabaseClient()

    // Save to database
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        subject: data.subject,
        message: data.message,
        newsletter_signup: data.newsletter || false,
        status: 'new',
        ip_address: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      )
    }

    // Send email notifications (async, don't wait)
    Promise.all([
      // Send notification to admin
      EmailService.sendContactNotification({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      }),
      
      // Send auto-reply to user
      EmailService.sendContactAutoReply({
        name: data.name,
        email: data.email,
        subject: data.subject
      }),
      
      // Send newsletter confirmation if requested
      data.newsletter ? EmailService.sendNewsletterConfirmation(data.email, data.name) : Promise.resolve(true)
    ]).catch(emailError => {
      console.error('Email error:', emailError)
      // Log to system but don't fail the request
      EmailService.sendSystemNotification(
        'warning',
        'Contact Form Email Failed',
        'Failed to send contact form emails',
        { error: emailError.message, contactData: data }
      )
    })

    return NextResponse.json({
      message: 'Message sent successfully',
      id: 'pending' // We don't expose internal IDs
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Send system notification for server errors
    EmailService.sendSystemNotification(
      'error',
      'Contact Form Server Error',
      'An error occurred processing a contact form submission',
      { error: error instanceof Error ? error.message : 'Unknown error' }
    ).catch(console.error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint could be used by admin to fetch contact messages
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    
    const supabase = await createServerSupabaseClient()
    
    let query = supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (status) {
      query = query.eq('status', status)
    }
    
    const { data, error, count } = await query
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      messages: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
    
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 