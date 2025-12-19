#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
yarn install --frozen-lockfile

# Build the application
echo "🔨 Building application..."
yarn build

# Restart PM2 with zero downtime
echo "♻️  Restarting application..."
pm2 reload ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

echo "✅ Deployment completed successfully!"
