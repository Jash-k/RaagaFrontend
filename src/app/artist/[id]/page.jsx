export default function ArtistPage({ params }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="relative h-72 rounded-3xl overflow-hidden mb-10">
        <img src={`https://picsum.photos/seed/artist-${params.id}/1200`} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/90">
          <h1 className="text-5xl font-extrabold font-tamil">Artist Name</h1>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Top Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <a key={i} href="#" className="p-4 rounded-3xl bg-neutral-900 hover:bg-neutral-800 transition shadow-lg shadow-green-900/20">
            <img src={`https://picsum.photos/seed/artist-${params.id}-track${i}/300`} className="rounded-2xl mb-4 w-full aspect-square object-cover" />
            <h3 className="font-bold">Song {i}</h3>
          </a>
        ))}
      </div>
    </main>
  );
}
