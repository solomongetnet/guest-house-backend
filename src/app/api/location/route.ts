import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch unique cities and subcities from Location model
    const locations = await prisma.location.findMany({
      select: {
        city: true,
        subcity: true,
      },
      orderBy: {
        city: "asc",
      },
    });

    // Extract unique city and subcity names
    const uniqueCities = Array.from(
      new Set(locations.map((loc) => loc.city))
    ).filter(Boolean);

    const cityWithSubcities: Record<string, string[]> = {};

    // Group subcities under each city
    for (const loc of locations) {
      if (!cityWithSubcities[loc.city]) {
        cityWithSubcities[loc.city] = [];
      }
      if (loc.subcity && !cityWithSubcities[loc.city].includes(loc.subcity)) {
        cityWithSubcities[loc.city].push(loc.subcity);
      }
    }

    return NextResponse.json(
      {
        cities: uniqueCities.sort((a, b) => a.localeCompare(b)),
        cityWithSubcities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
