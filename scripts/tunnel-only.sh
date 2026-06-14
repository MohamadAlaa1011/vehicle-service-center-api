#!/bin/bash

# Simple script to create a quick tunnel for an already running application
echo "🌐 Creating Cloudflare Tunnel for http://localhost:3000..."
echo ""
echo "📚 Once the tunnel starts, your Swagger docs will be available at:"
echo "   [Your tunnel URL]/api/docs"
echo ""
echo "Press Ctrl+C to stop the tunnel"
echo ""

cloudflared tunnel --url http://localhost:3000