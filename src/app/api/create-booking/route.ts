import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { data, user } = await req.json();

  const autoApprove = user.role === "STAFF" || user.role === "ADMIN";

  try {
    // Fetch room details to calculate pricing
    const room = await prisma.room.findUnique({
      where: { id: data.roomId },
      select: {
        price: true,
        name: true,
        guestHouse: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Calculate booking duration and total amount
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const baseAmount = room.price * nights;

    // Add any additional fees (you can customize these)
    const serviceFee = baseAmount * 0.1; // 10% service fee
    const taxes = baseAmount * 0.08; // 8% tax
    const totalAmount = baseAmount + serviceFee + taxes;

    const booking = await prisma.booking.create({
      data: {
        userId: data.userId,
        roomId: data.roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: data.guests,
        status: autoApprove ? "APPROVED" : "PENDING",
        approvedById: autoApprove ? user.id : null,
      },
    });

    return NextResponse.json(
      {
        ...booking,
        totalAmount,
        breakdown: {
          baseAmount,
          serviceFee,
          taxes,
          nights,
          pricePerNight: room.price,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while create booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
