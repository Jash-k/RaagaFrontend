import { createContext, useContext, useState } from 'react';

const MusicPlayerContext = createContext();

export function MusicPlayerProvider({ children }) {
  const [track, setTrack] = useState({ title: 'Vaathi Coming', artist: 'Anirudh Ravichander', src: '' });
  return (
    <MusicPlayerContext.Provider value={{ track, setTrack }}>
      {children}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur border-t border-white/5 px-6 py-3 flex items-center gap-4">
        <img src="https://picsum.photos/seed/player/60" className="w-12 h-12 rounded-xl shadow" />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold truncate">{track.title}</h4>
          <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
        </div>
        <audio src={track.src} controls className="w-full md:w-96 h-8" />
      </footer>
    </MusicPlayerContext.Provider>
  );
}

export const useMusicPlayer = () => useContext(MusicPlayerContext);
