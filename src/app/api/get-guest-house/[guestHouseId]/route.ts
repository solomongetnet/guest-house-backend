import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ guestHouseId: string }> }
) {
  const { guestHouseId } = await params;
  try {
    const guestHouse = await prisma.guestHouse.findUnique({
      where: { id: guestHouseId },
      include: {
        rooms: true,
        location: true,
        about: { include: { review: true } },
      },
    });

    return NextResponse.json(guestHouse, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest house:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest house" },
      { status: 500 }
    );
  }
}
