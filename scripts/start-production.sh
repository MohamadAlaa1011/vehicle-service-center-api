#!/bin/bash

echo "🚀 Starting Vehicle Service Center API in Production..."

# Wait for database to be ready
echo "⏳ Waiting for database connection..."
until node -e "
const { DataSource } = require('typeorm');
const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
};
new DataSource(config).initialize()
  .then(() => { console.log('✅ Database connected'); process.exit(0); })
  .catch(() => { console.log('❌ Database not ready, retrying...'); process.exit(1); });
" 2>/dev/null; do
  echo "🔄 Retrying database connection in 2 seconds..."
  sleep 2
done

echo "🗃️ Running database migrations..."
# Note: Migrations should be handled separately in production
# This is just for initial setup

echo "🌱 Starting application..."
node dist/main.js