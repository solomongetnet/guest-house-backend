import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        GuestHouse: true,
        room: true,
        user: true,
      },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
