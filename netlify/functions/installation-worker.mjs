import { createClient } from "@supabase/supabase-js";
import {
  createSupabaseSiteInstallationRuntime,
  runScheduledInvocation,
} from "@your-builder/next/control-plane";

import installationManifest from "../../.builder/installation-manifest.json" with { type: "json" };
import siteRuntimeMarker from "../../.builder/site-runtime.json" with { type: "json" };

const handlers = Object.freeze([]);
const installationEnvironmentNames = Object.freeze([
  "BUILDER_CONTROL_PLANE_URL",
  "BUILDER_INSTALLATION_ID",
  "BUILDER_INSTALLATION_KEY_ID",
  "BUILDER_INSTALLATION_PRIVATE_JWK",
]);

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error("installation_config_required");
  return value;
}

function assertInstallationEnvironment() {
  for (const name of installationEnvironmentNames) required(name);
}

function createHealthSource(supabase) {
  return {
    async probeDurableStore() {
      const { error } = await supabase.rpc("builder_get_runtime_site_identity", {
        p_site_id: siteRuntimeMarker.siteDataPlaneSiteId,
      });
      return error === null;
    },
    async readQueues() {
      return {};
    },
    async probeIntegrations() {
      return {};
    },
  };
}

export default async function installationWorker() {
  assertInstallationEnvironment();
  const supabase = createClient(
    required("SUPABASE_URL"),
    required("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const runtime = createSupabaseSiteInstallationRuntime({
    env: process.env,
    marker: siteRuntimeMarker,
    installationManifest,
    handlers,
    healthSource: createHealthSource(supabase),
    supabaseClient: supabase,
  });

  try {
    await runScheduledInvocation(runtime, {
      timeoutSeconds: siteRuntimeMarker.invocationTimeoutSeconds,
    });
  } catch (error) {
    const code = typeof error?.code === "string" ? error.code : "installation_worker_failed";
    console.error(code);
    throw new Error(code);
  }
}

export const config = {
  schedule: "*/5 * * * *",
};
