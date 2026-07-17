# 🚀 Deploy ராக வானம் to Vercel

## Method 1: Fastest — Vercel CLI (Recommended)

### Prerequisites
- Node.js 20+ installed
- A [Vercel account](https://vercel.com/signup) (free)

### Steps

```bash
# 1. Download/copy the raga-vaanam folder to your computer

# 2. Open terminal and navigate to the project
cd raga-vaanam

# 3. Install dependencies
npm install

# 4. Test locally (optional)
npm run dev
# Open http://localhost:3000 — you should see the homepage with Tamil sections!

# 5. Deploy to Vercel
npx vercel --prod
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Choose your account
- **Link to existing project?** → No
- **Project name?** → `raga-vaanam` (or any name)
- **Directory?** → `./ ` (press Enter)
- **Override settings?** → No

That's it! You'll get a URL like `https://raga-vaanam.vercel.app` 🎉

---

## Method 2: GitHub + Vercel Dashboard

### Steps

1. **Create a GitHub repository**
   ```bash
   cd raga-vaanam
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/raga-vaanam.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"**
   - Select `raga-vaanam` from your repos
   - Framework Preset: **Next.js** (auto-detected)
   - Environment Variables: Add `NEXT_PUBLIC_JIOSAAVN_URL` = `https://saavn.dev/api`
   - Click **Deploy**

3. Wait ~2 minutes → your site is live! 🎉

---

## Method 3: Run the deploy script

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## ✅ Verify Deployment

After deployment, visit your Vercel URL and check:

- [ ] Homepage loads with Tamil sections
- [ ] Song cards show album art
- [ ] Click a song → it plays in the bottom player
- [ ] Search page works (try "Anirudh")
- [ ] Mobile view looks good (resize browser)

---

## 🔄 Updating Your Site

```bash
# Make changes, then:
git add .
git commit -m "your changes"
vercel --prod
# Or just push to GitHub if using Method 2 (auto-deploys)
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Build failed" | Run `npm run build` locally first to check for errors |
| "No songs showing" | The JioSaavn API might be temporarily down — wait and refresh |
| "Audio not playing" | Browser autoplay policy — user must interact first (click play) |
| Vercel deploy timeout | Run `vercel --prod --build-env NODE_ENV=production` |
| Images not loading | Check `next.config.js` image remote patterns |

---

## 📝 Environment Variables

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_JIOSAAVN_URL` | `https://saavn.dev/api` | ✅ Yes |
| `NEXT_PUBLIC_GAANAPY_URL` | _(your self-hosted URL)_ | ❌ Phase 2 |
| `NEXT_PUBLIC_YTMUSIC_URL` | _(your self-hosted URL)_ | ❌ Phase 2 |
