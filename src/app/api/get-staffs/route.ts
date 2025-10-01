import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const staffs = await prisma.user.findMany({
      where: {
        role: "STAFF",
      },
      include: {
        bookings: true,
      },
    });

    return NextResponse.json(staffs, { status: 200 });
  } catch (error) {
    console.error("Error fetching staffs:", error);
    return NextResponse.json(
      { error: "Failed to fetch staffs" },
      { status: 500 }
    );
  }
}
