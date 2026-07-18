export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://raagabackend.onrender.com';
  const res = await fetch(`${backend}/3sources/trending?lang=Tamil`);
  return Response.json(await res.json());
}
