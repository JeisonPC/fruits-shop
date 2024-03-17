export async function GET() {
  const res = await fetch('https://www.fruityvice.com/api/fruit/all', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()

  return Response.json({ data })
}
