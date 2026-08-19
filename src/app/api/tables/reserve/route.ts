import { NextResponse } from "next/server";
import sql from "@/src/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const reservationId = body.reservationId;
    const tableId = Number(body.tableId);
    const date = body.date;
    const meal = body.meal?.trim().toLowerCase();

    // -----------------------------
    // Validate
    // -----------------------------

    if (!reservationId) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(tableId) || tableId < 1) {
      return NextResponse.json({ error: "Invalid table ID" }, { status: 400 });
    }

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    if (!["breakfast", "lunch", "dinner"].includes(meal)) {
      return NextResponse.json({ error: "Invalid meal" }, { status: 400 });
    }

    // -----------------------------
    // Check reservation exists
    // -----------------------------

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

    // -----------------------------
    // Reserve table for the
    // specific date + meal
    // -----------------------------

    let reservedTable;

    if (meal === "breakfast") {
      reservedTable = await sql`
        UPDATE public.table_days
        SET breakfast_reserved = true
        WHERE table_id = ${tableId}
          AND date = ${date}
          AND breakfast_reserved = false
        RETURNING *;
      `;
    }

    if (meal === "lunch") {
      reservedTable = await sql`
        UPDATE public.table_days
        SET lunch_reserved = true
        WHERE table_id = ${tableId}
          AND date = ${date}
          AND lunch_reserved = false
        RETURNING *;
      `;
    }

    if (meal === "dinner") {
      reservedTable = await sql`
        UPDATE public.table_days
        SET dinner_reserved = true
        WHERE table_id = ${tableId}
          AND date = ${date}
          AND dinner_reserved = false
        RETURNING *;
      `;
    }

    // -----------------------------
    // If nothing was updated,
    // table is already reserved
    // or date/table doesn't exist
    // -----------------------------

    if (!reservedTable || reservedTable.length === 0) {
      return NextResponse.json(
        {
          error: "This table is already reserved for this date and meal",
        },
        { status: 409 },
      );
    }

    // -----------------------------
    // Update existing Reservation
    // -----------------------------

    const updatedReservation = await sql`
      UPDATE "Reservation"
      SET
        date = ${date},
        meal = ${meal},
        table_id = ${tableId}
      WHERE id = ${reservationId}
      RETURNING *;
    `;

    if (updatedReservation.length === 0) {
      return NextResponse.json(
        { error: "Failed to update reservation" },
        { status: 500 },
      );
    }

    // -----------------------------
    // Success
    // -----------------------------

    return NextResponse.json({
      success: true,
      reservation: updatedReservation[0],
    });
  } catch (error) {
    console.error("TABLE RESERVE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to reserve table",
      },
      { status: 500 },
    );
  }
}
