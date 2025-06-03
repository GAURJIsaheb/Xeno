import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authResponse = await fetch(new URL("/api/checkauth", request.url), {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });
  const { authenticated } = await authResponse.json(); // Error: HTML response causes JSON.parse to fail
  // ...
  const protectedRoutes = [
    "/dashboard",
    "/campaigns",
    "/segments",
    "/history",
    "/profile",
    "/settings",
    "/create-segment",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (isProtectedRoute && !authenticated) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
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
  ],
};