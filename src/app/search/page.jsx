"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Clock, Music, Disc3, User, ListMusic } from "lucide-react";
import { usePlayer } from "@/contexts/music-player-context";
import { JIOSAAVN_API } from "@/lib/constants";
import { getImageUrl, truncate, formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All", icon: Search },
  { id: "songs", label: "Songs", icon: Music },
  { id: "albums", label: "Albums", icon: Disc3 },
  { id: "artists", label: "Artists", icon: User },
  { id: "playlists", label: "Playlists", icon: ListMusic },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const { playSong, playAll, currentSong, isPlaying, togglePlay } = usePlayer();
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("raga-recent-searches");
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch {}
  }, []);

  const saveRecentSearch = (q) => {
    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("raga-recent-searches", JSON.stringify(updated));
  };

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`${JIOSAAVN_API}/search?query=${encodeURIComponent(q)}`);
      const json = await res.json();
      setResults(json.data || json);
    } catch (err) {
      console.error("Search failed:", err);
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      doSearch(query.trim());
    }
  };

  const handleQuickSearch = (q) => {
    setQuery(q);
    saveRecentSearch(q);
    doSearch(q);
    inputRef.current?.focus();
  };

  const getSongs = () => {
    if (!results) return [];
    if (activeTab === "all") return results.songs?.results?.slice(0, 5) || [];
    return results.songs?.results || [];
  };

  const getAlbums = () => {
    if (!results) return [];
    if (activeTab === "all") return results.albums?.results?.slice(0, 5) || [];
    return results.albums?.results || [];
  };

  const getArtists = () => {
    if (!results) return [];
    if (activeTab === "all") return results.artists?.results?.slice(0, 5) || [];
    return results.artists?.results || [];
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-xl border-b border-border">
        <div className="px-4 md:px-8 pt-6 pb-4">
          <h1 className="text-2xl font-bold mb-4">
            <span className="tamil-text text-accent">தேடு</span>{" "}
            <span className="text-text-primary">Search</span>
          </h1>

          {/* Search Input */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search Tamil songs, albums, artists..."
                className="w-full pl-11 pr-10 py-3 bg-bg-card border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setResults(null); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Tabs */}
          {results && (
            <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-accent text-white"
                      : "bg-bg-card text-text-secondary hover:text-text-primary border border-border"
                  )}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-6">
        {!results && !isSearching && (
          <div>
            {/* Quick Tamil Searches */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-text-secondary mb-3">
                Quick Tamil Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Anirudh hits",
                  "A.R. Rahman classics",
                  "Yuvan melody",
                  "Sid Sriram",
                  "Tamil kuthu",
                  "Tamil 90s",
                  "Harris Jayaraj",
                  "Santhosh Narayanan",
                  "Tamil devotional",
                  "GV Prakash",
                  "Tamil love songs",
                  "Thaman S",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickSearch(q)}
                    className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-accent/40 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-text-secondary mb-3">
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickSearch(q)}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-bg-card text-left transition-colors"
                    >
                      <Clock size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isSearching && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}

        {/* Results */}
        {results && !isSearching && (
          <div className="space-y-8">
            {/* Songs */}
            {getSongs().length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Songs
                </h3>
                <div className="space-y-1">
                  {getSongs().map((song, index) => {
                    const isCurrent = currentSong?.id === song.id;
                    return (
                      <div
                        key={song.id}
                        onClick={() => {
                          if (isCurrent) togglePlay();
                          else playSong(song, getSongs(), index);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all group",
                          isCurrent
                            ? "bg-accent/10 border border-accent/20"
                            : "hover:bg-bg-card"
                        )}
                      >
                        <img
                          src={getImageUrl(song.image, "small")}
                          alt=""
                          className="w-10 h-10 rounded object-cover shrink-0"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm truncate",
                            isCurrent ? "text-accent font-medium" : "text-text-primary"
                          )}>
                            {song.name}
                          </p>
                          <p className="text-xs text-text-secondary truncate">
                            {song.artists?.primary?.map((a) => a.name).join(", ")}
                          </p>
                        </div>
                        <span className="text-xs text-text-muted">
                          {formatDuration(song.duration)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Albums */}
            {getAlbums().length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Albums
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {getAlbums().map((album) => (
                    <div key={album.id} className="group card-hover cursor-pointer">
                      <div className="rounded-xl overflow-hidden mb-2">
                        <img
                          src={getImageUrl(album.image, "medium")}
                          alt={album.name}
                          className="w-full aspect-square object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm font-medium text-text-primary truncate">
                        {album.name}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {album.artists?.primary?.map((a) => a.name).join(", ") || album.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artists */}
            {getArtists().length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Artists
                </h3>
                <div className="flex gap-6 flex-wrap">
                  {getArtists().map((artist) => (
                    <div key={artist.id} className="flex flex-col items-center gap-2 w-24 cursor-pointer group">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors">
                        <img
                          src={getImageUrl(artist.image, "medium")}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-bg-card flex items-center justify-center text-2xl font-bold text-text-muted">${artist.name?.charAt(0) || "?"}</div>`;
                          }}
                        />
                      </div>
                      <p className="text-xs text-text-secondary text-center truncate w-full group-hover:text-text-primary transition-colors">
                        {artist.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {getSongs().length === 0 && getAlbums().length === 0 && getArtists().length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-text-secondary">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-text-muted text-sm mt-1 tamil-text">
                  வேறு சொற்களில் தேடுங்கள்
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
