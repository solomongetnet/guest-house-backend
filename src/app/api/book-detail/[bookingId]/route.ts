import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const bookingId = (await params).bookingId;

  try {
    const bookDoc = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
    });

    return NextResponse.json(bookDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookDoc" },
      { status: 500 }
    );
  }
}
