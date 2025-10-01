import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    console.log("Received request body:", values);

    if (!values || !values.name || !values.guestHouseId) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }


    if (values.roomId) {
      const existingRoom = await prisma.room.findUnique({
        where: { roomId: values.roomId },
      });

      if (existingRoom) {
        return NextResponse.json(
          { error: "Room ID already exists" },
          { status: 409 }
        );
      }
    }

    const room = await prisma.room.create({
      data: {
        name: values.name,
        roomId: values.roomId,
        type: values.type,
        price: values.price,
        description: values.description || "",
        availability: values.availability ?? true,
        square_meters: values.square_meters || 0,
        max_occupancy: values.max_occupancy || 1,
        beds: values.beds || {
          single_beds: 0,
          double_beds: 0,
          queen_beds: 0,
          king_beds: 0,
          sofa_beds: 0,
          cribs: false,
        },
        living_features: values.living_features || {
          private_bathroom: false,
          bathtub: false,
          shower: false,
          hairdryer: false,
          minibar: false,
          tv: false,
          streaming_tv: false,
          wifi_available: false,
        },
        kitchen_features: values.kitchen_features || {
          coffee_maker: false,
          refrigerator: false,
          microwave: false,
        },
        accessibility: values.accessibility || {
          wheelchair_accessible: false,
        },
        hygiene_features: values.hygiene_features || {
          sanitizer: false,
          hygiene_kits: false,
          digital_keys: false,
        },
        images: values.images || [],
        guestHouse: {
          connect: { id: values.guestHouseId },
        },
        last_updated: new Date(),
      },
    });

    console.log("Room created successfully:", room.id);

    return NextResponse.json(
      {
        success: true,
        data: room,
        message: "Room created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while creating room:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create room",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
