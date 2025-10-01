import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ guestHouseId: string }> }
) {
  const { guestHouseId } = await params;
  const user = await req.json();

  try {
    const existingGuestHouse = await prisma.guestHouse.findUnique({
      where: { id: guestHouseId },
    });

    if (!existingGuestHouse) {
      return NextResponse.json(
        { error: "Guest house not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.room.deleteMany({ where: { guestHouseId } }),
      prisma.booking.deleteMany({ where: { guestHouseId } }),
      prisma.guestHouse.delete({ where: { id: guestHouseId } }),
    ]);

    await prisma.activity.create({
      data: {
        action: "DELETE_GUEST_HOUSE",
        userId: user.id,
        details: {
          status: "DELETE_GUEST_HOUSE",
          guestHouseName: existingGuestHouse.name,
        },
      },
    });

    return NextResponse.json(
      { message: "Guest house deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting guest house:", error);
    return NextResponse.json(
      { error: "Failed to delete guest house" },
      { status: 500 }
    );
  }
}
