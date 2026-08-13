import { NextRequest, NextResponse } from "next/server";
import sql from "@/src/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date");
    const meal = searchParams.get("meal");

    if (!date || !meal) {
      return NextResponse.json(
        { error: "date and meal are required" },
        { status: 400 },
      );
    }

    if (!["breakfast", "lunch", "dinner"].includes(meal)) {
      return NextResponse.json({ error: "Invalid meal" }, { status: 400 });
    }

    const result = await sql`
      SELECT
        t.id AS table_id,
        t.table_num,
        t.x,
        t.y,
        t.size,

        CASE
          WHEN ${meal} = 'breakfast' THEN td.breakfast_reserved
          WHEN ${meal} = 'lunch' THEN td.lunch_reserved
          WHEN ${meal} = 'dinner' THEN td.dinner_reserved
        END AS reserved

      FROM public.tables t

      LEFT JOIN public.table_days td
        ON td.table_id = t.id
        AND td.date = ${date}

      ORDER BY t.id;
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error("TABLE API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to get tables" },
      { status: 500 },
    );
  }
}
