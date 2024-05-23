
type game = {
    id: number,
    numbers: number[]
}
let games: game[] = []

export function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return Response.json({ games })
    try {
        const game = games.filter(item => item.id === parseInt(id))
        return Response.json(game[0])
    }
    catch (e) {
        return new Response(`Error: Game not found`, {
            status: 400,
        })
    }
}


export async function POST() {
    try {
        const id = games.length + 1
        games.push({ id, numbers: [] })
        return Response.json({ id, message: "Game succesfully created!" })
    } catch (e) {
        return new Response(`Error: Could't create the game.`, {
            status: 400,
        })
    }
}


export async function PATCH(request: Request) {
    try {
        const body: game = await request.json()
        games.forEach(game => {
            if (game.id === body.id) {
                game.numbers = body.numbers
            }
        })
        return Response.json({ currentGame: body, message: "Game succesfully modified!" })
    } catch (e) {
        return new Response(`Error: Could't change the game. Check if the id is correct.`, {
            status: 400,
        })
    }
}