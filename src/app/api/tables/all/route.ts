import { NextResponse } from "next/server";
import sql from "@/src/lib/db";

export async function GET() {
  try {
    // Make sure the next 7 days exist
    await sql`
      INSERT INTO public.table_days (
        table_id,
        date,
        breakfast_reserved,
        lunch_reserved,
        dinner_reserved
      )
      SELECT
        t.id,
        d.date::DATE,
        false,
        false,
        false
      FROM public.tables t
      CROSS JOIN generate_series(
        CURRENT_DATE + INTERVAL '1 day',
        CURRENT_DATE + INTERVAL '7 days',
        INTERVAL '1 day'
      ) AS d(date)
      ON CONFLICT (table_id, date) DO NOTHING;
    `;

    // Get all tables for the next 7 days
    const result = await sql`
      SELECT
        td.id,
        td.table_id,
        td.date,
        td.breakfast_reserved,
        td.lunch_reserved,
        td.dinner_reserved,

        t.table_num,
        t.x,
        t.y,
        t.size

      FROM public.table_days td

      INNER JOIN public.tables t
        ON t.id = td.table_id

      WHERE td.date >= CURRENT_DATE + INTERVAL '1 day'
        AND td.date <= CURRENT_DATE + INTERVAL '7 days'

      ORDER BY
        td.date,
        td.table_id;
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error("ALL TABLES API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to get all tables" },
      { status: 500 },
    );
  }
}
