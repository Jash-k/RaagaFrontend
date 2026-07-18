export default function SearchPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold font-tamil mb-8">🔍 தேடல்</h1>
      <input type="text" placeholder="Search Tamil songs, artists, albums..." className="w-full bg-neutral-900 border-none rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-gold outline-none mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['Vaathi Coming', 'Naatu Naatu', 'Kutty Story'].map(song => (
          <a key={song} href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition">
            <img src={`https://picsum.photos/seed/${song}/120`} className="w-16 h-16 rounded-xl" />
            <div><h3 className="font-bold">{song}</h3><p className="text-sm text-neutral-400">Artist</p></div>
          </a>
        ))}
      </div>
    </main>
  );
}
