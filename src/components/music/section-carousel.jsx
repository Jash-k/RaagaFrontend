"use client";

import { usePlayer } from "@/contexts/music-player-context";
import { getImageUrl, truncate, formatDuration } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionCarousel({ section }) {
  const { playSong, playAll, currentSong, isPlaying, togglePlay } = usePlayer();
  const { id, title, titleTa, icon, type, items } = section;

  if (!items || items.length === 0) return null;

  const isAlbum = type === "albums";

  const handlePlay = (item, index) => {
    if (currentSong?.id === item.id) {
      togglePlay();
    } else {
      playSong(item, items, index);
    }
  };

  return (
    <section className="px-4 md:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-text-primary">
              {title}
            </h2>
            <p className="text-xs text-text-muted tamil-text">{titleTa}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => playAll(items)}
            className="px-3 py-1.5 text-xs font-medium bg-accent/15 text-accent-light hover:bg-accent/25 rounded-full transition-colors"
          >
            ▶ Play All
          </button>
          <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
            Show All →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 snap-x snap-mandatory">
        {items.map((item, index) => {
          const isCurrentSong = currentSong?.id === item.id;
          const title = item.name || item.title || "Unknown";
          const artist =
            item.artists?.primary?.map((a) => a.name).join(", ") ||
            item.artist ||
            item.subtitle ||
            "";
          const image = getImageUrl(item.image, "medium");
          const dur = item.duration ? formatDuration(item.duration) : "";

          return (
            <div
              key={item.id || index}
              className={cn(
                "group shrink-0 snap-start card-hover",
                isAlbum ? "w-40 md:w-48" : "w-40 md:w-48"
              )}
            >
              {/* Cover Art */}
              <div
                className={cn(
                  "relative overflow-hidden mb-3 cursor-pointer",
                  isAlbum ? "rounded-xl" : "rounded-xl"
                )}
                onClick={() => handlePlay(item, index)}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%231a1a28' width='200' height='200'/%3E%3Ctext x='100' y='105' text-anchor='middle' fill='%236a6a82' font-size='40'%3E🎵%3C/text%3E%3C/svg%3E";
                  }}
                />

                {/* Play overlay */}
                <div className="play-overlay absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-xl">
                    {isCurrentSong && isPlaying ? (
                      <Pause size={20} fill="white" className="text-white" />
                    ) : (
                      <Play size={20} fill="white" className="text-white ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Currently playing indicator */}
                {isCurrentSong && isPlaying && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-accent/90 px-2 py-0.5 rounded-full">
                    <div className="flex items-end gap-0.5 h-3">
                      <div className="w-0.5 bg-white animate-bounce" style={{ height: "60%", animationDelay: "0ms" }} />
                      <div className="w-0.5 bg-white animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
                      <div className="w-0.5 bg-white animate-bounce" style={{ height: "40%", animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                {/* Duration badge */}
                {dur && (
                  <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white/80">
                    {dur}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-1">
                <p className="text-sm font-medium text-text-primary truncate">
                  {truncate(title, 22)}
                </p>
                <p className="text-xs text-text-secondary truncate mt-0.5">
                  {truncate(artist, 28)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
