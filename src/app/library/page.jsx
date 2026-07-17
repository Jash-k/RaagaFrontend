"use client";

import { useState, useEffect } from "react";
import { Heart, Clock, ListMusic, Music, Play } from "lucide-react";
import { usePlayer } from "@/contexts/music-player-context";
import { getImageUrl, truncate, formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function LibraryPage() {
  const { playSong, playAll, currentSong, isPlaying, togglePlay } = usePlayer();
  const [likedSongs, setLikedSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [activeTab, setActiveTab] = useState("liked");

  useEffect(() => {
    try {
      const liked = localStorage.getItem("raga-liked-songs");
      if (liked) setLikedSongs(JSON.parse(liked));

      const recent = localStorage.getItem("raga-recent-songs");
      if (recent) setRecentSongs(JSON.parse(recent));
    } catch {}
  }, []);

  const songs = activeTab === "liked" ? likedSongs : recentSongs;
  const tabs = [
    { id: "liked", label: "Liked Songs", icon: Heart, count: likedSongs.length },
    { id: "recent", label: "Recently Played", icon: Clock, count: recentSongs.length },
  ];

  return (
    <div className="min-h-screen gradient-bg px-4 md:px-8 pt-6">
      <h1 className="text-2xl font-bold mb-6">
        <span className="tamil-text text-accent">நூலகம்</span>{" "}
        <span className="text-text-primary">Library</span>
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-accent text-white"
                : "bg-bg-card border border-border text-text-secondary hover:text-text-primary"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              activeTab === tab.id ? "bg-white/20" : "bg-border"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Songs */}
      {songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-bg-card flex items-center justify-center mb-4">
            {activeTab === "liked" ? (
              <Heart size={32} className="text-text-muted" />
            ) : (
              <Clock size={32} className="text-text-muted" />
            )}
          </div>
          <p className="text-text-secondary text-center">
            {activeTab === "liked"
              ? "No liked songs yet"
              : "No recently played songs"}
          </p>
          <p className="text-text-muted text-sm text-center mt-1 tamil-text">
            {activeTab === "liked"
              ? "பாடல்களை இதய அடையாளம் செய்யுங்கள்"
              : "பாடல்களை கேளுங்கள்"}
          </p>
        </div>
      ) : (
        <div>
          {songs.length > 1 && (
            <button
              onClick={() => playAll(songs)}
              className="mb-4 px-5 py-2 bg-accent hover:bg-accent-light text-white rounded-full text-sm font-medium transition-all flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" />
              Play All ({songs.length})
            </button>
          )}

          <div className="space-y-1">
            {songs.map((song, index) => {
              const isCurrent = currentSong?.id === song.id;
              return (
                <div
                  key={`${song.id}-${index}`}
                  onClick={() => {
                    if (isCurrent) togglePlay();
                    else playSong(song, songs, index);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all group",
                    isCurrent ? "bg-accent/10 border border-accent/20" : "hover:bg-bg-card"
                  )}
                >
                  <img
                    src={getImageUrl(song.image, "small")}
                    alt=""
                    className="w-10 h-10 rounded object-cover shrink-0"
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
    </div>
  );
}
