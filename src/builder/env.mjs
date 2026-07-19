import "server-only";

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server configuration: ${name}`);
  return value;
};

export function readPublicSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  return url && publishableKey ? { url, publishableKey } : null;
}

export function requirePublicSupabaseConfig() {
  return {
    url: required("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: required("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  };
}

export function requireIngestionConfig() {
  return {
    ...requirePublicSupabaseConfig(),
    serviceKey: required("SUPABASE_SERVICE_ROLE_KEY"),
    siteId: required("BUILDER_SITE_UUID"),
    allowedOrigins: required("PUBLIC_SITE_ORIGINS").split(",").map((origin) => origin.trim()).filter(Boolean),
    turnstileHostname: required("TURNSTILE_EXPECTED_HOSTNAME"),
    turnstileSecret: required("TURNSTILE_SECRET_KEY"),
    fingerprintKeyId: required("INGESTION_FINGERPRINT_KEY_ID"),
    fingerprintSecret: required("INGESTION_FINGERPRINT_SECRET"),
  };
}

export function requireBuilderServerConfig() {
  return {
    ...requirePublicSupabaseConfig(),
    serviceKey: required("SUPABASE_SERVICE_ROLE_KEY"),
    siteId: required("BUILDER_SITE_UUID"),
  };
}
