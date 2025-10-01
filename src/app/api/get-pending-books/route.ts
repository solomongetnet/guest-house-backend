import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // For temporary
  // const { session, response } = await requireAuth();
  // if (!session) return response!;

  try {
    const pendingBooks = await prisma.booking.findMany({
      include: {
        user: true,
        room: true,
      },
    });

    return NextResponse.json(pendingBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending books:", error);
    return NextResponse.json(
      { error: "Failed to pending books" },
      { status: 500 }
    );
  }
}
