import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    if (!values || !values.name) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    const guestHouseType = values.type === "Shared" ? "SHARED" : "PRIVATE";

    const guestHouse = await prisma.guestHouse.create({
      data: {
        name: values.name,
        address: values.address,
        type: guestHouseType,
        images: values.images || [],
        facilities: values.facilities.toString(),
        contact: values.contact || {},
        feedbacks: values.feedback || [],
        about: values.about?.description
          ? {
              create: {
                description: values.about.description,
              },
            }
          : undefined,

        location: values.location
          ? {
              create: {
                continent: values.location.continent || "",
                country: values.location.country || "",
                city: values.location.city || "",
                subcity: values.location.subcity || "",
                nearby: values.location.nearby || "",
              },
            }
          : undefined,
      },
    });

    console.log("Guest house created successfully:", guestHouse.id);

    return NextResponse.json(
      {
        success: true,
        id: guestHouse.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while creating guest house:", error);
    return NextResponse.json(
      {
        error: "Failed to create guest house",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
