import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSupabaseClient, SystemSetting, logUserActivity, getSystemSetting, updateSystemSetting } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const key = searchParams.get('key')
    const is_public = searchParams.get('is_public')

    const supabase = createAdminSupabaseClient()

    // If specific key is requested
    if (category && key) {
      const value = await getSystemSetting(category, key)
      return NextResponse.json({ value })
    }

    let query = supabase
      .from('system_settings')
      .select('*')
      .order('category', { ascending: true })
      .order('key', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    if (is_public) {
      query = query.eq('is_public', is_public === 'true')
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching system settings:', error)
      return NextResponse.json({ error: 'Failed to fetch system settings' }, { status: 500 })
    }

    // Group settings by category
    const groupedSettings = data.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {}
      }
      acc[setting.category][setting.key] = {
        value: setting.value,
        description: setting.description,
        is_public: setting.is_public,
        updated_at: setting.updated_at
      }
      return acc
    }, {} as Record<string, Record<string, any>>)

    return NextResponse.json({ settings: groupedSettings })
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { category, key, value, description, is_public } = body

    if (!category || !key || value === undefined) {
      return NextResponse.json({ error: 'Category, key, and value are required' }, { status: 400 })
    }

    const success = await updateSystemSetting(
      category,
      key,
      value,
      session.user.id,
      description
    )

    if (!success) {
      return NextResponse.json({ error: 'Failed to create system setting' }, { status: 500 })
    }

    await logUserActivity(
      session.user.id,
      'create',
      'system_setting',
      undefined,
      { category, key, value: typeof value === 'object' ? JSON.stringify(value) : value }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 })
    }

    const supabase = createAdminSupabaseClient()

    // Process multiple settings updates
    const updates = []
    for (const [category, categorySettings] of Object.entries(settings)) {
      for (const [key, settingData] of Object.entries(categorySettings as Record<string, any>)) {
        const success = await updateSystemSetting(
          category,
          key,
          settingData.value,
          session.user.id,
          settingData.description
        )
        
        if (success) {
          updates.push({ category, key, value: settingData.value })
        }
      }
    }

    await logUserActivity(
      session.user.id,
      'update',
      'system_settings',
      undefined,
      { updates_count: updates.length, categories: Object.keys(settings) }
    )

    return NextResponse.json({ success: true, updated: updates.length })
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const key = searchParams.get('key')

    if (!category || !key) {
      return NextResponse.json({ error: 'Category and key are required' }, { status: 400 })
    }

    const supabase = createAdminSupabaseClient()

    const { error } = await supabase
      .from('system_settings')
      .delete()
      .eq('category', category)
      .eq('key', key)

    if (error) {
      console.error('Error deleting system setting:', error)
      return NextResponse.json({ error: 'Failed to delete system setting' }, { status: 500 })
    }

    await logUserActivity(
      session.user.id,
      'delete',
      'system_setting',
      undefined,
      { category, key }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in settings API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 