import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import {
  createCloudflareTurnstileVerifier,
  createHmacFingerprintService,
  createPublicIngestionRouteHandler,
  createSupabasePublicIngestionService,
  createVercelTrustedNetworkAdapter,
} from "@your-builder/next/ingestion/server";
import { requireIngestionConfig } from "@/builder/env.mjs";
import { services } from "@/content/siteData.mjs";

const FORM_ID = "forms.service-request";
const CONSENT_TEXT = "I agree that Garcia Brothers may contact me about this service request.";

function createHandler() {
  const config = requireIngestionConfig();
  const supabase = createClient(config.url, config.serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  return createPublicIngestionRouteHandler({
    siteId: config.siteId,
    locale: "en-US",
    allowedOrigins: config.allowedOrigins,
    allowedFormIds: [FORM_ID],
    allowedServiceIds: services.map((service) => service.slug),
    consentPolicy: { version: "privacy-v1", purpose: "service_request", acknowledgementText: CONSENT_TEXT },
    rateLimits: { network: { limit: 20, windowMs: 3_600_000 }, identity: { limit: 5, windowMs: 3_600_000 } },
    network: createVercelTrustedNetworkAdapter(),
    fingerprints: createHmacFingerprintService({ keyId: config.fingerprintKeyId, secret: config.fingerprintSecret }),
    turnstile: createCloudflareTurnstileVerifier({
      secret: config.turnstileSecret,
      expectedHostname: config.turnstileHostname,
      expectedAction: "service_request",
    }),
    ingestion: createSupabasePublicIngestionService(supabase),
    now: () => new Date(),
    uuid: randomUUID,
  });
}

export async function POST(request) {
  try {
    return await createHandler().handle(request, { formId: FORM_ID });
  } catch {
    return Response.json({ error: { code: "INGESTION_UNAVAILABLE", message: "Online requests are temporarily unavailable. Please call (551) 379-0300." } }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
