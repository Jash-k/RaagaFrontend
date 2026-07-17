import HeroBanner from "@/components/music/hero-banner";
import SectionCarousel from "@/components/music/section-carousel";
import ArtistRow from "@/components/music/artist-row";
import { HOMEPAGE_SECTIONS, TAMIL_ARTISTS } from "@/lib/constants";
import { searchSongs, searchAlbums } from "@/lib/jiosaavn";

export default async function HomePage() {
  // Fetch data for each section (server-side)
  const sectionData = await Promise.allSettled(
    HOMEPAGE_SECTIONS.map(async (section) => {
      try {
        if (section.type === "albums") {
          const results = await searchAlbums(section.query, 12);
          return { id: section.id, items: results };
        } else {
          const results = await searchSongs(section.query, 20);
          return { id: section.id, items: results };
        }
      } catch {
        return { id: section.id, items: [] };
      }
    })
  );

  // Map results to sections
  const sections = HOMEPAGE_SECTIONS.map((section, i) => {
    const result = sectionData[i];
    const items = result?.status === "fulfilled" ? result.value.items : [];
    return { ...section, items };
  }).filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Tamil Artists Row */}
      <ArtistRow artists={TAMIL_ARTISTS} />

      {/* Content Sections */}
      <div className="space-y-10 pb-8">
        {sections.map((section) => (
          <SectionCarousel key={section.id} section={section} />
        ))}
      </div>

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
