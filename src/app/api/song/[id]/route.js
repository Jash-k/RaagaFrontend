export async function GET(req, { params }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://raagabackend.onrender.com';
  const res = await fetch(`${backend}/song/${params.id}`);
  return Response.json(await res.json());
}
