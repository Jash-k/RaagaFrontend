import Header from '@/components/layout/header';

export default function LayoutWrapper({ children }) {
  return (
    <>
      <Header />
      <main className="pb-28">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-xl border-t border-neon/20 px-6 py-3 flex items-center gap-4 shadow-[0_-10px_40px_-15px_rgba(57,255,20,0.15)]">
        <img src="https://picsum.photos/seed/player/60" className="w-12 h-12 rounded-xl shadow shadow-neon/20" />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold truncate text-white">Vaathi Coming</h4>
          <p className="text-xs text-neutral-400 truncate">Anirudh Ravichander</p>
        </div>
        <audio src="" controls className="w-full md:w-96 h-8 rounded-md" />
      </footer>
    </>
  );
}
