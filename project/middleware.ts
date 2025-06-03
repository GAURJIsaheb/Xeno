import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
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
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => 
    path === route || path.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all protected routes
     */
    "/dashboard/:path*",
    "/campaigns/:path*",
    "/segments/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/create-segment/:path*",
    
    /*
     * Match all public routes that may need auth state
     */
    "/",
    "/auth/:path*",
  ],
};