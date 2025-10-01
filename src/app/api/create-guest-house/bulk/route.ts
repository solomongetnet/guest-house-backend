import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const dummyGuestHouses = [
      {
        name: "Golden Tulip Guest House",
        address: "Bole Road, Addis Ababa, Ethiopia",
        type: "PRIVATE",
        images: [
          {
            name: "golden-tulip-front",
            url: "https://www.travelweekly.com/Hotels/Addis-Ababa-Ethiopia/Golden-Tulip-Addis-Ababa-p9726989",
          },
          {
            name: "skylight-hotel",
            url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/09/7b/ab/ethiopian-skylight-hotel.jpg?w=900&h=-1&s=1",
          },
        ],
        facilities: ["WiFi", "Parking", "Laundry", "Breakfast included"],
        contact: { phone: "+251911234567", email: "info@goldentulip.com" },
        feedback: [
          { user: "Abebe", comment: "Very comfortable stay!" },
          { user: "Mulu", comment: "Great location and service." },
        ],
        about: {
          description:
            "A modern guest house in Addis Ababa with elegant rooms and warm Ethiopian hospitality.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Addis Ababa",
          subcity: "Bole",
          nearby: "Bole International Airport",
        },
      },
      {
        name: "Skylight Guest House",
        address: "Kazanchis, Addis Ababa, Ethiopia",
        type: "SHARED",
        images: [
          {
            name: "marriott-night",
            url: "https://cache.marriott.com/content/dam/marriott-renditions/ADDLC/addlc-hotel-exterior-night-4692-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
          },
          {
            name: "jumeirah-style",
            url: "https://imageio.forbes.com/specials-images/imageserve/68aafd1e6087d1488d23ff9f/Flowing-exterior-lines-of-Dubai-s-Jumeirah-Marsa-Al-Arab--a-new-ultra-luxury-hotel/0x0.jpg?format=jpg&crop=1920,1080,x0,y0,safe&width=960",
          },
        ],
        facilities: ["WiFi", "Gym", "Restaurant"],
        contact: { phone: "+251922345678", email: "contact@skylight.com" },
        feedback: [
          { user: "Selam", comment: "Amazing ambiance!" },
          { user: "Dawit", comment: "Staff were very helpful." },
        ],
        about: {
          description:
            "Located in Kazanchis, this guest house blends traditional Ethiopian charm with modern comfort.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Addis Ababa",
          subcity: "Kazanchis",
          nearby: "UN Conference Center",
        },
      },
      {
        name: "Bahir Dar Lakeside Guest House",
        address: "Lake Tana, Bahir Dar, Ethiopia",
        type: "PRIVATE",
        images: [
          {
            name: "exterior-modern",
            url: "https://image-tc.galaxy.tf/wijpeg-1cxfk0tgtly73azmd0236bo4y/1-hotel-exterior.jpg?width=768&height=336",
          },
          {
            name: "hardrock-style",
            url: "https://hotel.hardrock.com/files/5829/hollywood.jpg",
          },
        ],
        facilities: ["Lake View", "Restaurant", "WiFi"],
        contact: { phone: "+251933456789", email: "stay@bahirdarlakeside.com" },
        feedback: [
          { user: "Mebratu", comment: "Beautiful views of Lake Tana." },
          { user: "Sosina", comment: "Perfect for family stays." },
        ],
        about: {
          description:
            "Peaceful guest house by Lake Tana with boat rides to historic monasteries.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Bahir Dar",
          subcity: "Lake Shore",
          nearby: "Lake Tana Monasteries",
        },
      },
      {
        name: "Gondar Castle View Guest House",
        address: "Piassa, Gondar, Ethiopia",
        type: "SHARED",
        images: [
          {
            name: "kayak-hotel",
            url: "https://www.ca.kayak.com/rimg/dimg/dynamic/186/2023/08/295ffd3a54bd51fc33810ce59382d1da.webp",
          },
          {
            name: "bellagio-hotel",
            url: "https://thelibrary.mgmresorts.com/transform/gDVfq1q8t61/18-BEL-03963-0048---Bellagio-Hero-Shot---Resize-v00PP",
          },
        ],
        facilities: ["WiFi", "Restaurant", "Laundry"],
        contact: { phone: "+251945678901", email: "info@gondarcastleview.com" },
        feedback: [
          { user: "Fitsum", comment: "Amazing castle view from the balcony." },
          { user: "Tigist", comment: "Very affordable and clean." },
        ],
        about: {
          description:
            "Guest house near Gondar Castle offering stunning views and warm hospitality.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Gondar",
          subcity: "Piassa",
          nearby: "Fasil Ghebbi (Royal Enclosure)",
        },
      },
      {
        name: "Hawassa Lake Guest House",
        address: "Amora Gedel, Hawassa, Ethiopia",
        type: "PRIVATE",
        images: [
          {
            name: "golden-tulip-front",
            url: "https://www.travelweekly.com/Hotels/Addis-Ababa-Ethiopia/Golden-Tulip-Addis-Ababa-p9726989",
          },
          {
            name: "skylight-hotel",
            url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/09/7b/ab/ethiopian-skylight-hotel.jpg?w=900&h=-1&s=1",
          },
        ],
        facilities: ["Lake Access", "WiFi", "Restaurant"],
        contact: {
          phone: "+251955512345",
          email: "contact@hawassalakeguest.com",
        },
        feedback: [
          { user: "Kebede", comment: "Best fish dishes by the lake." },
          { user: "Rahel", comment: "Peaceful and family-friendly." },
        ],
        about: {
          description:
            "A lakeside guest house in Hawassa known for its serene environment and traditional food.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Hawassa",
          subcity: "Amora Gedel",
          nearby: "Lake Hawassa",
        },
      },
      {
        name: "Lalibela Rock Guest House",
        address: "Center, Lalibela, Ethiopia",
        type: "SHARED",
        images: [
          {
            name: "marriott-night",
            url: "https://cache.marriott.com/content/dam/marriott-renditions/ADDLC/addlc-hotel-exterior-night-4692-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
          },
          {
            name: "jumeirah-style",
            url: "https://imageio.forbes.com/specials-images/imageserve/68aafd1e6087d1488d23ff9f/Flowing-exterior-lines-of-Dubai-s-Jumeirah-Marsa-Al-Arab--a-new-ultra-luxury-hotel/0x0.jpg?format=jpg&crop=1920,1080,x0,y0,safe&width=960",
          },
        ],
        facilities: ["WiFi", "Breakfast", "Tour Guide Service"],
        contact: { phone: "+251977654321", email: "info@lalibelaguest.com" },
        feedback: [
          {
            user: "Yohannes",
            comment: "Great for visiting the rock-hewn churches.",
          },
          { user: "Hirut", comment: "Friendly hosts and clean rooms." },
        ],
        about: {
          description:
            "Located in Lalibela, this guest house offers easy access to the famous rock-hewn churches.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Lalibela",
          subcity: "Center",
          nearby: "Rock-Hewn Churches",
        },
      },
      {
        name: "Dire Dawa Heritage Guest House",
        address: "Kezira, Dire Dawa, Ethiopia",
        type: "PRIVATE",
        images: [
          {
            name: "exterior-modern",
            url: "https://image-tc.galaxy.tf/wijpeg-1cxfk0tgtly73azmd0236bo4y/1-hotel-exterior.jpg?width=768&height=336",
          },
          {
            name: "hardrock-style",
            url: "https://hotel.hardrock.com/files/5829/hollywood.jpg",
          },
        ],
        facilities: ["WiFi", "Parking", "Garden"],
        contact: { phone: "+251933221144", email: "info@diredawaguest.com" },
        feedback: [
          { user: "Ahmed", comment: "Loved the cultural touch of the rooms." },
          { user: "Sara", comment: "Close to the old railway station." },
        ],
        about: {
          description:
            "A heritage-style guest house in Dire Dawa offering comfort and cultural experience.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Dire Dawa",
          subcity: "Kezira",
          nearby: "Old Railway Station",
        },
      },
      {
        name: "Mekelle Hillside Guest House",
        address: "Ayder, Mekelle, Ethiopia",
        type: "SHARED",
        images: [
          {
            name: "kayak-hotel",
            url: "https://www.ca.kayak.com/rimg/dimg/dynamic/186/2023/08/295ffd3a54bd51fc33810ce59382d1da.webp",
          },
          {
            name: "bellagio-hotel",
            url: "https://thelibrary.mgmresorts.com/transform/gDVfq1q8t61/18-BEL-03963-0048---Bellagio-Hero-Shot---Resize-v00PP",
          },
        ],
        facilities: ["WiFi", "Parking", "Restaurant"],
        contact: { phone: "+251934556677", email: "info@mekelleguest.com" },
        feedback: [
          { user: "Bereket", comment: "Beautiful hillside view." },
          { user: "Selamawit", comment: "Quiet and relaxing place." },
        ],
        about: {
          description:
            "Guest house on the hills of Mekelle with panoramic city views.",
        },
        location: {
          continent: "Africa",
          country: "Ethiopia",
          city: "Mekelle",
          subcity: "Ayder",
          nearby: "Martyrs' Memorial Monument",
        },
      },
    ];

    // Create guest houses in bulk using a loop
    const createdGuestHouses = [];
    for (const guestHouse of dummyGuestHouses) {
      const created = await prisma.guestHouse.create({
        data: {
          name: guestHouse.name,
          address: guestHouse.address,
          type: "PRIVATE",
          images: guestHouse.images,
          facilities: guestHouse.facilities,
          contact: guestHouse.contact,
          feedbacks: guestHouse.feedback,
          about: guestHouse.about?.description
            ? { create: { description: guestHouse.about.description } }
            : undefined,
          location: guestHouse.location
            ? {
                create: {
                  continent: guestHouse.location.continent,
                  country: guestHouse.location.country,
                  city: guestHouse.location.city,
                  subcity: guestHouse.location.subcity,
                  nearby: guestHouse.location.nearby,
                },
              }
            : undefined,
        },
      });
      createdGuestHouses.push(created);
    }

    return NextResponse.json(
      {
        success: true,
        createdCount: createdGuestHouses.length,
        data: createdGuestHouses,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while creating guest houses:", error);
    return NextResponse.json(
      {
        error: "Failed to create guest houses",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
