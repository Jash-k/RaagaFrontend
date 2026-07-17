import { NextResponse } from "next/server";

const JIOSAAVN_API = "https://saavn.dev/api";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Song ID required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${JIOSAAVN_API}/songs/${id}`,
      { next: { revalidate: 600 } }
    );
    const data = await res.json();

    // Also fetch suggestions
    let suggestions = [];
    try {
      const sugRes = await fetch(
        `${JIOSAAVN_API}/songs/${id}/suggestions`,
        { next: { revalidate: 600 } }
      );
      const sugData = await sugRes.json();
      suggestions = sugData.data || [];
    } catch {}

    return NextResponse.json({
      ...data,
      suggestions,
    });
  } catch (err) {
    return NextResponse.json({ error: "Song fetch failed" }, { status: 500 });
  }
}
