import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/app/lib/jwt";
import { parse } from "cookie";

export async function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    // ✅ No token at all, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await verifyJWT(token); // ✅ Throws if token is invalid
    return NextResponse.next(); // Valid token → allow
  } catch {
    return NextResponse.redirect(new URL("/login", req.url)); // Invalid token → redirect
  }
}

export const config = {
  matcher: [
    // Only protect app pages, not static files or the login page
    "/((?!api|_next/static|_next/image|_next/font|public|images|assets|img|fonts|favicon.ico|login).*)",
  ],
};