import { JIOSAAVN_API } from "./constants";

/**
 * JioSaavn API Client
 * Proxies requests to saavn.dev (or self-hosted instance)
 */

// Simple in-memory cache with TTL
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.time < CACHE_TTL) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, time: Date.now() });
  // Limit cache size
  if (cache.size > 100) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
}

async function fetchAPI(endpoint, params = {}) {
  const cacheKey = endpoint + JSON.stringify(params);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = new URL(`${JIOSAAVN_API}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 }, // 5 min ISR cache
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();

    if (json.success && json.data) {
      setCache(cacheKey, json.data);
      return json.data;
    }
    return json.data || json;
  } catch (err) {
    console.error(`[JioSaavn] ${endpoint} failed:`, err.message);
    return null;
  }
}

// ── Search ──────────────────────────────────────────
export async function searchSongs(query, limit = 20) {
  const data = await fetchAPI("/search/songs", { query, limit });
  return data?.results || [];
}

export async function searchAlbums(query, limit = 10) {
  const data = await fetchAPI("/search/albums", { query, limit });
  return data?.results || [];
}

export async function searchArtists(query, limit = 10) {
  const data = await fetchAPI("/search/artists", { query, limit });
  return data?.results || [];
}

export async function searchAll(query) {
  const data = await fetchAPI("/search", { query });
  return data || {};
}

// ── Songs ───────────────────────────────────────────
export async function getSongById(id) {
  const data = await fetchAPI(`/songs/${id}`);
  return Array.isArray(data) ? data[0] : data;
}

export async function getSongSuggestions(id) {
  return (await fetchAPI(`/songs/${id}/suggestions`)) || [];
}

// ── Albums ──────────────────────────────────────────
export async function getAlbumById(id) {
  return await fetchAPI(`/albums/${id}`);
}

// ── Artists ─────────────────────────────────────────
export async function getArtistById(id) {
  return await fetchAPI(`/artists/${id}`);
}

export async function getArtistSongs(id, page = 1) {
  const data = await fetchAPI(`/artists/${id}/songs`, { page });
  return data?.songs || [];
}

export async function getArtistAlbums(id, page = 1) {
  const data = await fetchAPI(`/artists/${id}/albums`, { page });
  return data?.albums || [];
}

// ── Playlists ───────────────────────────────────────
export async function getPlaylistById(id, limit = 50) {
  return await fetchAPI(`/playlists/${id}`, { limit });
}
