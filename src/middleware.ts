import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const admin = cookieStore.get("admin_data");
  const refreshToken = cookieStore.get("refresh_token");
  const accessToken = cookieStore.get("access_token");

  if (admin) {
    if (!refreshToken || !accessToken) {
      return NextResponse.redirect(new URL("/auth?status=500", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth?status=401", req.url));

  // return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
