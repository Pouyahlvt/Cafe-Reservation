import { NextRequest, NextResponse } from "next/server";
import sql from "@/src/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reservationId: string }> },
) {
  try {
    const { reservationId } = await params;

    if (!reservationId) {
      return NextResponse.json(
        { error: "reservationId is required" },
        { status: 400 },
      );
    }

    const result = await sql`
      SELECT
        id,
        date,
        meal,
        table_id
      FROM "Reservation"
      WHERE id = ${reservationId}
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      reservationId: result[0].id,
      date: result[0].date,
      meal: result[0].meal,
      tableId: result[0].table_id,
    });
  } catch (error) {
    console.error("Get reservation error:", error);

    return NextResponse.json(
      { error: "Failed to get reservation" },
      { status: 500 },
    );
  }
}
