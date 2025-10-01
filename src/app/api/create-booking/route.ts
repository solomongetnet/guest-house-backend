import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { data, user } = await req.json();

  // const { session, response } = await requireAuth();
  // if (!session) return response!;

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
            name: true
          }
        }
      }
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    // Calculate booking duration and total amount
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const baseAmount = room.price * nights;
    
    // Add any additional fees (you can customize these)
    const serviceFee = baseAmount * 0.1; // 10% service fee
    const taxes = baseAmount * 0.08; // 8% tax
    const totalAmount = baseAmount + serviceFee + taxes;

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        roomId: data.roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: data.guests,
        status: autoApprove ? "APPROVED" : "PENDING",
        approvedById: autoApprove ? user.id : null,
      },
    });

    if (autoApprove) {
      await prisma.room.update({
        where: { id: data.roomId },
        data: { occupiedById: user.id, availability: false },
      });
    }

    await prisma.activity.create({
      data: {
        action: "BOOKED",
        userId: user.id,
        bookingId: booking.id,
        roomId: data.roomId,
        guestHouseId: data.guestHouseId,
        details: {
          autoApproved: autoApprove,
          status: booking.status,
          amount: totalAmount,
          baseAmount: baseAmount,
          serviceFee: serviceFee,
          taxes: taxes,
          price: room.price,
          nights: nights,
          guests: data.guests,
          roomName: room.name,
          guestHouseName: room.guestHouse.name,
          checkIn: checkInDate.toISOString(),
          checkOut: checkOutDate.toISOString(),
          paymentStatus: "PENDING", 
          currency: "ETB", 
        },
      },
    });

    return NextResponse.json({
      ...booking,
      totalAmount,
      breakdown: {
        baseAmount,
        serviceFee,
        taxes,
        nights,
        pricePerNight: room.price
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error while create booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}