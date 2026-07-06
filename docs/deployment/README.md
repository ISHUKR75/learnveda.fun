# LearnVeda — Deployment Guide

## Option 1: Vercel (Recommended)

The fastest way to deploy LearnVeda.

### Steps

1. **Fork** the LearnVeda repository on GitHub

2. **Import** the project on [vercel.com/new](https://vercel.com/new)
   - Root Directory: `apps/web`
   - Framework: Next.js (auto-detected)

3. **Set environment variables** in the Vercel dashboard:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   MONGODB_URI=mongodb+srv://...
   SESSION_SECRET=<generate with: openssl rand -base64 32>
   REDIS_URL=rediss://...
   ```

4. **Deploy** — Vercel handles the rest automatically.

### Custom Domain
1. Add your domain in Vercel → Project → Domains
2. Add a CNAME record pointing to `cname.vercel-dns.com`

---

## Option 2: Docker

### Development
```bash
# Start all services (MongoDB, Redis, Next.js)
docker compose -f docker/docker-compose.yml up

# Access the app at http://localhost:3000
# MongoDB admin at http://localhost:8081
```

### Production
```bash
# Build the production image
docker build -f docker/Dockerfile -t learnveda:latest .

# Run the container
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://..." \
  -e CLERK_SECRET_KEY="sk_live_..." \
  -e SESSION_SECRET="your-secret" \
  --name learnveda \
  learnveda:latest
```

---

## Option 3: VPS (DigitalOcean, AWS, etc.)

### Requirements
- Ubuntu 22.04+
- Node.js 20
- MongoDB 7.0 (or MongoDB Atlas)
- Redis 7.0
- Nginx (reverse proxy)
- PM2 (process manager)

### Steps

1. **Install dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
   sudo apt install -y nodejs nginx
   npm install -g pm2
   ```

2. **Clone and build**
   ```bash
   git clone https://github.com/ISHUKR75/LearnVeda.git
   cd LearnVeda/apps/web
   npm ci
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name learnveda -- run start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```nginx
   server {
     listen 80;
     server_name learnveda.in www.learnveda.in;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

5. **SSL with Certbot**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d learnveda.in -d www.learnveda.in
   ```

---

## Environment Variables Reference

See [../../apps/web/.env.example](../../apps/web/.env.example) for the complete list.

| Variable | Required | Where to Get |
|----------|----------|--------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | [clerk.com](https://clerk.com) |
| `CLERK_SECRET_KEY` | ✅ | [clerk.com](https://clerk.com) |
| `MONGODB_URI` | ✅ | [mongodb.com/atlas](https://mongodb.com/atlas) |
| `SESSION_SECRET` | ✅ | `openssl rand -base64 32` |
| `REDIS_URL` | ⬜ | [upstash.com](https://upstash.com) (free tier) |
| `OPENAI_API_KEY` | ⬜ | [platform.openai.com](https://platform.openai.com) |
| `RESEND_API_KEY` | ⬜ | [resend.com](https://resend.com) |
| `JUDGE0_API_KEY` | ⬜ | [rapidapi.com/judge0](https://rapidapi.com) |
