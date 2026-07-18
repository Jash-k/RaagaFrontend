export async function GET(req, { params }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://raagabackend.onrender.com';
  // Try jiosaavn first; adjust source as needed
  const res = await fetch(`${backend}/3sources/song/jiosaavn/${params.id}`);
  return Response.json(await res.json());
}
