export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-14">
      <section className="rounded-3xl overflow-hidden relative h-96 bg-gradient-to-tr from-rose-deep to-neutral-900 flex items-center px-12">
        <div className="z-10 max-w-xl">
          <h2 className="text-5xl font-extrabold tracking-tight mb-4 font-tamil">ராக வானம்</h2>
          <p className="text-lg text-neutral-300">Tamil-first streaming. No login. Just music.</p>
        </div>
      </section>

      {[
        { title: 'Trending Tamil Albums', endpoint: '/api/home?section=trending' },
        { title: 'New Tamil Releases', endpoint: '/api/home?section=new-releases' },
        { title: 'Tamil Top Charts', endpoint: '/api/home?section=charts' },
      ].map((s) => (
        <section key={s.title}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-tamil">{s.title}</h3>
            <a href="#" className="text-sm text-gold hover:underline">Show All →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <a key={i} href="#" className="group">
                <div className="aspect-square rounded-2xl bg-neutral-800 overflow-hidden mb-3 shadow-lg group-hover:scale-[1.02] transition-transform">
                  <img src={`https://picsum.photos/seed/${s.title}${i}/400`} alt="cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                </div>
                <h4 className="font-semibold truncate">Track {i}</h4>
                <p className="text-xs text-neutral-400 truncate">Artist {i}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
