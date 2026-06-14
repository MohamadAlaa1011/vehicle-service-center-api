# 🌐 Deploying NestJS Swagger API with Cloudflare Tunnel

## 🚀 **Quick Start (Recommended)**

### **Option 1: One-Command Setup**
```bash
# Start NestJS + Cloudflare Tunnel together
npm run dev:tunnel
```

### **Option 2: Manual Setup**
```bash
# Terminal 1: Start your NestJS application
npm run start:dev

# Terminal 2: Start Cloudflare Tunnel
npm run tunnel
# OR directly: cloudflared tunnel --url http://localhost:3000
```

---

## 📋 **What You Get:**

✅ **Free Public URL** - No cost, no account required  
✅ **HTTPS by Default** - Automatic SSL certificate  
✅ **Global CDN** - Cloudflare's worldwide network  
✅ **Full Swagger Documentation** - Accessible from anywhere  
✅ **No Port Forwarding** - Works behind NAT/firewall  
✅ **Temporary URLs** - Perfect for testing and demos  

---

## 🎯 **Step-by-Step Instructions:**

### **1. Ensure Your App is Running**
```bash
# Start your NestJS application
npm run start:dev

# Verify it's working locally
curl http://localhost:3000/health
open http://localhost:3000/api/docs
```

### **2. Start Cloudflare Tunnel**
```bash
# Quick tunnel (generates random URL)
cloudflared tunnel --url http://localhost:3000

# OR use the script
npm run tunnel
```

### **3. Get Your Public URL**
After running the tunnel command, you'll see output like:
```
2026-06-12T18:30:00Z INF Thank you for trying Cloudflare Tunnel. Attendant at your service
2026-06-12T18:30:01Z INF Request Tunnel UUID
2026-06-12T18:30:02Z INF Each argo tunnel client will pick a single endpoint. 
2026-06-12T18:30:02Z INF Updated connector configuration file
2026-06-12T18:30:02Z INF HTTPS://random-subdomain-123.trycloudflare.com
2026-06-12T18:30:02Z INF Registered tunnel connection tunnel-uuid
```

**Your public URL**: `https://random-subdomain-123.trycloudflare.com`

### **4. Access Your Swagger Documentation**
- **📚 Swagger UI**: `https://your-tunnel-url.trycloudflare.com/api/docs`  
- **🔍 API Base**: `https://your-tunnel-url.trycloudflare.com/api/v1`  
- **❤️ Health Check**: `https://your-tunnel-url.trycloudflare.com/health`  

---

## 🛠️ **Advanced Configuration**

### **Named Tunnels (Persistent URLs)**

For permanent URLs, create a named tunnel:

```bash
# 1. Authenticate with Cloudflare (free account required)
cloudflared login

# 2. Create a named tunnel
cloudflared tunnel create vehicle-service-api

# 3. Configure the tunnel
# Edit ~/.cloudflared/config.yml:
```

```yaml
tunnel: vehicle-service-api
credentials-file: ~/.cloudflared/[tunnel-id].json

ingress:
  - hostname: api.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

```bash
# 4. Start named tunnel
cloudflared tunnel run vehicle-service-api
```

### **Custom Domain Setup**

1. **Add your domain to Cloudflare**
2. **Create DNS record**: `api.yourdomain.com CNAME tunnel-id.cfargotunnel.com`
3. **Update tunnel config** with your hostname
4. **Start tunnel**: Domain will work automatically with HTTPS

---

## 🌟 **Features & Benefits:**

### **🔒 Security Features:**
- ✅ **Automatic HTTPS** - SSL/TLS encryption
- ✅ **No Exposed Ports** - No firewall configuration needed
- ✅ **DDoS Protection** - Cloudflare's security layer
- ✅ **Rate Limiting** - Built into your NestJS app
- ✅ **JWT Authentication** - Your API security intact

### **🚀 Performance Features:**
- ✅ **Global CDN** - Low latency worldwide
- ✅ **HTTP/2 & HTTP/3** - Modern protocols
- ✅ **Compression** - Automatic content compression
- ✅ **Caching** - Static assets cached globally

### **🔧 Developer Features:**
- ✅ **Live Reload** - Works with `npm run start:dev`
- ✅ **Real-time Updates** - Code changes reflect instantly
- ✅ **No Configuration** - Zero-config quick tunnels
- ✅ **Multiple Environments** - Different tunnels per branch

---

## 📱 **Testing Your Public API:**

### **Test with cURL:**
```bash
# Replace YOUR_TUNNEL_URL with your actual tunnel URL
TUNNEL_URL="https://random-subdomain-123.trycloudflare.com"

# Test health endpoint
curl $TUNNEL_URL/health

# Test API info
curl $TUNNEL_URL/api/v1

# Test authentication
curl -X POST $TUNNEL_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vehicleservice.com","password":"Password@123"}'
```

### **Test with Browser:**
- **Interactive Swagger**: `https://your-tunnel-url.trycloudflare.com/api/docs`
- **Try API endpoints directly in browser**
- **Share with team members for testing**

---

## 🎨 **Use Cases:**

### **✅ Perfect for:**
- **API Demos** - Show clients your API instantly
- **Mobile App Testing** - Test against real HTTPS endpoints  
- **Team Collaboration** - Share API with team members
- **CI/CD Integration** - Temporary testing environments
- **Client Previews** - Let clients test before deployment
- **Development Testing** - Test webhooks and integrations

### **⚠️ Not Recommended for:**
- **Production Services** - Use proper hosting for production
- **Sensitive Data** - Free tunnels are temporary
- **High Availability** - Tunnels can disconnect
- **Long-term URLs** - Quick tunnels change on restart

---

## 🛡️ **Security Considerations:**

### **✅ Safe Practices:**
- **Use for development/testing only**
- **Keep your JWT secrets secure**
- **Don't expose sensitive data**
- **Monitor tunnel logs for suspicious activity**
- **Use named tunnels for persistent access**

### **🔐 Your API Security is Preserved:**
- JWT authentication still required
- Role-based access control active
- Input validation enforced
- Rate limiting operational

---

## 🔄 **Workflow Examples:**

### **Development Workflow:**
```bash
# 1. Start development with live reload + tunnel
npm run dev:tunnel

# 2. Share URL with team: https://abc-123.trycloudflare.com/api/docs

# 3. Team tests API directly via Swagger UI

# 4. Make code changes - they appear instantly on public URL

# 5. Stop with Ctrl+C when done
```

### **Demo Workflow:**
```bash
# 1. Ensure app is seeded with demo data
npm run db:reset

# 2. Start tunnel
npm run tunnel

# 3. Share Swagger URL with client
# https://xyz-456.trycloudflare.com/api/docs

# 4. Walk through API features live
```

---

## ❓ **Troubleshooting:**

### **Common Issues:**

**Q: Tunnel URL not working?**
```bash
# Check if NestJS is running on port 3000
lsof -i :3000
curl http://localhost:3000/health
```

**Q: Can't access Swagger docs?**
```bash
# Verify Swagger is enabled (should see output in logs)
# Check: https://your-tunnel-url.trycloudflare.com/api/docs
```

**Q: Authentication not working?**
```bash
# JWT auth still required - get token first:
curl -X POST https://your-tunnel-url.trycloudflare.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vehicleservice.com","password":"Password@123"}'
```

**Q: Tunnel keeps disconnecting?**
- Free tunnels may disconnect after inactivity
- Use named tunnels for stability
- Restart tunnel if needed

### **Debug Commands:**
```bash
# Check tunnel status
cloudflared tunnel list

# View tunnel logs with more detail
cloudflared tunnel --url http://localhost:3000 --loglevel debug

# Check what's running on port 3000
lsof -i :3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 🎉 **Success Checklist:**

- [ ] ✅ **NestJS app running**: `http://localhost:3000/health` responds
- [ ] ✅ **Swagger accessible locally**: `http://localhost:3000/api/docs` loads  
- [ ] ✅ **Tunnel created**: Public HTTPS URL generated
- [ ] ✅ **Public Swagger works**: `https://tunnel-url.trycloudflare.com/api/docs`
- [ ] ✅ **Authentication works**: Can login via public URL
- [ ] ✅ **Database connected**: API endpoints return data
- [ ] ✅ **Real-time updates**: Code changes reflect on public URL

---

## 🚀 **Ready to Share!**

Your **Vehicle Service Center API** is now:
- ✅ **Publicly accessible** with HTTPS
- ✅ **Fully documented** via Swagger UI  
- ✅ **Professionally presented** for demos
- ✅ **Team-ready** for collaboration
- ✅ **Client-ready** for feedback

**Share your Swagger URL**: `https://your-tunnel-url.trycloudflare.com/api/docs` 🎊