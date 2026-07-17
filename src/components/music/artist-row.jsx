"use client";

import Link from "next/link";
import { searchSongs } from "@/lib/jiosaavn";

export default function ArtistRow({ artists }) {
  return (
    <section className="px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎤</span>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-text-primary">
              Popular Tamil Artists
            </h2>
            <p className="text-xs text-text-muted tamil-text">
              பிரபல தமிழ் கலைஞர்கள்
            </p>
          </div>
        </div>
        <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
          Show All →
        </button>
      </div>

      {/* Artist circles */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 snap-x">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artist/${artist.id}`}
            className="group shrink-0 snap-start flex flex-col items-center gap-2 w-24"
          >
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors shadow-lg">
                {artist.image ? (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-bg-card to-bg-card-hover flex items-center justify-center text-2xl font-bold text-text-muted">
                    {artist.name.charAt(0)}
                  </div>
                )}
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors" />
            </div>
            <p className="text-xs text-text-secondary text-center leading-tight group-hover:text-text-primary transition-colors truncate w-full">
              {artist.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
