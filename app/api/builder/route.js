import { createSupabaseAdapter } from "@your-builder/core";
import { createBuilderRouteHandlers } from "@your-builder/next/routes";
import site from "../../../builder.config.mjs";
import { requireGarciaMember } from "@/builder/auth.mjs";
import { requireBuilderServerConfig } from "@/builder/env.mjs";

async function dispatch(method, request) {
  const member = await requireGarciaMember();
  const config = requireBuilderServerConfig();
  const adapter = createSupabaseAdapter({ url: config.url, serviceKey: config.serviceKey });
  const handlers = createBuilderRouteHandlers({
    site: { ...site, siteId: member.siteId },
    adapter,
    getUserId: () => member.userId,
  });
  return handlers[method](request);
}

async function safely(method, request) {
  try {
    return await dispatch(method, request);
  } catch (error) {
    const status = error?.status === 401 || error?.status === 403 ? error.status : 503;
    const code = status === 401 ? "AUTH_REQUIRED" : status === 403 ? "SITE_ACCESS_DENIED" : "BUILDER_UNAVAILABLE";
    return Response.json({ error: { code, message: status === 503 ? "The editor service is temporarily unavailable." : "Editor access is required." } }, { status, headers: { "cache-control": "no-store" } });
  }
}

export const GET = (request) => safely("GET", request);
export const POST = (request) => safely("POST", request);
export const PUT = (request) => safely("PUT", request);
export const PATCH = (request) => safely("PATCH", request);
