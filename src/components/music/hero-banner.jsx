import { searchSongs } from "@/lib/jiosaavn";

export default async function HeroBanner() {
  // Fetch a featured Tamil song for the hero
  const trending = await searchSongs("tamil trending 2025", 5);
  const featured = trending[0];

  const title = featured?.name || "ராக வானம்";
  const artist =
    featured?.artists?.primary?.map((a) => a.name).join(", ") || "Tamil Music";
  const image =
    featured?.image?.find((i) => i.quality === "500x500")?.url ||
    featured?.image?.[featured.image.length - 1]?.url ||
    "";

  return (
    <section className="relative px-4 md:px-8 pt-6 pb-2">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-accent/20 via-bg-card to-gold/10 border border-border p-6 md:p-10">
        {/* Background blur */}
        {image && (
          <div
            className="absolute inset-0 opacity-15 blur-3xl"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        <div className="relative flex items-center gap-6 md:gap-10">
          {/* Album Art */}
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-xl overflow-hidden shadow-2xl glow-accent">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white text-5xl font-bold tamil-text">
                  ர
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent text-xs font-semibold uppercase tracking-wider">
                ✨ Featured
              </span>
              <span className="text-text-muted text-xs tamil-text">
                • சிறப்பு
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-text-primary truncate mb-1">
              {title}
            </h1>
            <p className="text-text-secondary text-sm md:text-base truncate mb-4">
              {artist}
            </p>

            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg text-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Now
              </button>
              <button className="px-5 py-2.5 border border-border hover:border-accent/50 text-text-secondary hover:text-text-primary rounded-full transition-all text-sm">
                Explore Tamil →
              </button>
            </div>

            {/* Tamil tagline */}
            <p className="hidden md:block mt-4 text-text-muted text-xs tamil-text">
              தமிழ் இசையின் உலகத்தில் உங்களை வரவேற்கிறோம்
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
