# 🚀 META CONTROL HUB - COMPLETE A-Z SETUP GUIDE

**Complete Backend + Frontend Package**
**Read this once → Create everything yourself**

---

## 📋 FILE STRUCTURE (COMPLETE)

```
GITHUB REPOSITORIES:
├── meta-control-hub-backend (12 files)
└── meta-control-hub-frontend (24 files)

DEPLOY ON:
├── Railway (Backend)
└── Vercel (Frontend)
```

---

# ✅ PART 1: BACKEND (meta-control-hub-backend)

## **12 FILES TO CREATE ON GITHUB:**

### **FILE 1: package.json**
```json
{
  "name": "meta-control-hub-backend",
  "version": "1.0.0",
  "description": "Meta Control Hub - Facebook Management API",
  "main": "dist/server.js",
  "scripts": {
    "dev": "ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "typecheck": "tsc --noEmit"
  },
  "keywords": ["facebook", "api", "scheduler", "automation"],
  "author": "Bilal Asif",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "axios": "^1.6.2",
    "cors": "^2.8.5",
    "uuid": "^9.0.1",
    "jsonwebtoken": "^9.1.2",
    "bcryptjs": "^2.4.3",
    "redis": "^4.6.12",
    "bull": "^4.11.5"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.6",
    "@types/uuid": "^9.0.7",
    "ts-node": "^10.9.2"
  }
}
```

---

### **FILE 2: tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

### **FILE 3: .env.example**
```
PORT=3000
NODE_ENV=development
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

DATABASE_URL=postgresql://user:password@localhost:5432/meta_control_hub

FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
FACEBOOK_APP_SECRET=YOUR_FACEBOOK_APP_SECRET
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/auth/callback

JWT_SECRET=your_jwt_secret_key_here_change_in_production

REDIS_URL=redis://localhost:6379

LOG_LEVEL=info

CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

---

### **FILE 4: Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

### **FILE 5: src/server.ts**
```typescript
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './services/database';
import authRoutes from './routes/auth';
import accountsRoutes from './routes/accounts';
import pagesRoutes from './routes/pages';
import postsRoutes from './routes/posts';
import schedulerRoutes from './routes/scheduler';
import analyticsRoutes from './routes/analytics';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    message: 'Meta Control Hub Backend is Running!'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/scheduler', schedulerRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handler Middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date()
  });
});

// Initialize Database and Start Server
const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('✅ Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
```

---

### **FILE 6: src/services/database.ts**
```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL');

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS facebook_accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        account_id VARCHAR(255) UNIQUE NOT NULL,
        account_name VARCHAR(255),
        access_token TEXT NOT NULL,
        token_expiry TIMESTAMP,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS facebook_pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        account_id UUID NOT NULL,
        page_id VARCHAR(255) UNIQUE NOT NULL,
        page_name VARCHAR(255),
        page_category VARCHAR(255),
        followers INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        timezone VARCHAR(50),
        language VARCHAR(50),
        page_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (account_id) REFERENCES facebook_accounts(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS posts_queue (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        page_id UUID NOT NULL,
        caption TEXT,
        media_url VARCHAR(255),
        media_type VARCHAR(50),
        first_comment TEXT,
        status VARCHAR(50) DEFAULT 'draft',
        scheduled_time TIMESTAMP,
        posted_time TIMESTAMP,
        error_message TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (page_id) REFERENCES facebook_pages(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS analytics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        page_id UUID NOT NULL,
        date DATE,
        followers INT,
        reached INT,
        engaged INT,
        posts_count INT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (page_id) REFERENCES facebook_pages(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS activity_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        action VARCHAR(255),
        details TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_facebook_accounts_user ON facebook_accounts(user_id);
      CREATE INDEX IF NOT EXISTS idx_facebook_pages_account ON facebook_pages(account_id);
      CREATE INDEX IF NOT EXISTS idx_posts_queue_page ON posts_queue(page_id);
      CREATE INDEX IF NOT EXISTS idx_posts_queue_status ON posts_queue(status);
      CREATE INDEX IF NOT EXISTS idx_analytics_page_date ON analytics(page_id, date);
    `);

    console.log('✅ Database tables created/verified');
    client.release();
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export const getClient = async () => {
  return pool.connect();
};

export default pool;
```

---

### **FILE 7: src/services/facebook.ts**
```typescript
import axios from 'axios';

const GRAPH_API_VERSION = 'v18.0';
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export class FacebookService {
  private appId: string;
  private appSecret: string;

  constructor() {
    this.appId = process.env.FACEBOOK_APP_ID || '';
    this.appSecret = process.env.FACEBOOK_APP_SECRET || '';

    if (!this.appId || !this.appSecret) {
      throw new Error('Facebook App ID and Secret required');
    }
  }

  // Get OAuth URL for user to authorize app
  getOAuthUrl(redirectUri: string): string {
    const scope = [
      'pages_manage_posts',
      'pages_read_engagement',
      'pages_read_user_content',
      'instagram_basic'
    ].join(',');

    return `https://www.facebook.com/${GRAPH_API_VERSION}/oauth/authorize?client_id=${this.appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
  }

  // Exchange auth code for access token
  async exchangeCodeForToken(code: string, redirectUri: string) {
    try {
      const response = await axios.get(`${BASE_URL}/oauth/access_token`, {
        params: {
          client_id: this.appId,
          client_secret: this.appSecret,
          redirect_uri: redirectUri,
          code
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`OAuth exchange failed: ${error.response?.data?.error_description || error.message}`);
    }
  }

  // Get user's connected accounts
  async getConnectedAccounts(accessToken: string) {
    try {
      const response = await axios.get(`${BASE_URL}/me/accounts`, {
        params: {
          fields: 'id,name,access_token',
          access_token: accessToken
        }
      });

      return response.data.data || [];
    } catch (error: any) {
      throw new Error(`Failed to fetch accounts: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  // Get pages for a Facebook account
  async getPages(accountId: string, accessToken: string) {
    try {
      const response = await axios.get(`${BASE_URL}/${accountId}/pages`, {
        params: {
          fields: 'id,name,category,followers_count,picture.type(large)',
          access_token: accessToken
        }
      });

      return response.data.data || [];
    } catch (error: any) {
      throw new Error(`Failed to fetch pages: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  // Publish post to page
  async publishPost(pageId: string, accessToken: string, data: {
    message?: string;
    picture?: string;
    link?: string;
    source?: string;
  }) {
    try {
      const response = await axios.post(`${BASE_URL}/${pageId}/feed`, data, {
        params: {
          access_token: accessToken
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to publish post: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  // Delete post
  async deletePost(postId: string, accessToken: string) {
    try {
      const response = await axios.delete(`${BASE_URL}/${postId}`, {
        params: {
          access_token: accessToken
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to delete post: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  // Get page insights
  async getPageInsights(pageId: string, accessToken: string) {
    try {
      const response = await axios.get(`${BASE_URL}/${pageId}/insights`, {
        params: {
          metric: 'page_fans,page_fans_online,page_engagement,page_post_engagements_by_type',
          access_token: accessToken
        }
      });

      return response.data.data || [];
    } catch (error: any) {
      throw new Error(`Failed to fetch insights: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

export default new FacebookService();
```

---

### **FILE 8: src/routes/auth.ts**
```typescript
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../services/database';
import facebookService from '../services/facebook';

const router = express.Router();

// Get OAuth URL
router.get('/oauth-url', (req: Request, res: Response) => {
  try {
    const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/callback`;
    const oauthUrl = facebookService.getOAuthUrl(redirectUri);
    
    res.json({ url: oauthUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// OAuth Callback
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'No authorization code provided' });
    }

    const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/callback`;
    
    // Exchange code for token
    const tokenData = await facebookService.exchangeCodeForToken(code as string, redirectUri);

    // Get user's Facebook accounts
    const accounts = await facebookService.getConnectedAccounts(tokenData.access_token);

    // For now, create/update user and store first account
    if (accounts.length > 0) {
      const firstAccount = accounts[0];
      const userId = uuidv4();

      // Create user
      await query(
        `INSERT INTO users (id, email, name) VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [userId, `${firstAccount.id}@facebook.com`, 'Facebook User']
      );

      // Store Facebook account
      const accountId = uuidv4();
      await query(
        `INSERT INTO facebook_accounts (id, user_id, account_id, account_name, access_token, status)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (account_id) DO UPDATE SET access_token = $5`,
        [accountId, userId, firstAccount.id, firstAccount.name, firstAccount.access_token, 'active']
      );

      // Generate JWT token
      const jwtToken = jwt.sign(
        { userId, accountId, fbAccountId: firstAccount.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(`${frontendUrl}?token=${jwtToken}&accountId=${accountId}`);
    }

    res.status(400).json({ error: 'No Facebook accounts found' });
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify Token
router.post('/verify', (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ valid: true, data: decoded });
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
```

---

### **FILE 9: src/routes/accounts.ts**
```typescript
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../services/database';
import facebookService from '../services/facebook';

const router = express.Router();

// Get all accounts for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }

    const result = await query(
      `SELECT * FROM facebook_accounts WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.json({ accounts: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single account
router.get('/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const result = await query(
      `SELECT * FROM facebook_accounts WHERE id = $1`,
      [accountId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ account: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Connect new account
router.post('/connect', async (req: Request, res: Response) => {
  try {
    const { userId, fbAccountId, accountName, accessToken } = req.body;

    if (!userId || !fbAccountId || !accessToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const accountId = uuidv4();

    await query(
      `INSERT INTO facebook_accounts (id, user_id, account_id, account_name, access_token, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [accountId, userId, fbAccountId, accountName, accessToken, 'active']
    );

    res.status(201).json({ 
      message: 'Account connected successfully',
      accountId 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update account
router.put('/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const { accountName, status } = req.body;

    await query(
      `UPDATE facebook_accounts SET account_name = COALESCE($1, account_name), 
       status = COALESCE($2, status), updated_at = NOW()
       WHERE id = $3`,
      [accountName, status, accountId]
    );

    res.json({ message: 'Account updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete account
router.delete('/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    await query(
      `DELETE FROM facebook_accounts WHERE id = $1`,
      [accountId]
    );

    res.json({ message: 'Account deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

### **FILE 10: src/routes/pages.ts**
```typescript
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../services/database';

const router = express.Router();

// Get all pages for an account
router.get('/account/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const result = await query(
      `SELECT * FROM facebook_pages WHERE account_id = $1 ORDER BY page_name ASC`,
      [accountId]
    );

    res.json({ pages: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single page
router.get('/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;

    const result = await query(
      `SELECT * FROM facebook_pages WHERE id = $1`,
      [pageId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json({ page: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add page manually
router.post('/', async (req: Request, res: Response) => {
  try {
    const { 
      accountId, 
      pageName, 
      pageId, 
      category, 
      timezone, 
      language 
    } = req.body;

    if (!accountId || !pageName || !pageId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = uuidv4();

    await query(
      `INSERT INTO facebook_pages 
       (id, account_id, page_id, page_name, page_category, timezone, language, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, accountId, pageId, pageName, category, timezone, language, 'active']
    );

    res.status(201).json({ 
      message: 'Page added successfully',
      pageId: id 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update page
router.put('/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { pageName, category, timezone, language, status } = req.body;

    await query(
      `UPDATE facebook_pages 
       SET page_name = COALESCE($1, page_name),
           page_category = COALESCE($2, page_category),
           timezone = COALESCE($3, timezone),
           language = COALESCE($4, language),
           status = COALESCE($5, status),
           updated_at = NOW()
       WHERE id = $6`,
      [pageName, category, timezone, language, status, pageId]
    );

    res.json({ message: 'Page updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete page
router.delete('/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;

    await query(
      `DELETE FROM facebook_pages WHERE id = $1`,
      [pageId]
    );

    res.json({ message: 'Page deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get page stats
router.get('/:pageId/stats', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;

    // Get page info
    const pageResult = await query(
      `SELECT * FROM facebook_pages WHERE id = $1`,
      [pageId]
    );

    if (pageResult.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Get posts stats
    const postsResult = await query(
      `SELECT 
        COUNT(*) as total_posts,
        SUM(CASE WHEN status = 'posted' THEN 1 ELSE 0 END) as posted,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled
       FROM posts_queue WHERE page_id = $1`,
      [pageId]
    );

    const stats = {
      page: pageResult.rows[0],
      posts: postsResult.rows[0]
    };

    res.json({ stats });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

### **FILE 11: src/routes/posts.ts**
```typescript
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../services/database';
import facebookService from '../services/facebook';

const router = express.Router();

// Post directly to Facebook
router.post('/direct', async (req: Request, res: Response) => {
  try {
    const { pageId, caption, mediaUrl, firstComment } = req.body;

    if (!pageId || !caption) {
      return res.status(400).json({ error: 'pageId and caption required' });
    }

    // Get page and account info
    const pageResult = await query(
      `SELECT fp.*, fa.access_token FROM facebook_pages fp
       JOIN facebook_accounts fa ON fp.account_id = fa.id
       WHERE fp.id = $1`,
      [pageId]
    );

    if (pageResult.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const { page_id: fbPageId, access_token } = pageResult.rows[0];

    // Publish to Facebook
    const postData: any = { message: caption };
    if (mediaUrl) {
      postData.picture = mediaUrl;
    }

    const fbResponse = await facebookService.publishPost(fbPageId, access_token, postData);

    // Save to database
    const id = uuidv4();
    await query(
      `INSERT INTO posts_queue 
       (id, page_id, caption, media_url, status, posted_time)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [id, pageId, caption, mediaUrl, 'posted']
    );

    res.status(201).json({ 
      message: 'Post published successfully',
      postId: fbResponse.id,
      dbId: id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Schedule post
router.post('/schedule', async (req: Request, res: Response) => {
  try {
    const { pageId, caption, mediaUrl, scheduledTime, firstComment } = req.body;

    if (!pageId || !caption || !scheduledTime) {
      return res.status(400).json({ error: 'pageId, caption, and scheduledTime required' });
    }

    const id = uuidv4();

    // Save to queue
    await query(
      `INSERT INTO posts_queue 
       (id, page_id, caption, media_url, status, scheduled_time, first_comment)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, pageId, caption, mediaUrl, 'scheduled', new Date(scheduledTime), firstComment]
    );

    res.status(201).json({ 
      message: 'Post scheduled successfully',
      postId: id,
      scheduledTime
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get queue (pending posts)
router.get('/queue/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { status } = req.query;

    let queryString = `SELECT * FROM posts_queue WHERE page_id = $1`;
    const params: any[] = [pageId];

    if (status) {
      queryString += ` AND status = $2`;
      params.push(status);
    }

    queryString += ` ORDER BY scheduled_time ASC, created_at DESC`;

    const result = await query(queryString, params);

    res.json({ posts: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post
router.get('/:postId', async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const result = await query(
      `SELECT * FROM posts_queue WHERE id = $1`,
      [postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update scheduled post
router.put('/:postId', async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { caption, scheduledTime, mediaUrl } = req.body;

    await query(
      `UPDATE posts_queue 
       SET caption = COALESCE($1, caption),
           scheduled_time = COALESCE($2, scheduled_time),
           media_url = COALESCE($3, media_url),
           updated_at = NOW()
       WHERE id = $4 AND status = 'scheduled'`,
      [caption, scheduledTime ? new Date(scheduledTime) : null, mediaUrl, postId]
    );

    res.json({ message: 'Post updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel/Delete post
router.delete('/:postId', async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const result = await query(
      `DELETE FROM posts_queue WHERE id = $1 AND status IN ('draft', 'scheduled')`,
      [postId]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: 'Cannot delete posted content' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk queue posts
router.post('/bulk-queue', async (req: Request, res: Response) => {
  try {
    const { pageId, posts } = req.body;

    if (!pageId || !Array.isArray(posts)) {
      return res.status(400).json({ error: 'pageId and posts array required' });
    }

    const queuedPosts = [];

    for (const post of posts) {
      const id = uuidv4();
      await query(
        `INSERT INTO posts_queue 
         (id, page_id, caption, media_url, status, scheduled_time, first_comment)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          id, 
          pageId, 
          post.caption, 
          post.mediaUrl, 
          'scheduled',
          post.scheduledTime ? new Date(post.scheduledTime) : null,
          post.firstComment
        ]
      );
      queuedPosts.push(id);
    }

    res.status(201).json({ 
      message: `${queuedPosts.length} posts queued successfully`,
      postIds: queuedPosts
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts for analytics
router.get('/analytics/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;

    const result = await query(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'posted' THEN 1 ELSE 0 END) as posted,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
       FROM posts_queue WHERE page_id = $1`,
      [pageId]
    );

    res.json({ stats: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

### **FILE 12: src/routes/scheduler.ts**
```typescript
import express, { Request, Response } from 'express';
import { query } from '../services/database';
import facebookService from '../services/facebook';

const router = express.Router();

// Get pending posts (ready to publish)
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT pq.*, fp.page_id, fa.access_token
       FROM posts_queue pq
       JOIN facebook_pages fp ON pq.page_id = fp.id
       JOIN facebook_accounts fa ON fp.account_id = fa.id
       WHERE pq.status = 'scheduled' 
       AND pq.scheduled_time <= NOW()
       ORDER BY pq.scheduled_time ASC
       LIMIT 50`
    );

    res.json({ pendingPosts: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Process scheduled posts (publish them)
router.post('/process', async (req: Request, res: Response) => {
  try {
    // Get due posts
    const duePosts = await query(
      `SELECT pq.*, fp.page_id, fa.access_token
       FROM posts_queue pq
       JOIN facebook_pages fp ON pq.page_id = fp.id
       JOIN facebook_accounts fa ON fp.account_id = fa.id
       WHERE pq.status = 'scheduled' 
       AND pq.scheduled_time <= NOW()
       ORDER BY pq.scheduled_time ASC
       LIMIT 10`
    );

    const published = [];
    const failed = [];

    for (const post of duePosts.rows) {
      try {
        // Publish to Facebook
        const postData: any = { message: post.caption };
        if (post.media_url) {
          postData.picture = post.media_url;
        }

        const fbResponse = await facebookService.publishPost(
          post.page_id,
          post.access_token,
          postData
        );

        // Update status to posted
        await query(
          `UPDATE posts_queue 
           SET status = 'posted', posted_time = NOW(), updated_at = NOW()
           WHERE id = $1`,
          [post.id]
        );

        published.push(post.id);
      } catch (error: any) {
        // Update status to failed
        await query(
          `UPDATE posts_queue 
           SET status = 'failed', error_message = $1, updated_at = NOW()
           WHERE id = $2`,
          [error.message, post.id]
        );

        failed.push({ postId: post.id, error: error.message });
      }
    }

    res.json({ 
      published: published.length,
      failed: failed.length,
      failedPosts: failed 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get schedule for page
router.get('/page/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { startDate, endDate } = req.query;

    let queryString = `SELECT * FROM posts_queue WHERE page_id = $1 AND status IN ('scheduled', 'draft')`;
    const params: any[] = [pageId];

    if (startDate) {
      queryString += ` AND scheduled_time >= $${params.length + 1}`;
      params.push(new Date(startDate as string));
    }

    if (endDate) {
      queryString += ` AND scheduled_time <= $${params.length + 1}`;
      params.push(new Date(endDate as string));
    }

    queryString += ` ORDER BY scheduled_time ASC`;

    const result = await query(queryString, params);

    res.json({ schedule: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get calendar data
router.get('/calendar/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { year, month } = req.query;

    let queryString = `
      SELECT 
        DATE(scheduled_time) as date,
        COUNT(*) as count,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN status = 'posted' THEN 1 ELSE 0 END) as posted,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
      FROM posts_queue 
      WHERE page_id = $1
    `;
    const params: any[] = [pageId];

    if (year && month) {
      queryString += ` AND EXTRACT(YEAR FROM scheduled_time) = $${params.length + 1}
                        AND EXTRACT(MONTH FROM scheduled_time) = $${params.length + 2}`;
      params.push(parseInt(year as string), parseInt(month as string));
    }

    queryString += ` GROUP BY DATE(scheduled_time) ORDER BY date ASC`;

    const result = await query(queryString, params);

    res.json({ calendarData: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get queue stats
router.get('/stats/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;

    const result = await query(
      `SELECT 
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'posted' THEN 1 ELSE 0 END) as posted,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
       FROM posts_queue WHERE page_id = $1`,
      [pageId]
    );

    res.json({ stats: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

### **FILE 13: src/routes/analytics.ts**
```typescript
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../services/database';

const router = express.Router();

// Get page analytics
router.get('/page/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { days = 30 } = req.query;

    const result = await query(
      `SELECT * FROM analytics 
       WHERE page_id = $1 AND date >= CURRENT_DATE - INTERVAL '${days} days'
       ORDER BY date DESC`,
      [pageId]
    );

    res.json({ analytics: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get page summary
router.get('/summary/:pageId', async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;

    // Get page info
    const pageResult = await query(
      `SELECT * FROM facebook_pages WHERE id = $1`,
      [pageId]
    );

    if (pageResult.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const page = pageResult.rows[0];

    // Get posts statistics
    const postsResult = await query(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'posted' THEN 1 ELSE 0 END) as posted,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
       FROM posts_queue WHERE page_id = $1`,
      [pageId]
    );

    // Get recent analytics
    const analyticsResult = await query(
      `SELECT * FROM analytics 
       WHERE page_id = $1 
       ORDER BY date DESC LIMIT 30`,
      [pageId]
    );

    const summary = {
      page: page,
      posts: postsResult.rows[0],
      recentAnalytics: analyticsResult.rows
    };

    res.json({ summary });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Store analytics snapshot
router.post('/snapshot', async (req: Request, res: Response) => {
  try {
    const { pageId, followers, reached, engaged } = req.body;

    if (!pageId) {
      return res.status(400).json({ error: 'pageId required' });
    }

    const id = uuidv4();

    await query(
      `INSERT INTO analytics 
       (id, page_id, date, followers, reached, engaged)
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5)`,
      [id, pageId, followers, reached, engaged]
    );

    res.status(201).json({ 
      message: 'Analytics snapshot saved',
      id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

## ✅ FRONTEND (meta-control-hub-frontend)

**24 files - Same process!**

*Will send in next message due to length*

---

## 🚀 HOW TO USE THIS GUIDE:

1. **READ THIS COMPLETELY**
2. **Create GitHub repos:**
   - `meta-control-hub-backend`
   - `meta-control-hub-frontend`
3. **Copy-paste each file into GitHub Web Editor**
4. **Press `.` on GitHub repo → VS Code in browser opens**
5. **Create folder structure + add files**
6. **Commit all files**
7. **Deploy on Railway + Vercel**

---

**BILAL, AB YEH PADHLE! PHIR KHUD CREATE KARDA!**

Jab complete hojaye → Tell me ✅
