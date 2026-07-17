#!/bin/bash
# 🎵 ராக வானம் — Vercel Deployment Script
# Run this on your local machine after cloning/downloading the project

set -e

echo "🎵 ராக வானம் — Vercel Deployment"
echo "=================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

# Login to Vercel (if not already)
echo "🔐 Checking Vercel authentication..."
vercel whoami 2>/dev/null || {
    echo ""
    echo "📋 Please log in to Vercel:"
    vercel login
}

# Deploy
echo ""
echo "🚀 Deploying to Vercel..."
echo ""
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎶 Your Tamil music streaming site is live!"
echo "   இசை கேட்போம், இசை படைப்போம் 🎵"
