// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const protectedRoutes = [
//   "/dashboard",
//   "/campaigns",
//   "/segments",
//   "/history",
//   "/profile",
//   "/settings",
//   "/create-segment",
// ];

// const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.some(
//     (route) => path === route || path.startsWith(`${route}/`)
//   );

//   if (isProtectedRoute) {
//     const token = request.cookies.get("next-auth.session-token")?.value
//       || request.cookies.get("__Secure-next-auth.session-token")?.value;

//     if (!token) {
//       const url = new URL("/auth/signin", request.url);
//       url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
//       return NextResponse.redirect(url);
//     }

//     try {
//       await jwtVerify(token, secret);
//       // Token is valid, continue
//     } catch (err) {
//       const url = new URL("/auth/signin", request.url);
//       url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/campaigns/:path*",
//     "/segments/:path*",
//     "/history/:path*",
//     "/profile/:path*",
//     "/settings/:path*",
//     "/create-segment/:path*",
//     "/",
//     "/auth/:path*",
//   ],
// };
















import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // Only allow access if user is logged in
      return !!token;
    },
  },
});

// Define which routes to protect
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
