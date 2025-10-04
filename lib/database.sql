-- Government Official Website Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for admin authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'content_editor', 'media_manager', 'news_editor', 'viewer')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
    password_hash TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News articles table
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    author VARCHAR(255) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(20),
    slug VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Speeches table
CREATE TABLE speeches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    venue TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('keynote', 'parliamentary', 'press conference', 'other')),
    duration VARCHAR(20),
    transcript_url TEXT,
    video_url TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    pages INTEGER,
    category VARCHAR(100) NOT NULL,
    download_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media files table
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'video', 'document')),
    size BIGINT NOT NULL,
    dimensions VARCHAR(20),
    url TEXT NOT NULL,
    alt_text TEXT,
    category VARCHAR(100),
    tags TEXT[], -- Array of tags
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media posts table
CREATE TABLE social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    platforms TEXT[] NOT NULL, -- Array of platforms: twitter, facebook, linkedin, instagram
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    image_url TEXT,
    link_url TEXT,
    engagement_stats JSONB DEFAULT '{}', -- Store likes, shares, comments, etc.
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media accounts table
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('twitter', 'facebook', 'linkedin', 'instagram')),
    account_name VARCHAR(255) NOT NULL,
    account_url TEXT NOT NULL,
    is_connected BOOLEAN DEFAULT false,
    followers_count INTEGER DEFAULT 0,
    last_sync TIMESTAMP WITH TIME ZONE,
    api_credentials JSONB, -- Store encrypted API keys/tokens
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(platform, account_name)
);

-- SEO pages table
CREATE TABLE seo_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_url TEXT NOT NULL UNIQUE,
    page_title TEXT NOT NULL,
    meta_description TEXT,
    meta_keywords TEXT[],
    seo_score INTEGER DEFAULT 0 CHECK (seo_score >= 0 AND seo_score <= 100),
    issues TEXT[],
    recommendations TEXT[],
    last_crawled TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO keywords table
CREATE TABLE seo_keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keyword TEXT NOT NULL,
    current_rank INTEGER,
    previous_rank INTEGER,
    search_volume INTEGER DEFAULT 0,
    difficulty INTEGER DEFAULT 0 CHECK (difficulty >= 0 AND difficulty <= 100),
    target_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheduled posts table
CREATE TABLE scheduled_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('news', 'speech', 'social', 'report')),
    platforms TEXT[], -- For social posts
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'failed', 'cancelled')),
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern VARCHAR(50), -- daily, weekly, monthly, custom
    recurrence_end TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category, key)
);

-- User activity log table
CREATE TABLE user_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_news_articles_status ON news_articles(status);
CREATE INDEX idx_news_articles_published_at ON news_articles(published_at);
CREATE INDEX idx_news_articles_slug ON news_articles(slug);
CREATE INDEX idx_speeches_date ON speeches(date);
CREATE INDEX idx_speeches_type ON speeches(type);
CREATE INDEX idx_reports_date ON reports(date);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_media_files_type ON media_files(type);
CREATE INDEX idx_media_files_category ON media_files(category);

-- New indexes for admin features
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_social_posts_scheduled_at ON social_posts(scheduled_at);
CREATE INDEX idx_social_posts_platforms ON social_posts USING GIN(platforms);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_seo_pages_url ON seo_pages(page_url);
CREATE INDEX idx_seo_keywords_keyword ON seo_keywords(keyword);
CREATE INDEX idx_scheduled_posts_status ON scheduled_posts(status);
CREATE INDEX idx_scheduled_posts_scheduled_at ON scheduled_posts(scheduled_at);
CREATE INDEX idx_system_settings_category ON system_settings(category);
CREATE INDEX idx_system_settings_key ON system_settings(key);
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_action ON user_activity(action);
CREATE INDEX idx_user_activity_created_at ON user_activity(created_at);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_speeches_updated_at BEFORE UPDATE ON speeches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON media_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON social_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_pages_updated_at BEFORE UPDATE ON seo_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_keywords_updated_at BEFORE UPDATE ON seo_keywords FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scheduled_posts_updated_at BEFORE UPDATE ON scheduled_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE speeches ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read access for published news" ON news_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access for speeches" ON speeches FOR SELECT USING (true);
CREATE POLICY "Public read access for reports" ON reports FOR SELECT USING (true);

-- Admin access policies (you'll need to set up authentication first)
-- These are basic policies - you should customize based on your auth setup
CREATE POLICY "Admin full access to users" ON users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to news" ON news_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to speeches" ON speeches FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to reports" ON reports FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to contact messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to media files" ON media_files FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to social posts" ON social_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to social accounts" ON social_accounts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to seo pages" ON seo_pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to seo keywords" ON seo_keywords FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to scheduled posts" ON scheduled_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to system settings" ON system_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to user activity" ON user_activity FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO users (email, name, role, status, password_hash) VALUES
('admin@ablakwa.gov.gh', 'Admin User', 'super_admin', 'active', '$2b$12$dummy.hash.for.development'),
('editor@ablakwa.gov.gh', 'Content Editor', 'content_editor', 'active', '$2b$12$dummy.hash.for.development');

INSERT INTO news_articles (title, excerpt, content, author, published_at, category, read_time, slug, status) VALUES
('Ghana Secures $30M Grant for Infrastructure Development', 
 'Minister Ablakwa''s diplomatic efforts with China yield significant funding for national infrastructure projects.',
 'Full article content here...', 
 'Ministry Communications', 
 NOW() - INTERVAL '2 days', 
 'International Relations', 
 '3 min read', 
 'ghana-secures-30m-grant', 
 'published'),
('Revolutionary Passport Delivery System Launched',
 'Over 5,000 passports delivered directly to citizens'' homes in the first month of the new courier system.',
 'Full article content here...',
 'Digital Services Team',
 NOW() - INTERVAL '5 days',
 'Digital Innovation',
 '4 min read',
 'passport-delivery-system-launched',
 'published');

INSERT INTO speeches (title, description, date, venue, type, duration, thumbnail_url) VALUES
('Ghana''s Role in Global Diplomacy - AU Summit Address',
 'Minister Ablakwa''s keynote address at the 46th African Union Executive Council Meeting in Addis Ababa.',
 '2025-01-15',
 'African Union Headquarters, Ethiopia',
 'keynote',
 '45 minutes',
 '/images/ablakwa-meeting.jpeg'),
('Digital Transformation in Diplomatic Services',
 'Parliamentary address on the modernization of Ghana''s diplomatic and consular services.',
 '2025-01-08',
 'Parliament House, Accra',
 'parliamentary',
 '30 minutes',
 '/images/ablakwa-official.jpeg');

INSERT INTO reports (title, description, date, pages, category, download_url) VALUES
('Annual Foreign Policy Report 2024',
 'Comprehensive review of Ghana''s foreign policy achievements and diplomatic initiatives.',
 '2024-12-31',
 156,
 'Annual Report',
 '/reports/foreign-policy-report-2024.pdf'),
('Migration and Diaspora Engagement Strategy',
 'Strategic framework for managing migration and enhancing diaspora participation in national development.',
 '2024-11-20',
 89,
 'Policy Document',
 '/reports/migration-diaspora-strategy.pdf');

-- Sample data for new admin features
INSERT INTO social_accounts (platform, account_name, account_url, is_connected, followers_count) VALUES
('twitter', '@SamuelAblakwa', 'https://twitter.com/SamuelAblakwa', true, 125000),
('facebook', 'Hon. Samuel Okudzeto Ablakwa', 'https://facebook.com/SamuelAblakwa', true, 89000),
('linkedin', 'Samuel Okudzeto Ablakwa', 'https://linkedin.com/in/samuel-ablakwa', true, 45000),
('instagram', '@samuelablakwa', 'https://instagram.com/samuelablakwa', false, 0);

INSERT INTO social_posts (title, content, platforms, status, scheduled_at, engagement_stats, created_by) VALUES
('Ghana Secures Major Infrastructure Funding',
 'Proud to announce that Ghana has secured $30M in infrastructure funding through diplomatic negotiations. This will benefit thousands of Ghanaians. #Ghana #Infrastructure #Diplomacy',
 ARRAY['twitter', 'facebook', 'linkedin'],
 'published',
 NOW() - INTERVAL '2 hours',
 '{"likes": 1250, "shares": 340, "comments": 89}',
 (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('Upcoming Parliamentary Session',
 'Join me tomorrow for an important parliamentary session on digital transformation in government services. Live coverage starts at 10 AM. #Parliament #DigitalGhana',
 ARRAY['twitter', 'facebook'],
 'scheduled',
 NOW() + INTERVAL '1 day',
 '{}',
 (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'));

INSERT INTO seo_pages (page_url, page_title, meta_description, meta_keywords, seo_score, issues, recommendations) VALUES
('/', 'Hon. Samuel Okudzeto Ablakwa - Official Website', 'Official website of Hon. Samuel Okudzeto Ablakwa, Minister of Foreign Affairs and Regional Integration of Ghana', ARRAY['Samuel Ablakwa', 'Ghana Minister', 'Foreign Affairs'], 85, ARRAY['Missing alt text on hero image'], ARRAY['Add structured data markup', 'Optimize image sizes']),
('/about', 'About Hon. Samuel Okudzeto Ablakwa', 'Learn about the background, achievements, and vision of Hon. Samuel Okudzeto Ablakwa', ARRAY['About Samuel Ablakwa', 'Biography', 'Political Career'], 78, ARRAY['Title too long', 'Missing H1 tag'], ARRAY['Shorten page title', 'Add proper heading structure']),
('/news', 'Latest News & Updates', 'Stay updated with the latest news and announcements from Hon. Samuel Okudzeto Ablakwa', ARRAY['Ghana News', 'Political Updates', 'Government News'], 82, ARRAY[], ARRAY['Add breadcrumb navigation', 'Implement pagination']);

INSERT INTO seo_keywords (keyword, current_rank, previous_rank, search_volume, difficulty, target_url) VALUES
('Samuel Ablakwa', 3, 5, 8900, 45, '/'),
('Ghana Foreign Minister', 8, 12, 3400, 65, '/about'),
('Ghana diplomatic relations', 15, 18, 1200, 55, '/news'),
('Ghana passport services', 22, 28, 2100, 40, '/platform'),
('African Union Ghana', 35, 42, 890, 70, '/speeches');

INSERT INTO scheduled_posts (title, content, type, platforms, scheduled_at, status, is_recurring, recurrence_pattern, created_by) VALUES
('Weekly Diplomatic Update',
 'Weekly summary of Ghana''s diplomatic activities and international engagements',
 'news',
 ARRAY['twitter', 'facebook', 'linkedin'],
 NOW() + INTERVAL '3 days',
 'scheduled',
 true,
 'weekly',
 (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('Monthly Parliament Report',
 'Monthly report on parliamentary activities and legislative progress',
 'report',
 ARRAY['facebook', 'linkedin'],
 NOW() + INTERVAL '1 week',
 'scheduled',
 true,
 'monthly',
 (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'));

INSERT INTO system_settings (category, key, value, description, is_public, updated_by) VALUES
('general', 'site_title', '"Hon. Samuel Okudzeto Ablakwa - Official Website"', 'Main site title', true, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('general', 'site_description', '"Official website of Hon. Samuel Okudzeto Ablakwa, Minister of Foreign Affairs and Regional Integration of Ghana"', 'Site meta description', true, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('general', 'timezone', '"Africa/Accra"', 'Default timezone', false, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('security', 'session_timeout', '7200', 'Session timeout in seconds', false, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('security', 'max_login_attempts', '5', 'Maximum login attempts before lockout', false, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('email', 'smtp_host', '"smtp.gmail.com"', 'SMTP server host', false, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('email', 'smtp_port', '587', 'SMTP server port', false, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('integrations', 'google_analytics_id', '"GA-XXXXXXXXX"', 'Google Analytics tracking ID', false, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('appearance', 'primary_color', '"#1f2937"', 'Primary theme color', true, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh')),
('appearance', 'logo_url', '"/images/logo.png"', 'Site logo URL', true, (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'));

INSERT INTO user_activity (user_id, action, resource_type, resource_id, details, ip_address) VALUES
((SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'), 'login', 'user', (SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'), '{"success": true}', '127.0.0.1'),
((SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'), 'create', 'news_article', (SELECT id FROM news_articles WHERE slug = 'ghana-secures-30m-grant'), '{"title": "Ghana Secures $30M Grant for Infrastructure Development"}', '127.0.0.1'),
((SELECT id FROM users WHERE email = 'admin@ablakwa.gov.gh'), 'update', 'social_post', (SELECT id FROM social_posts WHERE title = 'Ghana Secures Major Infrastructure Funding'), '{"status": "published"}', '127.0.0.1'); 