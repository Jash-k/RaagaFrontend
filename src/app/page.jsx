export default async function Home() {
  let sections = [];
  try {
    const res = await fetch('https://raagabackend.onrender.com/3sources/trending?lang=Tamil', { cache: 'no-store' });
    const data = await res.json();
    sections = data?.data?.songs || data?.songs || data?.results || data?.tracks || [];
  } catch (e) {
    sections = [];
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-14">
      <section className="rounded-3xl overflow-hidden relative h-96 bg-gradient-to-tr from-rose-deep to-neutral-900 flex items-center px-12 shadow-2xl shadow-green-900/30">
        <div className="z-10 max-w-xl">
          <h2 className="text-5xl font-extrabold tracking-tight mb-4 font-tamil text-white">ராக வானம்</h2>
          <p className="text-lg text-neutral-300">Tamil-first streaming. No login. Just music.</p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold font-tamil">Trending Tamil Albums</h3>
          <a href="#" className="text-sm text-green-400 hover:underline">Show All →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {(Array.isArray(sections) ? sections.slice(0,6) : []).map((item, i) => (
            <a key={i} href="#" className="group block">
              <div className="aspect-square rounded-2xl bg-neutral-900 overflow-hidden mb-3 shadow-lg shadow-green-900/20 group-hover:scale-[1.02] transition-transform">
                <img src={item.image || item.albumArt || item.thumbnail} alt={item.title || item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
              </div>
              <h4 className="font-semibold truncate">{item.title || item.name || 'Unknown Song'}</h4>
              <p className="text-xs text-neutral-400 truncate">{Array.isArray(item.artist) ? item.artist.map(a => a.name || a).join(', ') : (item.artist?.name || item.artist || item.artists || 'Unknown Artist')}</p>
            </a>
          ))}
          {Array.from({length: 6 - Math.min(sections?.length || 0, 6)}).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-neutral-900 animate-pulse" />
          ))}
        </div>
      </section>
    </main>
  );
}
