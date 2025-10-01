import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  // const { session, response } = await requireAuth();
  // if (!session) return response!;

  try {
    const res = await auth.api.unbanUser({
      body: {
        userId: userId,
      },
      headers: await headers(),
    });

    await prisma.activity.create({
      data: {
        action: "USER_UNBANNED",
        userId: userId,
        details: {
          status: "USER_UNBANNED",
        },
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error: any) {
    console.error("Error while unbanning guest:", error);
    return NextResponse.json(
      { error: "Failed to unban guest" },
      { status: 500 }
    );
  }
}
