"use client";

import { useState, useEffect } from "react";
import HeroBanner from "@/components/music/hero-banner-client";
import SectionCarousel from "@/components/music/section-carousel";
import ArtistRow from "@/components/music/artist-row";
import { HOMEPAGE_SECTIONS, TAMIL_ARTISTS } from "@/lib/constants";
import { JIOSAAVN_API } from "@/lib/constants";

export default function HomePage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      const results = await Promise.allSettled(
        HOMEPAGE_SECTIONS.map(async (section) => {
          try {
            const endpoint =
              section.type === "albums"
                ? `${JIOSAAVN_API}/search/albums?query=${encodeURIComponent(section.query)}&limit=12`
                : `${JIOSAAVN_API}/search/songs?query=${encodeURIComponent(section.query)}&limit=20`;

            const res = await fetch(endpoint);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const items = json.data?.results || [];
            return { ...section, items };
          } catch (err) {
            console.warn(`[Section ${section.id}] Failed:`, err.message);
            return { ...section, items: [] };
          }
        })
      );

      const data = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value)
        .filter((s) => s.items.length > 0);

      setSections(data);
      setLoading(false);
    }

    fetchSections();
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Tamil Artists Row */}
      <ArtistRow artists={TAMIL_ARTISTS} />

      {/* Loading Skeleton */}
      {loading && (
        <div className="px-4 md:px-8 space-y-10 pb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded bg-bg-card" />
                <div>
                  <div className="h-5 w-40 bg-bg-card rounded mb-1" />
                  <div className="h-3 w-24 bg-bg-card rounded" />
                </div>
              </div>
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="shrink-0 w-40 md:w-48">
                    <div className="aspect-square bg-bg-card rounded-xl mb-3" />
                    <div className="h-4 w-32 bg-bg-card rounded mb-1" />
                    <div className="h-3 w-24 bg-bg-card rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span>Loading Tamil music...</span>
          </div>
        </div>
      )}

      {/* Content Sections */}
      {!loading && (
        <div className="space-y-10 pb-8">
          {sections.map((section) => (
            <SectionCarousel key={section.id} section={section} />
          ))}

          {sections.length === 0 && (
            <div className="text-center py-20 px-4">
              <p className="text-4xl mb-4">🎵</p>
              <p className="text-text-secondary text-lg">
                Could not load music data right now
              </p>
              <p className="text-text-muted text-sm mt-2 tamil-text">
                தயவு செய்து சிறிது நேரம் கழித்து முயற்சிக்கவும்
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-5 py-2 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-light transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-12 text-center border-t border-border">
        <p className="text-text-muted text-sm tamil-text">
          இசை கேட்போம், இசை படைப்போம் 🎶
        </p>
        <p className="text-text-muted/50 text-xs mt-2">
          ராக வானம் — Personal Tamil Music Streaming
        </p>
      </footer>
    </div>
  );
}
