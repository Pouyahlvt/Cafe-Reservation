import { NextResponse } from "next/server";
import sql from "@/src/lib/db";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim();
    const adults = Number(body.adults);
    const children = Number(body.children);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!Number.isInteger(adults) || adults < 1) {
      return NextResponse.json(
        { error: "At least 1 adult is required" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(children) || children < 0) {
      return NextResponse.json(
        { error: "Invalid number of children" },
        { status: 400 },
      );
    }

    if (adults + children > 12) {
      return NextResponse.json(
        { error: "Maximum 12 guests are allowed" },
        { status: 400 },
      );
    }

    const users = await sql`
      SELECT id
      FROM "User"
      WHERE email = ${email}
        AND verified = true
      LIMIT 1
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Verified user not found" },
        { status: 404 },
      );
    }

    const reservationId = randomUUID();

    const reservations = await sql`
      INSERT INTO "Reservation" (
        id,
        name,
        adults,
        children,
        "userId"
      )
      VALUES (
        ${reservationId},
        ${name},
        ${adults},
        ${children},
        ${users[0].id}
      )
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      reservation: reservations[0],
    });
  } catch (error) {
    console.error("DETAIL RESERVATION ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save reservation details" },
      { status: 500 },
    );
  }
}
