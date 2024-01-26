import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("access_Token");
  const pathname = request.nextUrl.pathname;
  const AUTH_URL =
    pathname === "/auth" ||
    pathname === "/auth/login" ||
    pathname === "/auth/signup";

  if (!isLoggedIn && !AUTH_URL) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }

  if (isLoggedIn && AUTH_URL) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
