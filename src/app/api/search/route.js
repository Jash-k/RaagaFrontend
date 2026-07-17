import { NextResponse } from "next/server";

const JIOSAAVN_API = "https://saavn.dev/api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const limit = searchParams.get("limit") || "20";

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${JIOSAAVN_API}/search?query=${encodeURIComponent(query)}&limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Search failed", details: err.message }, { status: 500 });
  }
}
