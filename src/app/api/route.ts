import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

type game = {
    id: number,
    numbers: number[]
}


export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const all = searchParams.get('all');
    try {

        const count =
            await sql`SELECT COUNT(*) FROM Games`

        const countNumber: number = parseInt(count.rows[0].count)

        const game = all ? await sql`SELECT * FROM Games` : await sql`SELECT * FROM Games WHERE id = ${id || countNumber}`;

        const finalResponse = game.rows
        return NextResponse.json({ games: finalResponse }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


export async function POST() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS Games ( id SERIAL PRIMARY KEY, numbers INT[] );`;

        const count =
            await sql`SELECT COUNT(*) FROM Games`

        const countNumber: number = parseInt(count.rows[0].count)

        //createGame 
        await sql`INSERT INTO Games(id, numbers) VALUES (${countNumber + 1}, '{}')`

        const selectLastGame =
            await sql`SELECT * FROM Games WHERE id = ${countNumber + 1}`;

        const lastGame = selectLastGame.rows[0]

        return NextResponse.json({ ...lastGame }, { status: 200 });
    } catch (e) {
        return new Response(`Error: Could't create the game. ${e}`, {
            status: 400,
        })
    }
}


export async function PATCH(request: Request) {
    try {
        const body: game = await request.json()

        const newGame = `{${body.numbers.join(',')}}`;

        await sql`UPDATE Games SET numbers = ${newGame}::integer[] WHERE id = ${body.id};`

        return Response.json({
            currentGame: body, message: "Game succesfully modified!"
        })
    } catch (e) {
        return new Response(`Error: Could't change the game. Check if the id is correct.`, {
            status: 400,
        })
    }
}
