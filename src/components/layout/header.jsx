import { Search, Play } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <a href="/" className="text-2xl font-extrabold font-tamil tracking-tight text-white">ராக வானம்</a>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-300">
        <a href="/" className="hover:text-white">Trending</a>
        <a href="/" className="hover:text-white">New Releases</a>
        <a href="/" className="hover:text-white">Charts</a>
        <a href="/library" className="hover:text-white">Library</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href="/search" className="p-2 rounded-full bg-white/5 hover:bg-white/10"><Search size={18} /></a>
        <a href="/search" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400 text-black text-sm font-bold hover:bg-green-300"><Play size={16} fill="currentColor" /> Play</a>
      </div>
    </header>
  );
}
