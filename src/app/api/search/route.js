export async function GET(req) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://raagabackend.onrender.com';
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const res = await fetch(`${backend}/search?q=${encodeURIComponent(q)}`);
  return Response.json(await res.json());
}
