import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  const user = await req.json();

  try {
    const room = await prisma.room.delete({
      where: { id: roomId },
    });

    await prisma.activity.create({
      data: {
        action: "DELETE_ROOM",
        userId: user.id,
        details: {
          status: "DELETE_ROOM",
          roomName: room.name,
        },
      },
    });

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error while deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room:" },
      { status: 500 }
    );
  }
}
