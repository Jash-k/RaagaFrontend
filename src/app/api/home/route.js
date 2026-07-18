export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://raagabackend.onrender.com';
  const res = await fetch(`${backend}/home`, { cache: 'no-store' });
  return Response.json(await res.json());
}
