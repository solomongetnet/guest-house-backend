import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ pendingBookId: string }> }
) {
  const { pendingBookId } = await params;
  const { status, user } = await req.json();

  // const { session, response } = await requireAuth();
  // if (!session) return response!;

  if (user.role !== "STAFF" && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: pendingBookId },
      data: {
        status,
        approvedById: user.id,
      },
      include: {
        user: true,
        room: true,
      },
    });

    await prisma.activity.create({
      data: {
        action: status ? "APPROVED_BOOKING" : "REJECTED_BOOKING",
        userId: user.id,
        bookingId: booking.id,
        roomId: booking.roomId,
        guestHouseId: booking.guestHouseId,
        details: {
          status: booking.status,
        },
      },
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest house:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest house" },
      { status: 500 }
    );
  }
}
