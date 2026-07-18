import { createBuilderServerClient } from "@your-builder/next/auth";
import { NextResponse } from "next/server";
import { readPublicSupabaseConfig } from "@/builder/env.mjs";

export async function proxy(request) {
  const config = readPublicSupabaseConfig();
  if (!config) return NextResponse.next({ request });

  let response = NextResponse.next({ request });
  const client = createBuilderServerClient({
    ...config,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  await client.auth.getClaims();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/builder/:path*"],
};
