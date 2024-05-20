type game = {
    id: 'string',
    numbers: number[]
}
const games: game[] = []

export function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return Response.json({ games })
    return Response.json({ id })
}


export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)
    return Response.json(body)
}