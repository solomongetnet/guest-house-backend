import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  }
}
