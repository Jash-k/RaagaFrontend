import { NextResponse } from "next/server";

const JIOSAAVN_API = "https://jiosaavn.com/api.php";

/**
 * JioSaavn Internal API Proxy
 * Calls JioSaavn's official internal API directly
 */
export async function GET(request) {
  const { searchParams, pathname } = new URL(request.url);
  
  const apiPath = pathname.replace("/api/jiosaavn/", "");
  
  let jioCall = "";
  let jioParams = {};

  if (apiPath === "search/songs" || apiPath === "search") {
    jioCall = "search.getResults";
    jioParams = {
      p: searchParams.get("page") || "1",
      n: searchParams.get("limit") || "20",
      q: searchParams.get("query") || "",
    };
  } else if (apiPath === "search/albums") {
    jioCall = "search.getAlbumResults";
    jioParams = {
      p: searchParams.get("page") || "1",
      n: searchParams.get("limit") || "20",
      q: searchParams.get("query") || "",
    };
  } else if (apiPath === "search/artists") {
    jioCall = "search.getArtistResults";
    jioParams = {
      p: searchParams.get("page") || "1",
      n: searchParams.get("limit") || "20",
      q: searchParams.get("query") || "",
    };
  } else if (apiPath === "autocomplete") {
    jioCall = "autocomplete.get";
    jioParams = {
      _marker: "0",
      cc: "in",
      includeMetaTags: "1",
      query: searchParams.get("query") || "",
    };
  } else if (apiPath.startsWith("songs/")) {
    const songId = apiPath.split("/")[1];
    jioCall = "song.getDetails";
    jioParams = { pids: songId };
  } else if (apiPath.startsWith("albums/")) {
    const albumId = apiPath.split("/")[1];
    jioCall = "content.getAlbumDetails";
    jioParams = { albumid: albumId };
  } else if (apiPath.startsWith("artists/")) {
    const parts = apiPath.split("/");
    const artistId = parts[1];
    const subPath = parts[2];
    
    if (subPath === "songs") {
      jioCall = "artist.getArtistTopSongs";
      jioParams = { artistId, p: searchParams.get("page") || "1", n_song: searchParams.get("limit") || "20" };
    } else if (subPath === "albums") {
      jioCall = "artist.getArtistTopAlbums";
      jioParams = { artistId, p: searchParams.get("page") || "1", n_album: searchParams.get("limit") || "20" };
    } else {
      jioCall = "artist.getArtistDetails";
      jioParams = { artistId };
    }
  } else {
    return NextResponse.json({ success: false, error: "Unknown API path" }, { status: 404 });
  }

  const targetUrl = new URL(JIOSAAVN_API);
  targetUrl.searchParams.append("__call", jioCall);
  targetUrl.searchParams.append("_format", "json");
  targetUrl.searchParams.append("ctx", "web6dot0");
  targetUrl.searchParams.append("api_version", "4");
  
  Object.entries(jioParams).forEach(([key, value]) => {
    targetUrl.searchParams.append(key, String(value));
  });

  try {
    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://www.jiosaavn.com",
        "Referer": "https://www.jiosaavn.com/",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `JioSaavn API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const transformed = transformResponse(data, apiPath);

    return NextResponse.json(transformed, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("[JioSaavn Proxy] Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch from JioSaavn API", details: error.message },
      { status: 500 }
    );
  }
}

function transformResponse(data, apiPath) {
  if (data.results && Array.isArray(data.results)) {
    return {
      success: true,
      data: {
        total: data.total || data.results.length,
        results: data.results.map(transformItem),
      },
    };
  }

  if (data.songs || data.albums || data.artists || data.topquery) {
    const result = { success: true, data: {} };

    if (data.songs?.data) {
      result.data.songs = { results: data.songs.data.map(transformItem) };
    }
    if (data.albums?.data) {
      result.data.albums = { results: data.albums.data.map(transformItem) };
    }
    if (data.artists?.data) {
      result.data.artists = { results: data.artists.data.map(transformItem) };
    }
    if (data.playlists?.data) {
      result.data.playlists = { results: data.playlists.data.map(transformItem) };
    }
    if (data.topquery?.data) {
      result.data.topquery = { results: data.topquery.data.map(transformItem) };
    }

    return result;
  }

  if (apiPath.startsWith("songs/")) {
    const song = Array.isArray(data) ? data[0] : data;
    return { success: true, data: transformItem(song) };
  }

  if (apiPath.startsWith("albums/") && data.list) {
    return {
      success: true,
      data: {
        ...transformItem(data),
        songs: data.list.map(transformItem),
      },
    };
  }

  if (apiPath.startsWith("artists/")) {
    if (data.topSongs) {
      return {
        success: true,
        data: {
          ...transformItem(data),
          topSongs: data.topSongs.map(transformItem),
        },
      };
    }
    if (Array.isArray(data)) {
      return { success: true, data: { results: data.map(transformItem) } };
    }
    return { success: true, data: transformItem(data) };
  }

  return { success: true, data };
}

function transformItem(item) {
  if (!item) return item;

  const transformed = { ...item };

  if (item.image && typeof item.image === "string") {
    transformed.image = [
      { quality: "50x50", url: item.image.replace("500x500", "50x50").replace("150x150", "50x50") },
      { quality: "150x150", url: item.image.replace("500x500", "150x150").replace("50x50", "150x150") },
      { quality: "500x500", url: item.image.replace("50x50", "500x500").replace("150x150", "500x500") },
    ];
  }

  if (item.encrypted_media_url) {
    transformed.downloadUrl = [
      { quality: "12kbps", url: item.encrypted_media_url },
      { quality: "48kbps", url: item.encrypted_media_url },
      { quality: "96kbps", url: item.encrypted_media_url },
      { quality: "160kbps", url: item.encrypted_media_url },
      { quality: "320kbps", url: item.encrypted_media_url },
    ];
  }

  if (item.more_info?.artistMap) {
    transformed.artists = {
      primary: Object.entries(item.more_info.artistMap).map(([id, name]) => ({
        id: String(id),
        name,
      })),
    };
  }

  if (item.more_info?.duration) {
    transformed.duration = parseInt(item.more_info.duration);
  }

  if (item.more_info?.language) {
    transformed.language = item.more_info.language;
  }

  return transformed;
}