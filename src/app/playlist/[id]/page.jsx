export default function PlaylistPage({ params }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold font-tamil mb-2">Playlist Name</h1>
      <p className="text-green-400 mb-8">Curated • 20 songs</p>
      <div className="space-y-2">
        {[1,2,3,4,5].map(i => (
          <a key={i} href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition">
            <img src={`https://picsum.photos/seed/pl-${params.id}-${i}/60`} className="w-12 h-12 rounded-lg" />
            <div className="flex-1"><h3 className="font-bold">Song {i}</h3><p className="text-xs text-neutral-400">Artist</p></div>
          </a>
        ))}
      </div>
    </main>
  );
}
