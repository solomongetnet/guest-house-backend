import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const guests = await prisma.user.findMany({
      where: {
        role: "GUEST",
      },
      include: {
        bookings: true,
      },
    });

    return NextResponse.json(guests, { status: 200 });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}
