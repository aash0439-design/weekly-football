import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const organizerCookie = request.cookies.get("organizer");

  if (organizerCookie?.value !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/organizer/:path*"],
};