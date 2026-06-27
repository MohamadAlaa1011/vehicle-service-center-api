# Deploy to Bonto (Free) with Swagger

This guide deploys your **NestJS API + Swagger** on [Bonto](https://bonto.dev) with a free **Neon PostgreSQL** database.

**Cost:** $0 · **Credit card:** Not required

---

## What you get

| URL | Example |
|-----|---------|
| **Swagger docs** | `https://vehicle-service-center.bonto.run/api/docs` |
| **API base** | `https://vehicle-service-center.bonto.run/api/v1` |
| **Health check** | `https://vehicle-service-center.bonto.run/health` |

---

## Step 1: Create free PostgreSQL on Neon

Bonto does **not** include a database. Use Neon (free, no card):

1. Go to **[neon.tech](https://neon.tech)** and sign up (free)
2. Click **New Project**
3. Name: `vehicle-service-center`
4. Copy the **connection string** (looks like):
   ```
   postgresql://user:password@ep-xxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
5. Save it — this is your `DATABASE_URL`

---

## Step 2: Create Bonto account

1. Go to **[bonto.dev](https://bonto.dev)**
2. Click **Create Your Free Account** (no credit card)
3. Sign up with email or GitHub

---

## Step 3: Deploy from GitHub

1. In Bonto dashboard, click **New App** or **Create Project**
2. Choose **Import from GitHub** (or Git push)
3. Select repository:
   ```
   MohamadAlaa1011/vehicle-service-center-api
   ```
4. App name: `vehicle-service-center`
5. Node version: **20**
6. Bonto auto-detects `package.json` and runs:
   - `npm install`
   - `npm start` (builds then runs the API)

---

## Step 4: Set environment variables

In your Bonto app → **Settings** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `development` |
| `DATABASE_URL` | *(paste Neon connection string)* |
| `JWT_SECRET` | `dev-jwt-secret-key-123` |
| `JWT_REFRESH_SECRET` | `dev-refresh-secret-456` |
| `APP_URL` | `https://vehicle-service-center.bonto.run` |

> **Important:** Replace `vehicle-service-center` with your actual Bonto subdomain.
> `APP_URL` makes Swagger show the correct public server URL.

---

## Step 5: Deploy and wait

1. Click **Deploy** / **Restart**
2. Wait 2–5 minutes for build (NestJS compile takes time on free tier)
3. Open logs in Bonto **Console** tab — look for:
   ```
   🚀 Vehicle Service Center API is running on: ...
   📚 Swagger documentation available at: .../api/docs
   ```

---

## Step 6: Seed the database (first time only)

After the app is running, open Bonto **Terminal** and run:

```bash
npm run seed
```

This creates sample users and data.

**Demo login:**
- Email: `admin@vehicleservice.com`
- Password: `Password@123`

---

## Step 7: Open Swagger

Visit:
```
https://YOUR-APP-NAME.bonto.run/api/docs
```

In Swagger:
1. Click **POST /auth/login**
2. Try it out with admin credentials
3. Copy the `accessToken`
4. Click **Authorize** (top right) → paste token
5. Test any endpoint

---

## Troubleshooting

### App won't start / database error
- Check `DATABASE_URL` is correct from Neon
- Ensure Neon project is active (not paused)
- Set `NODE_ENV=development` so tables auto-create on first run

### Swagger shows wrong URL
- Set `APP_URL` to your exact Bonto URL (no trailing slash)
- Restart the app

### Build fails on Bonto
- Check **Console** logs for TypeScript errors
- Ensure Node version is **20**

### App sleeps after 30 minutes
- Free tier auto-sleeps — first visit wakes it (may take 10–30 seconds)
- This is normal on Bonto free tier

### Out of hours (50 hrs/month)
- App pauses until next billing period
- Upgrade or use Cloudflare Tunnel for unlimited local dev

---

## Quick reference

```bash
# Local test before deploy
npm run build
npm run start:prod

# Seed remote DB (from Bonto terminal)
npm run seed
```

**GitHub repo:** https://github.com/MohamadAlaa1011/vehicle-service-center-api
