# Setting Up Permanent Cloudflare Tunnel

## Prerequisites
- Cloudflare account (free)
- Domain name (optional, can use Cloudflare's subdomain)

## Steps

### 1. Install and Authenticate
```bash
# Install cloudflared (if not already installed)
brew install cloudflared

# Authenticate with Cloudflare
cloudflared tunnel login
```

### 2. Create Named Tunnel
```bash
# Create a permanent tunnel
cloudflared tunnel create vehicle-service-center

# This will create a tunnel with a permanent ID
```

### 3. Configure the Tunnel
Create `~/.cloudflared/config.yml`:
```yaml
tunnel: vehicle-service-center
credentials-file: /Users/[username]/.cloudflared/[tunnel-id].json

ingress:
  - hostname: your-api.your-domain.com  # or use Cloudflare subdomain
    service: http://localhost:3000
  - service: http_status:404
```

### 4. Create DNS Record
```bash
# Point your domain to the tunnel
cloudflared tunnel route dns vehicle-service-center your-api.your-domain.com
```

### 5. Run Permanently
```bash
# Install as system service (runs even when laptop is closed)
sudo cloudflared service install

# Or run manually
cloudflared tunnel run vehicle-service-center
```

### Result
- **Permanent URL**: `https://your-api.your-domain.com/api/docs`
- **Always Available**: Works even when your laptop is closed
- **Custom Domain**: Professional looking URL