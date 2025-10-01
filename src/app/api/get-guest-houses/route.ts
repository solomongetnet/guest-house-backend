import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const guestHouses = await prisma.guestHouse.findMany({
      include: {
        rooms: true,
        location: true,
        about: { include: { review: true } },
      },
    });

    return NextResponse.json(guestHouses, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest houses:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest houses" },
      { status: 500 }
    );
  }
}
