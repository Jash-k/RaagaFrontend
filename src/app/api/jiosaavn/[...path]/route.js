import { NextResponse } from "next/server";

const JIOSAAVN_API = "https://saavn.dev/api";

/**
 * JioSaavn API Proxy
 * Proxies all requests to saavn.dev to avoid CORS issues
 * 
 * Usage: /api/jiosaavn/search/songs?query=anirudh
 * Maps to: https://saavn.dev/api/search/songs?query=anirudh
 */
export async function GET(request) {
  const { searchParams, pathname } = new URL(request.url);
  
  // Extract the JioSaavn path from our URL
  // e.g., /api/jiosaavn/search/songs -> /search/songs
  const jiosaavnPath = pathname.replace("/api/jiosaavn", "");

  // Build the full URL
  const url = new URL(`${JIOSAAVN_API}${jiosaavnPath}`);
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Upstream error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("[JioSaavn Proxy] Error:", err.message);
    return NextResponse.json(
      { success: false, error: "Proxy failed", details: err.message },
      { status: 502 }
    );
  }
}
