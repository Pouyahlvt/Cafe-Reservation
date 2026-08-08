import sql from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id, email, name } = body;

    const users = await sql`
      INSERT INTO "User" (
        id,
        email,
        name
      )
      VALUES (
        ${id},
        ${email},
        ${name}
      )
      RETURNING *
    `;

    return NextResponse.json(users[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await sql`
      SELECT *
      FROM "User"
      ORDER BY "createdAt" DESC
    `;

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}
