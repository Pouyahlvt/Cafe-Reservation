import { NextResponse } from "next/server";
import sql from "@/src/lib/db";
import { randomUUID } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Create user if it doesn't already exist
    const users = await sql`
      INSERT INTO "User" (
        id,
        email
      )
      VALUES (
        ${randomUUID()},
        ${email}
      )
      ON CONFLICT (email)
      DO UPDATE SET email = EXCLUDED.email
      RETURNING *
    `;

    const user = users[0];

    // 2. Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Code expires in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 4. Delete old codes for this email
    await sql`
      DELETE FROM "VerificationCode"
      WHERE email = ${email}
    `;

    // 5. Save new verification code
    await sql`
      INSERT INTO "VerificationCode" (
        id,
        email,
        code,
        "expiresAt"
      )
      VALUES (
        ${randomUUID()},
        ${email},
        ${code},
        ${expiresAt}
      )
    `;

    // 6. Send email
    await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Your verification code",
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${code}</h1>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent",
      user,
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 },
    );
  }
}
// replace Prism
// import { resend } from "@/src/lib/resend";
// import { NextResponse } from "next/server";

// function generateCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export async function POST(request: Request) {
//   try {
//     const { email } = await request.json();

//     const code = generateCode();

//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     await prisma.verificationCode.deleteMany({
//       where: {
//         email,
//       },
//     });

//     await prisma.verificationCode.create({
//       data: {
//         email,
//         code,
//         expiresAt,
//       },
//     });

//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "Your verification code",
//       html: `
//         <h1>Email Verification</h1>
//         <p>Your verification code is:</p>
//         <h2>${code}</h2>
//         <p>This code expires in 5 minutes.</p>
//       `,
//     });

//     return NextResponse.json({
//       message: "Verification code created",
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json(
//       {
//         error: "Something went wrong",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
