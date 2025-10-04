# Government Official Website - Hon. Samuel Okudzeto Ablakwa

A modern, full-featured website for Hon. Samuel Okudzeto Ablakwa, Member of Parliament for North Tongu constituency, built with Next.js and Supabase.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, responsive design with Tailwind CSS
- **Content Display**: News articles, speeches, reports, and media
- **Search Functionality**: Full-text search across all content types
- **Contact Forms**: Secure contact form with spam protection
- **SEO Optimized**: Meta tags, structured data, and sitemap

### Admin Panel
- **Dashboard**: Real-time statistics and content overview
- **Content Management**: Create, edit, and publish news, speeches, and reports
- **Media Management**: Upload and organize images, videos, and documents
- **Social Media**: Schedule and manage social media posts across platforms
- **SEO Tools**: Keyword tracking and page optimization
- **User Management**: Role-based access control for team members
- **Activity Logging**: Comprehensive audit trail of all admin actions
- **System Settings**: Configurable site settings and integrations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Supabase adapter
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd government-official-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The `.env.local` file is already configured with the Supabase project. For production, update these values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXTAUTH_URL=your_production_url
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin

### Default Admin Login
```
Email: admin@ablakwa.gov.gh
Password: admin123
```
**⚠️ Change the default password immediately in production!**

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── [pages]/           # Public pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client and types
│   ├── auth.ts           # Authentication configuration
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🗄️ Database Schema

The database includes 13 tables with full relationships:

### Core Content
- `users` - Authentication and user management
- `news_articles` - News content with SEO metadata
- `speeches` - Speech records and media
- `reports` - Document reports and downloads
- `contact_messages` - Contact form submissions
- `media_files` - File storage with metadata

### Admin Features
- `social_posts` - Social media content and engagement
- `social_accounts` - Platform integrations
- `seo_pages` - Page-specific SEO data
- `seo_keywords` - Keyword tracking and rankings
- `scheduled_posts` - Content scheduling with recurrence
- `system_settings` - Application configuration
- `user_activity` - Audit logging

## 🔐 Security

### Current Security Features
- Password hashing with bcrypt
- Session-based authentication
- Input validation with Zod schemas
- SQL injection prevention via Supabase
- Environment variable protection

### Production Security Checklist
- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Set up rate limiting
- [ ] Configure CORS policies
- [ ] Add CSRF protection
- [ ] Implement SSL/TLS certificates
- [ ] Set up automated backups

## 📊 Admin Panel Features

### Dashboard
- Real-time content statistics
- Recent activity feed
- Quick action buttons
- System health monitoring

### Content Management
- Rich text editor for articles
- Image upload and management
- SEO metadata editing
- Content scheduling
- Draft/publish workflows

### Social Media
- Multi-platform posting
- Engagement analytics
- Scheduled content calendar
- Account management

### SEO Tools
- Keyword rank tracking
- Page optimization scores
- Meta tag management
- Search console integration

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure reverse proxy (nginx/Apache)

## 🔧 Development

### Adding New Features
1. Create database migrations in Supabase
2. Update TypeScript types in `lib/supabase.ts`
3. Add API routes in `app/api/`
4. Create UI components and pages
5. Update documentation

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for consistent styling

## 📝 API Documentation

### Public APIs
- `GET /api/search` - Search content
- `POST /api/contact` - Submit contact form
- `GET /api/news` - Get published news articles

### Admin APIs (Authentication Required)
- `/api/admin/dashboard` - Dashboard statistics
- `/api/admin/content` - Content CRUD operations
- `/api/admin/social` - Social media management
- `/api/admin/seo` - SEO data management
- `/api/admin/schedule` - Content scheduling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is private and proprietary to Hon. Samuel Okudzeto Ablakwa's office.

## 📞 Support

For technical support or questions:
- Email: tech@ablakwa.gov.gh
- Documentation: See `ADMIN_COMPLETION_PLAN.md`

---

**Built with ❤️ for transparent governance and community engagement.** 