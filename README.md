# ராக வானம் (Raga Vaanam)

> **Tamil Music Streaming** — Your personal Tamil music experience 🎶

A modern, beautifully designed Tamil-first music streaming web app built with Next.js, powered by the JioSaavn API. Features a Tamil-focused homepage with curated sections for trending Tamil songs, popular artists, film music, melody, kuthu, devotional, and more.

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React%2019-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-06B6D4?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

## ✨ Features

- 🏠 **Tamil-First Homepage** — Trending, New Releases, Anirudh, A.R. Rahman, Melody, Kuthu, 90s Hits, Devotional sections
- 🎤 **Popular Tamil Artists** — Quick access to top artists (A.R. Rahman, Anirudh, Yuvan, Harris Jayaraj, etc.)
- 🎵 **Full Music Player** — Play/pause, seek, volume, shuffle, repeat, queue
- 🔍 **Smart Search** — Debounced search with songs, albums, and artists
- 📚 **Personal Library** — Liked songs + recently played (localStorage)
- 📱 **Responsive Design** — Desktop sidebar + mobile bottom navigation
- 🎨 **Tamil-Inspired Theme** — Dark theme with accent colors and Tamil typography
- 🇮🇳 **Bilingual UI** — Tamil (தமிழ்) + English labels throughout
- ⚡ **Fast** — ISR with 5-min revalidation, optimized images

## 🚀 Quick Deploy

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/raga-vaanam&env=NEXT_PUBLIC_JIOSAAVN_URL&envDescription=JioSaavn%20API%20URL&envDefault=https://saavn.dev/api)

### Manual Deploy

```bash
# 1. Clone
git clone <your-repo-url>
cd raga-vaanam

# 2. Install
npm install

# 3. Create .env.local
echo "NEXT_PUBLIC_JIOSAAVN_URL=https://saavn.dev/api" > .env.local

# 4. Run locally
npm run dev

# 5. Deploy to Vercel
npx vercel --prod
```

## 🛠️ Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎵 Music Source

This app uses the **JioSaavn API** ([saavn.dev](https://saavn.dev)) for music streaming data. It's an unofficial educational wrapper — not affiliated with JioSaavn.

### Planned Sources (Phase 2+)
- **GaanaPy** — [GitHub](https://github.com/ZingyTomato/GaanaPy) — Tamil trending/new releases
- **ytmusicapi** — [GitHub](https://github.com/sigma67/ytmusicapi) — YouTube Music fallback + lyrics

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── page.jsx              # Homepage (Tamil sections)
│   ├── layout.js             # Root layout (sidebar + player)
│   ├── globals.css           # Tamil-inspired theme
│   ├── search/               # Search page
│   ├── library/              # Liked songs + recent
│   └── api/                  # API proxy routes
│       ├── search/
│       ├── home/
│       └── song/[id]/
├── components/
│   ├── layout/               # Sidebar, mobile nav
│   └── music/                # Player, carousels, cards
├── contexts/
│   └── music-player-context.jsx  # Global audio state
└── lib/
    ├── constants.js          # Tamil artists, sections
    ├── jiosaavn.js           # API client
    └── utils.js              # Helpers
```

## 🎨 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_JIOSAAVN_URL` | `https://saavn.dev/api` | JioSaavn API base URL |
| `NEXT_PUBLIC_GAANAPY_URL` | _(empty)_ | GaanaPy URL (Phase 2) |
| `NEXT_PUBLIC_YTMUSIC_URL` | _(empty)_ | YTMusic URL (Phase 2) |

## 📜 License

Educational project. Music data from JioSaavn (unofficial, non-commercial use).

---

*"இசை கேட்போம், இசை படைப்போம்"* — Let's listen to music, let's create music 🎶
