-- META CONTROL HUB PRO - DATABASE SCHEMA
-- Run this in Railway PostgreSQL

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) DEFAULT 'Agency',
    avatar_url TEXT,
    tokens_balance INTEGER DEFAULT 360,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fb_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    fb_account_id VARCHAR(255) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    account_email VARCHAR(255),
    profile_image_url TEXT,
    access_token TEXT,
    token_expires_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    adu_connected_pages INTEGER DEFAULT 0,
    connected_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fb_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES fb_accounts(id) ON DELETE CASCADE,
    fb_page_id VARCHAR(255) NOT NULL,
    page_name VARCHAR(255) NOT NULL,
    page_image_url TEXT,
    platform VARCHAR(50) DEFAULT 'facebook',
    source_identity VARCHAR(255),
    source_platform VARCHAR(50),
    followers INTEGER DEFAULT 0,
    followers_gained INTEGER DEFAULT 0,
    initial_followers INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    instagram_handle VARCHAR(255),
    posts_per_day INTEGER DEFAULT 1,
    timezone VARCHAR(100) DEFAULT 'Asia/Karachi',
    is_scheduling_active BOOLEAN DEFAULT true,
    total_posted INTEGER DEFAULT 0,
    total_pending INTEGER DEFAULT 0,
    total_failed INTEGER DEFAULT 0,
    today_posted INTEGER DEFAULT 0,
    today_pending INTEGER DEFAULT 0,
    today_failed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE direct_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES fb_accounts(id) ON DELETE CASCADE,
    page_id UUID REFERENCES fb_pages(id) ON DELETE CASCADE,
    post_type VARCHAR(50) DEFAULT 'text',
    caption TEXT,
    first_comment TEXT,
    media_urls TEXT[],
    status VARCHAR(50) DEFAULT 'draft',
    scheduled_for TIMESTAMP,
    timezone VARCHAR(100),
    published_at TIMESTAMP,
    fb_post_id VARCHAR(255),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    page_id UUID REFERENCES fb_pages(id) ON DELETE CASCADE,
    post_id UUID REFERENCES direct_posts(id) ON DELETE CASCADE,
    queue_position INTEGER,
    scheduled_time TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    retry_count INTEGER DEFAULT 0,
    error_message TEXT,
    is_bulk BOOLEAN DEFAULT false,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES fb_pages(id) ON DELETE CASCADE,
    slot_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
