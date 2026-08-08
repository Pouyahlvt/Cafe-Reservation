import sql from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      SELECT NOW() AS time
    `;

    return NextResponse.json({
      success: true,
      databaseTime: result[0].time,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 },
    );
  }
}
