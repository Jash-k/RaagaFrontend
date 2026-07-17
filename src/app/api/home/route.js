import { NextResponse } from "next/server";

const JIOSAAVN_API = "https://saavn.dev/api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit") || "20";

  if (!query) {
    return NextResponse.json({ error: "Query parameter required" }, { status: 400 });
  }

  try {
    const sections = [
      { id: "trending", title: "Trending Tamil", query: "tamil trending 2025" },
      { id: "anirudh", title: "Anirudh Hits", query: "anirudh ravichander" },
      { id: "rahman", title: "A.R. Rahman", query: "ar rahman tamil" },
      { id: "melody", title: "Tamil Melody", query: "tamil melody songs" },
      { id: "dance", title: "Tamil Dance", query: "tamil kuthu dance" },
      { id: "90s", title: "90s Tamil Hits", query: "tamil 90s hits" },
    ];

    const results = await Promise.allSettled(
      sections.map(async (section) => {
        const res = await fetch(
          `${JIOSAAVN_API}/search/songs?query=${encodeURIComponent(section.query)}&limit=${limit}`,
          { next: { revalidate: 300 } }
        );
        const json = await res.json();
        return {
          ...section,
          items: json.data?.results || [],
        };
      })
    );

    const data = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch home data" }, { status: 500 });
  }
}
