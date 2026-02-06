// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // Define the path pattern for admin routes
  const adminPathPattern = /^\/admin(?!\/login).*/;

  // If user is on login page and already has a token, redirect to /admin
  if (request.nextUrl.pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Check if the current path is an admin route (but not the login page)
  if (adminPathPattern.test(request.nextUrl.pathname)) {
    // If token doesn't exist, redirect to the login page
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);

      // Preserve the original URL to redirect back after login
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }

    // If token exists, allow the request to proceed
    return NextResponse.next();
  }

  // For non-admin routes or admin login, do nothing (allow access)
  return NextResponse.next();
}

// Configure the middleware to only run for admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
