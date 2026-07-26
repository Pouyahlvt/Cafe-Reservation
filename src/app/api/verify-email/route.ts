import { prisma } from "@/src/lib/prisma";
import { resend } from "@/src/lib/resend";
import { NextResponse } from "next/server";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const code = generateCode();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.verificationCode.deleteMany({
      where: {
        email,
      },
    });

    await prisma.verificationCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your verification code",
      html: `
        <h1>Email Verification</h1>
        <p>Your verification code is:</p>
        <h2>${code}</h2>
        <p>This code expires in 5 minutes.</p>
      `,
    });

    return NextResponse.json({
      message: "Verification code created",
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
