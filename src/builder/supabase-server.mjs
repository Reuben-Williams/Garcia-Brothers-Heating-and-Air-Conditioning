import "server-only";

import { createBuilderServerClient } from "@your-builder/next/auth";
import { cookies } from "next/headers";
import { requirePublicSupabaseConfig } from "./env.mjs";

export async function createGarciaServerClient() {
  const cookieStore = await cookies();
  const config = requirePublicSupabaseConfig();
  return createBuilderServerClient({
    ...config,
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot write cookies; proxy.js performs session refreshes.
        }
      },
    },
  });
}
