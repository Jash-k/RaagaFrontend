// API Base URLs
// Use local proxy to avoid CORS issues (routes through Next.js API routes)
export const JIOSAAVN_API = process.env.NEXT_PUBLIC_JIOSAAVN_URL || "/api/jiosaavn";
export const GAANAPY_URL = process.env.NEXT_PUBLIC_GAANAPY_URL || "";
export const YTMUSIC_URL = process.env.NEXT_PUBLIC_YTMUSIC_URL || "";

// Tamil Artists (seeded for homepage)
export const TAMIL_ARTISTS = [
  { name: "A.R. Rahman", id: "456276", image: null },
  { name: "Anirudh Ravichander", id: "706968", image: null },
  { name: "Yuvan Shankar Raja", id: "455131", image: null },
  { name: "Harris Jayaraj", id: "455132", image: null },
  { name: "D. Imman", id: "672769", image: null },
  { name: "G.V. Prakash Kumar", id: "679518", image: null },
  { name: "Santhosh Narayanan", id: "828959", image: null },
  { name: "Thaman S", id: "702452", image: null },
  { name: "Sid Sriram", id: "883092", image: null },
  { name: "Sean Roldan", id: "881993", image: null },
  { name: "Dhibu Ninan Thomas", id: "1088022", image: null },
  { name: "Sam C.S.", id: "1058956", image: null },
];

// Homepage Sections Configuration
export const HOMEPAGE_SECTIONS = [
  {
    id: "trending-tamil",
    title: "Trending Tamil",
    titleTa: "டிரெண்டிங் தமிழ்",
    type: "songs",
    query: "tamil trending",
    icon: "🔥",
  },
  {
    id: "new-releases",
    title: "New Tamil Releases",
    titleTa: "புதிய வெளியீடுகள்",
    type: "albums",
    query: "tamil new",
    icon: "🆕",
  },
  {
    id: "anirudh-hits",
    title: "Anirudh Hits",
    titleTa: "அனிருத் ஹிட்ஸ்",
    type: "songs",
    query: "anirudh ravichander tamil",
    icon: "🎹",
  },
  {
    id: "arrahman-classics",
    title: "A.R. Rahman Classics",
    titleTa: "ரஹ்மான் கிளாசிக்ஸ்",
    type: "songs",
    query: "ar rahman tamil hits",
    icon: "🎼",
  },
  {
    id: "tamil-melody",
    title: "Tamil Melody",
    titleTa: "தமிழ் மெலடி",
    type: "songs",
    query: "tamil melody songs",
    icon: "💜",
  },
  {
    id: "tamil-dance",
    title: "Tamil Dance & Kuthu",
    titleTa: "தமிழ் டான்ஸ்",
    type: "songs",
    query: "tamil kuthu dance",
    icon: "🕺",
  },
  {
    id: "yuvan-hits",
    title: "Yuvan Shankar Raja",
    titleTa: "யுவன் ஷங்கர் ராஜா",
    type: "songs",
    query: "yuvan shankar raja tamil",
    icon: "🎵",
  },
  {
    id: "tamil-90s",
    title: "90s Tamil Hits",
    titleTa: "90ஸ் தமிழ் ஹிட்ஸ்",
    type: "songs",
    query: "tamil 90s hits",
    icon: "📻",
  },
  {
    id: "tamil-devotional",
    title: "Tamil Devotional",
    titleTa: "தமிழ் பக்தி",
    type: "songs",
    query: "tamil devotional songs",
    icon: "🙏",
  },
  {
    id: "sid-sriram",
    title: "Sid Sriram Collection",
    titleTa: "சித் ஸ்ரீராம்",
    type: "songs",
    query: "sid sriram tamil",
    icon: "🎤",
  },
];

// Curated Tamil Playlists (JioSaavn playlist IDs)
export const CURATED_PLAYLISTS = [
  { id: "903166403", title: "Tamil Top 50", desc: "Most played Tamil songs right now" },
  { id: "903166385", title: "Tamil Hit Songs", desc: "All-time Tamil blockbuster hits" },
  { id: "903166419", title: "Tamil Melody Hits", desc: "Soulful Tamil melodies" },
  { id: "903166437", title: "Tamil Party Songs", desc: "Dance floor Tamil hits" },
  { id: "903166453", title: "Tamil Romantic Songs", desc: "Love songs in Tamil" },
  { id: "903166469", title: "Tamil Devotional", desc: "Spiritual Tamil songs" },
];
