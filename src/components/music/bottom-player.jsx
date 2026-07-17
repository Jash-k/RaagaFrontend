"use client";

import { usePlayer } from "@/contexts/music-player-context";
import { formatDuration, getImageUrl, truncate } from "@/lib/utils";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomPlayer() {
  const {
    currentSong,
    isPlaying,
    duration,
    currentTime,
    volume,
    shuffle,
    repeat,
    isLoading,
    togglePlay,
    seek,
    changeVolume,
    handleNext,
    handlePrev,
    setShuffle,
    setRepeat,
  } = usePlayer();

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 md:left-64 h-20 md:h-20 bg-bg-player border-t border-border flex items-center justify-center z-50">
        <p className="text-text-muted text-sm">
          <span className="tamil-text">பாடலைத் தேர்ந்தெடுக்கவும்</span>
          <span className="ml-2 text-text-muted/60">— Select a song to play</span>
        </p>
      </div>
    );
  }

  const song = currentSong;
  const title = song.name || song.title || "Unknown";
  const artist =
    song.artists?.primary?.map((a) => a.name).join(", ") ||
    song.artist ||
    "Unknown Artist";
  const image = getImageUrl(song.image, "medium");
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const toggleRepeat = () => {
    const modes = ["off", "all", "one"];
    const currentIdx = modes.indexOf(repeat);
    setRepeat(modes[(currentIdx + 1) % 3]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-bg-player/95 backdrop-blur-xl border-t border-border z-50">
      {/* Progress bar (thin line at top) */}
      <div className="relative h-1 bg-border cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          seek(x * duration);
        }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-accent transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>

      <div className="flex items-center h-16 md:h-[72px] px-4 gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none md:w-64">
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover shadow-lg shrink-0"
            onError={(e) => {
              e.target.src = "/images/placeholder.png";
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {truncate(title, 25)}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {truncate(artist, 30)}
            </p>
          </div>
          <button className="hidden md:block ml-2 text-text-muted hover:text-accent transition-colors">
            <Heart size={16} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 justify-center">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={cn(
              "hidden md:block p-1.5 rounded-full transition-colors",
              shuffle ? "text-accent" : "text-text-muted hover:text-text-primary"
            )}
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={handlePrev}
            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-accent hover:bg-accent-light text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            onClick={toggleRepeat}
            className={cn(
              "hidden md:block p-1.5 rounded-full transition-colors",
              repeat !== "off" ? "text-accent" : "text-text-muted hover:text-text-primary"
            )}
          >
            {repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
          </button>
        </div>

        {/* Time + Volume */}
        <div className="hidden md:flex items-center gap-3 w-64 justify-end">
          <span className="text-xs text-text-muted tabular-nums">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>

          <button
            onClick={() => changeVolume(volume === 0 ? 0.7 : 0)}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-20"
          />

          <button className="text-text-muted hover:text-text-primary transition-colors">
            <ListMusic size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
