import "server-only";

import { requireBuilderMember } from "@your-builder/next/auth";
import { createGarciaServerClient } from "./supabase-server.mjs";

export const GARCIA_SITE_KEY = "garcia-brothers-hvac";

export async function requireGarciaMember({ allowedRoles } = {}) {
  const client = await createGarciaServerClient();
  return requireBuilderMember({
    client,
    siteKey: GARCIA_SITE_KEY,
    allowedRoles,
    lookup: async (siteKey, userId) => {
      const { data, error } = await client
        .from("builder_site_members")
        .select("site_id,user_id,role,session_generation,builder_sites!inner(site_key)")
        .eq("user_id", userId)
        .eq("builder_sites.site_key", siteKey)
        .maybeSingle();
      if (error || !data) return null;
      const site = Array.isArray(data.builder_sites) ? data.builder_sites[0] : data.builder_sites;
      if (site?.site_key !== siteKey) return null;
      return {
        siteId: String(data.site_id),
        siteKey,
        userId: String(data.user_id),
        email: null,
        role: data.role,
        previewGeneration: Number(data.session_generation ?? 1),
      };
    },
  });
}
