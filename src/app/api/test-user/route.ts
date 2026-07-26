import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        email: body.email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
