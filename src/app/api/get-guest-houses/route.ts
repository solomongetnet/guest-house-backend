import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxPrice = parseInt(searchParams.get("maxPrice") || "10000", 10);
    const city = searchParams.get("city") || undefined;
    const subcity = searchParams.get("subcity") || undefined;
    const type = searchParams.get("type") || undefined;
    const search = searchParams.get("search") || undefined;

    // 🧠 Build dynamic Prisma filter
    const filters: any = {
      AND: [],
    };

    // Filter by city or subcity (Location)
    if (city || subcity) {
      filters.AND.push({
        location: {
          ...(city && { city: { equals: city, mode: "insensitive" } }),
          ...(subcity && { subcity: { equals: subcity, mode: "insensitive" } }),
        },
      });
    }

    // Filter by guest house type (PRIVATE / SHARED)
    if (type) {
      filters.AND.push({
        type: type.toUpperCase(),
      });
    }

    // Filter by room price range
    if (minPrice > 0 || maxPrice < 10000) {
      filters.AND.push({
        rooms: {
          some: {
            price: {
              gte: minPrice,
              lte: maxPrice,
            },
          },
        },
      });
    }

    // Powerful search across multiple fields
    if (search) {
      filters.AND.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { location: { city: { contains: search, mode: "insensitive" } } },
          { location: { subcity: { contains: search, mode: "insensitive" } } },
          {
            about: {
              some: {
                review: {
                  some: { comment: { contains: search, mode: "insensitive" } },
                },
              },
            },
          },
        ],
      });
    }

    const guestHouses = await prisma.guestHouse.findMany({
      where: filters.AND.length > 0 ? filters : undefined,
      include: {
        rooms: true,
        location: true,
        about: { include: { review: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(guestHouses, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest houses:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest houses" },
      { status: 500 }
    );
  }
}
