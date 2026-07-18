export default function SongPage({ params }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img src={`https://picsum.photos/seed/${params.id}/400`} className="w-72 h-72 rounded-3xl shadow-2xl shadow-green-500/20" />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold font-tamil">Song Title</h1>
          <p className="text-green-400 text-lg mt-2">Artist Name • Album</p>
          <button className="mt-6 px-8 py-3 rounded-full bg-green-400 text-black font-extrabold hover:bg-green-300 transition shadow-lg shadow-green-500/30">▶ Play</button>
        </div>
      </div>
    </main>
  );
}
