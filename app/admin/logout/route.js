import { NextResponse } from "next/server";
import { createGarciaServerClient } from "@/builder/supabase-server.mjs";

export async function POST(request) {
  try {
    const client = await createGarciaServerClient();
    await client.auth.signOut({ scope: "local" });
  } catch {
    // Redirect even when the remote session has already expired.
  }
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
