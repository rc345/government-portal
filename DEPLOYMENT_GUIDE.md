# Deployment Guide - Government Portal

## Vercel Deployment Setup

### Required Environment Variables

You need to configure these environment variables in your Vercel dashboard:

#### 1. Supabase Configuration (Required)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### 2. Email Configuration (Choose one option)

**Option A: Resend (Recommended)**
```
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=noreply@ablakwa.gov.gh
ADMIN_EMAIL=admin@ablakwa.gov.gh
```

**Option B: SMTP**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@ablakwa.gov.gh
ADMIN_EMAIL=admin@ablakwa.gov.gh
```

#### 3. NextAuth Configuration
```
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
```

#### 4. App Configuration
```
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project: `government-portal`
3. Go to **Settings** → **Environment Variables**
4. Add each variable above with its corresponding value
5. Make sure to set them for **Production**, **Preview**, and **Development** environments
6. Click **Save** after adding each variable
7. **Redeploy** your project

## Quick Fix for Current Deployment

To get your app deployed quickly, you can set these minimal environment variables:

### Minimal Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
RESEND_API_KEY=re_placeholder_key
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

**Note:** With placeholder values, the app will deploy but features like database and email won't work until you configure real values.

## Getting Real Values

### Supabase Setup:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon public** key
5. Copy your **service_role** key (keep this secret)

### Resend Setup:
1. Go to [resend.com](https://resend.com)
2. Sign up for an account
3. Go to **API Keys**
4. Create a new API key
5. Copy the key (starts with `re_`)

### NextAuth Secret:
Generate a random secret key:
```bash
openssl rand -base64 32
```

## After Setting Environment Variables

1. Go to your Vercel project dashboard
2. Click **Deployments**
3. Click the **"..."** menu on the latest deployment
4. Click **Redeploy**

Your app should now deploy successfully!

## Troubleshooting

If you still get errors:
1. Check that all environment variables are set correctly
2. Ensure there are no typos in variable names
3. Make sure all variables are enabled for **Production** environment
4. Check the Vercel build logs for specific error messages



