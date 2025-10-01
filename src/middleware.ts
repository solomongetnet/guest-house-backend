import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://adminify-web.vercel.app",
  "https://adminify-app.onrender.com",
  "https://adminify-api.onrender.com",
];

export function middleware(req: NextRequest) {
  const requestOrigin = req.headers.get("origin") || ""; // get actual request origin
  const origin = allowedOrigins.includes(requestOrigin) ? requestOrigin : ""; // only allow if in allowedOrigins

  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT,PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // For all other requests, continue and add CORS headers
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,DELETE,PUT,PATCH"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return res;
}

export const config = {
  matcher: "/:path*",
};
