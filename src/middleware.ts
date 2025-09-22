import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public pages
const publicPaths = ["/", "/signIn", "/bikes"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public pages
  if (publicPaths.some((path) => path === pathname)) {
    return NextResponse.next();
  }

  // Get token & role from cookies
  const token = req.cookies.get("authToken")?.value;
  const role = req.cookies.get("role")?.value;

  if (process.env.NEXT_PUBLIC_MODE === "DEV") {
    return NextResponse.next();
  }
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/signIn";
    return NextResponse.redirect(url);
  }

  // Admin check
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
