export default function LibraryPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold font-tamil mb-8">📚 நூலகம்</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {['Liked Songs', 'Recent Plays', 'Playlists', 'Downloads'].map(item => (
          <a key={item} href="#" className="p-6 rounded-3xl bg-neutral-900 hover:bg-neutral-800 transition shadow-lg">
            <h3 className="text-xl font-bold mb-1">{item}</h3>
            <p className="text-xs text-neutral-400">Local storage</p>
          </a>
        ))}
      </div>
    </main>
  );
}
