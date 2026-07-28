import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    const verification = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
      },
    });

    if (!verification) {
      return NextResponse.json(
        {
          error: "Invalid code",
        },
        {
          status: 400,
        },
      );
    }

    if (verification.expiresAt < new Date()) {
      return NextResponse.json(
        {
          error: "Code expired",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        verified: true,
      },
      create: {
        email,
        verified: true,
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verification.id,
      },
    });

    const cookieStore = await cookies();

    cookieStore.set("verified", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
    });

    return NextResponse.json({
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
