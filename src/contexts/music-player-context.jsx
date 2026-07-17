"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

const MusicPlayerContext = createContext(null);

export function MusicPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // off | one | all
  const [isLoading, setIsLoading] = useState(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => handleNext();
    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); };
    const onWaiting = () => setIsLoading(true);
    const onError = (e) => {
      console.error("Audio error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("error", onError);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get best stream URL for a song
  function getStreamUrl(song) {
    if (!song) return null;
    // JioSaavn format: downloadUrl array
    if (song.downloadUrl) {
      const high = song.downloadUrl.find(d => d.quality === "320kbps");
      const med = song.downloadUrl.find(d => d.quality === "160kbps");
      const low = song.downloadUrl.find(d => d.quality === "96kbps");
      return (high || med || low || song.downloadUrl[0])?.url;
    }
    // Direct URL
    if (song.streamUrl) return song.streamUrl;
    return null;
  }

  // Play a song
  const playSong = useCallback(async (song, songQueue = null, index = 0) => {
    if (!song) return;

    const audio = audioRef.current;
    if (!audio) return;

    setIsLoading(true);
    setCurrentSong(song);

    if (songQueue) {
      setQueue(songQueue);
      setQueueIndex(index);
    }

    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const url = getStreamUrl(song);
    if (!url) {
      setIsLoading(false);
      return;
    }

    try {
      if (url.includes(".m3u8")) {
        // HLS stream
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          const hls = new Hls({ maxBufferLength: 30 });
          hls.loadSource(url);
          hls.attachMedia(audio);
          hlsRef.current = hls;
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            audio.play().catch(() => {});
          });
        } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
          audio.src = url;
          audio.play().catch(() => {});
        }
      } else {
        // Direct MP4/M4A stream
        audio.src = url;
        audio.play().catch(() => {});
      }
    } catch (err) {
      console.error("Play error:", err);
      setIsLoading(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setIsPlaying(!audio.paused);
  }, []);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = time;
  }, []);

  const changeVolume = useCallback((v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;

    if (repeat === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }

    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = queueIndex + 1;
    }

    if (nextIndex >= queue.length) {
      if (repeat === "all") nextIndex = 0;
      else return; // Stop
    }

    setQueueIndex(nextIndex);
    playSong(queue[nextIndex]);
  }, [queue, queueIndex, shuffle, repeat, playSong]);

  const handlePrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (queue.length === 0) return;
    const prevIndex = queueIndex - 1 < 0 ? queue.length - 1 : queueIndex - 1;
    setQueueIndex(prevIndex);
    playSong(queue[prevIndex]);
  }, [queue, queueIndex, playSong]);

  const addToQueue = useCallback((song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const playAll = useCallback((songs, startIndex = 0) => {
    if (!songs || songs.length === 0) return;
    setQueue(songs);
    setQueueIndex(startIndex);
    playSong(songs[startIndex], songs, startIndex);
  }, [playSong]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        duration,
        currentTime,
        volume,
        queue,
        queueIndex,
        shuffle,
        repeat,
        isLoading,
        playSong,
        togglePlay,
        seek,
        changeVolume,
        handleNext,
        handlePrev,
        addToQueue,
        playAll,
        setShuffle: (v) => setShuffle(v),
        setRepeat: (v) => setRepeat(v),
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within MusicPlayerProvider");
  return ctx;
}
