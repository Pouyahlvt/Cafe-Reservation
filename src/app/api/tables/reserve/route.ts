import { NextResponse } from "next/server";
import sql from "@/src/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const reservationId = body.reservationId;
    const tableId = Number(body.tableId);
    const date = body.date;
    const meal = body.meal;

    // Validate required values
    if (!reservationId || !tableId || !date || !meal) {
      return NextResponse.json(
        {
          error: "reservationId, tableId, date and meal are required",
        },
        { status: 400 },
      );
    }

    // Validate meal
    if (!["breakfast", "lunch", "dinner"].includes(meal)) {
      return NextResponse.json({ error: "Invalid meal" }, { status: 400 });
    }

    // Check that the reservation exists
    const reservations = await sql`
      SELECT id
      FROM "Reservation"
      WHERE id = ${reservationId}
      LIMIT 1
    `;

    if (reservations.length === 0) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    let result;

    if (meal === "breakfast") {
      result = await sql`
        UPDATE public.table_days
        SET breakfast_reserved = true
        WHERE table_id = ${tableId}
          AND date = ${date}
          AND breakfast_reserved = false
        RETURNING *;
      `;
    }

    if (meal === "lunch") {
      result = await sql`
        UPDATE public.table_days
        SET lunch_reserved = true
        WHERE table_id = ${tableId}
          AND date = ${date}
          AND lunch_reserved = false
        RETURNING *;
      `;
    }

    if (meal === "dinner") {
      result = await sql`
        UPDATE public.table_days
        SET dinner_reserved = true
        WHERE table_id = ${tableId}
          AND date = ${date}
          AND dinner_reserved = false
        RETURNING *;
      `;
    }

    // No row was updated = table was already reserved
    if (!result || result.length === 0) {
      return NextResponse.json(
        {
          error: "This table is already reserved for this meal.",
        },
        { status: 409 },
      );
    }

    // Connect the selected table to the reservation
    const reservationsUpdated = await sql`
      UPDATE "Reservation"
      SET table_id = ${tableId}
      WHERE id = ${reservationId}
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      reservation: reservationsUpdated[0],
    });
  } catch (error) {
    console.error("RESERVE TABLE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to reserve table" },
      { status: 500 },
    );
  }
}
