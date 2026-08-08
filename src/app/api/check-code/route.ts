import { NextResponse } from "next/server";
import sql from "@/src/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const code = body.code?.trim();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 },
      );
    }

    // 1. Find valid verification code
    const verificationCodes = await sql`
      SELECT *
      FROM "VerificationCode"
      WHERE email = ${email}
        AND code = ${code}
        AND "expiresAt" > CURRENT_TIMESTAMP
      ORDER BY "createdAt" DESC
      LIMIT 1
    `;

    // 2. Code doesn't exist or expired
    if (verificationCodes.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 },
      );
    }

    // 3. Mark user as verified
    const users = await sql`
      UPDATE "User"
      SET verified = true
      WHERE email = ${email}
      RETURNING *
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Delete used verification code
    await sql`
      DELETE FROM "VerificationCode"
      WHERE email = ${email}
    `;

    // 5. Return verified user
    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      user: users[0],
    });
  } catch (error) {
    console.error("CHECK CODE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 },
    );
  }
}

// replace prisma
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { email, code } = await request.json();

//     const verification = await prisma.verificationCode.findFirst({
//       where: {
//         email,
//         code,
//       },
//     });

//     if (!verification) {
//       return NextResponse.json(
//         {
//           error: "Invalid code",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     if (verification.expiresAt < new Date()) {
//       return NextResponse.json(
//         {
//           error: "Code expired",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     const user = await prisma.user.upsert({
//       where: {
//         email,
//       },
//       update: {
//         verified: true,
//       },
//       create: {
//         email,
//         verified: true,
//       },
//     });

//     await prisma.verificationCode.delete({
//       where: {
//         id: verification.id,
//       },
//     });

//     const cookieStore = await cookies();

//     cookieStore.set("verified", "true", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 10,
//     });

//     return NextResponse.json({
//       message: "Email verified successfully",
//       user,
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
