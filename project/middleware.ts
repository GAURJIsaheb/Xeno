import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/campaigns",
  "/segments",
  "/history",
  "/profile",
  "/settings",
  "/create-segment",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // Optionally, call the API route to check auth status
    const response = await fetch(new URL("/api/auth/check", request.url), {
      headers: { cookie: request.headers.get("cookie") || "" },
    });

    if (response.status === 401) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/campaigns/:path*",
    "/segments/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/create-segment/:path*",
    "/",
    "/auth/:path*",
  ],
};