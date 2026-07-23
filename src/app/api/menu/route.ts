import { NextResponse } from "next/server";
import menu_items from "@/src/data/menu";

export async function GET() {
  return NextResponse.json(menu_items);
}
