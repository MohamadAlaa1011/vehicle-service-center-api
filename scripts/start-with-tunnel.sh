#!/bin/bash

echo "🚀 Starting Vehicle Service Center API with Cloudflare Tunnel..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if NestJS app is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use. Please stop the existing process first.${NC}"
    echo "To find and kill the process: lsof -ti:3000 | xargs kill -9"
    exit 1
fi

# Start NestJS application in background
echo -e "${BLUE}🔧 Starting NestJS application...${NC}"
cd "$(dirname "$0")/.."
npm run start:dev > logs/nestjs.log 2>&1 &
NEST_PID=$!

# Wait for NestJS to start
echo -e "${BLUE}⏳ Waiting for NestJS to start up...${NC}"
sleep 5

# Check if NestJS is running
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}❌ Failed to start NestJS application. Check logs/nestjs.log${NC}"
    exit 1
fi

echo -e "${GREEN}✅ NestJS application started successfully!${NC}"
echo -e "${BLUE}📱 Local API: http://localhost:3000${NC}"
echo -e "${BLUE}📚 Local Swagger: http://localhost:3000/api/docs${NC}"

# Start Cloudflare Tunnel
echo -e "${BLUE}🌐 Starting Cloudflare Tunnel...${NC}"
cloudflared tunnel --url http://localhost:3000 &
TUNNEL_PID=$!

echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📊 Services Running:${NC}"
echo -e "  • NestJS API (PID: $NEST_PID): http://localhost:3000"
echo -e "  • Cloudflare Tunnel (PID: $TUNNEL_PID): Check output above for public URL"
echo ""
echo -e "${BLUE}📚 Swagger Documentation:${NC}"
echo -e "  • Local: http://localhost:3000/api/docs"
echo -e "  • Public: [Your tunnel URL]/api/docs"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "  • Press Ctrl+C to stop both services"
echo -e "  • Check logs/nestjs.log for application logs"
echo -e "  • The public URL will be shown in the tunnel output above"
echo ""

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down services...${NC}"
    kill $NEST_PID $TUNNEL_PID 2>/dev/null
    echo -e "${GREEN}✅ Services stopped${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for user to stop
echo -e "${BLUE}🔄 Services running... Press Ctrl+C to stop${NC}"
wait