export default function AlbumPage({ params }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <img src={`https://picsum.photos/seed/album-${params.id}/400`} className="w-80 h-80 rounded-3xl shadow-2xl shadow-green-500/20" />
        <div>
          <h1 className="text-4xl font-extrabold font-tamil mb-2">Album Title</h1>
          <p className="text-green-400">Artist • 2024</p>
        </div>
      </div>
      <div className="space-y-2">
        {[1,2,3,4,5].map(i => (
          <a key={i} href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition">
            <span className="text-green-400 font-mono w-6">{i}</span>
            <div className="flex-1"><h3 className="font-bold">Track {i}</h3></div>
            <span className="text-xs text-neutral-500">3:45</span>
          </a>
        ))}
      </div>
    </main>
  );
}
