import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const a = req.body;
  // // if (token) {
  // //   store(token);
  // // }
  // console.log(a);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
