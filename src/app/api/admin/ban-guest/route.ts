import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, banReason } = await req.json();

  // const { session, response } = await requireAuth();
  // if (!session) return response!;

  try {
    const res = await auth.api.banUser({
      body: {
        userId: userId,
        banReason: banReason,
      },
      headers: await headers(),
    });

    await prisma.activity.create({
      data: {
        action: "USER_BANNED",
        userId: userId,
        details: {
          status: "USER_BANNED",
          reason: banReason,
        },
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error: any) {
    console.error("Error while banning guest:", error);
    return NextResponse.json({ error: "Failed to ban guest" }, { status: 500 });
  }
}
