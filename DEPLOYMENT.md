# 🚀 Deploying Vehicle Service Center API to Render

## Quick Deploy to Render

### Option 1: One-Click Deploy (Recommended)

1. **Fork this repository** to your GitHub account
2. **Go to [Render Dashboard](https://dashboard.render.com/)**
3. **Click "New +" → "Blueprint"**
4. **Connect your GitHub repository**
5. **Render will automatically detect `render.yaml` and deploy both:**
   - PostgreSQL Database
   - NestJS Web Service

### Option 2: Manual Setup

#### Step 1: Create PostgreSQL Database
1. Go to Render Dashboard → "New +" → "PostgreSQL"
2. Name: `vehicle-service-db`
3. Database Name: `vehicle_service_center`
4. Plan: Free
5. Click "Create Database"

#### Step 2: Create Web Service
1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `vehicle-service-center-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free

#### Step 3: Set Environment Variables
Add these in the Render Web Service environment variables:

```bash
NODE_ENV=production
DATABASE_URL=[Auto-filled from database connection]
JWT_SECRET=[Generate random 32+ character string]
JWT_REFRESH_SECRET=[Generate another random 32+ character string]
```

## 📋 Post-Deployment Setup

### 1. Database Initialization
After deployment, run database migrations and seed data:

```bash
# SSH into your Render instance or use Render Shell
npm run migration:run
npm run seed
```

### 2. Access Your API
- **API Base URL**: `https://your-service-name.onrender.com`
- **Swagger Documentation**: `https://your-service-name.onrender.com/api/docs`
- **Health Check**: `https://your-service-name.onrender.com/health`

### 3. Test Your Deployment
```bash
# Test health endpoint
curl https://your-service-name.onrender.com/health

# Test API info
curl https://your-service-name.onrender.com/api/v1

# Access Swagger UI in browser
https://your-service-name.onrender.com/api/docs
```

## 🔧 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `production` |
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host:port/db` |
| `JWT_SECRET` | JWT signing secret | Yes | `your-super-secret-jwt-key-32-chars` |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes | `your-refresh-secret-key-32-chars` |
| `PORT` | Server port | No | `3000` (auto-set by Render) |

## 📊 Production Features

### ✅ Enabled in Production:
- **Swagger API Documentation** - Full interactive docs at `/api/docs`
- **Health Checks** - Monitor service status at `/health`
- **Rate Limiting** - Prevents API abuse (100 req/min)
- **Security Headers** - Helmet.js security middleware
- **CORS** - Cross-origin request handling
- **Input Validation** - All endpoints validated with class-validator
- **Error Handling** - Structured error responses
- **Database SSL** - Secure database connections
- **Auto-scaling** - Render handles traffic scaling

### 🛡️ Security Features:
- JWT Authentication with refresh tokens
- Role-based access control (RBAC)
- Password hashing with bcrypt
- SQL injection prevention (TypeORM)
- Input sanitization and validation

## 🚀 Custom Domain Setup

1. Go to your Render service settings
2. Click "Custom Domains"
3. Add your domain (e.g., `api.yourcompany.com`)
4. Update DNS settings as instructed
5. SSL certificate auto-provisioned

## 📈 Monitoring & Logs

- **Live Logs**: Available in Render dashboard
- **Metrics**: CPU, Memory, Response times
- **Health Checks**: Automatic service monitoring
- **Alerts**: Configure notifications for issues

## 🔄 Continuous Deployment

Render automatically deploys when you push to your connected branch:
1. Push code to GitHub
2. Render detects changes
3. Builds and deploys automatically
4. Zero-downtime deployments

## 💡 Tips for Production

1. **Database Backups**: Render Free tier has limited backup retention
2. **Environment Secrets**: Use Render's secret management
3. **Monitoring**: Set up health check alerts
4. **Scaling**: Upgrade plan for auto-scaling features
5. **CDN**: Consider adding Cloudflare for static assets

## 🆘 Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node.js version compatibility
2. **Database Connection**: Verify DATABASE_URL format
3. **Memory Issues**: Free tier has 512MB limit
4. **Cold Starts**: Free tier sleeps after 15min inactivity

### Debug Commands:
```bash
# Check logs
render logs --service your-service-name

# Check environment variables
render env list --service your-service-name

# Restart service
render restart --service your-service-name
```

---

## 🎉 Success!

Once deployed, your Vehicle Service Center API will be available with:
- ✅ Full Swagger documentation at `/api/docs`
- ✅ Production-ready PostgreSQL database
- ✅ Secure JWT authentication
- ✅ Complete CRUD operations
- ✅ Real-time inventory management
- ✅ Dashboard analytics
- ✅ Professional API documentation

**Your API is now live and ready for production use!** 🚀