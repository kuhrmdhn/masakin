import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const params = request.nextUrl.searchParams.get("q");
  if(params) {
    headers.set("search-params", params);
    return NextResponse.next({ headers });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
