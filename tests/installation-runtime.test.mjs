import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}

const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");

test("pins the guided installation CLI to the accepted platform package", async () => {
  const packageJson = await readJson("package.json");
  const lock = await readJson("builder-packages.lock.json");
  const cli = lock.packages.find((entry) => entry.file === "your-builder-cli-0.1.0.tgz");

  assert.equal(lock.platformCommit, "5e62a8a7a2f99a9351d8f3be622db99a0b383914");
  assert.equal(
    packageJson.devDependencies["@your-builder/cli"],
    "file:.builder/cache/packages/your-builder-cli-0.1.0.tgz",
  );
  assert.deepEqual(cli, {
    file: "your-builder-cli-0.1.0.tgz",
    sha256: "c58c772a499ca30c9dc7c29b81869e70d9e4c3fe085fb10c857643aa8c52d298",
  });
});

test("freezes the reviewed Garcia runtime identity and manifest", async () => {
  const manifest = await readJson(".builder/installation-manifest.json");
  const marker = await readJson(".builder/site-runtime.json");

  assert.equal("workerVersion" in manifest, false);
  assert.equal("workerVersion" in marker, false);
  assert.equal(marker.siteDataPlaneSiteId, "850df39c-82e1-4feb-bbbc-05f19a43897c");
  assert.equal(marker.expectedSiteKey, "garcia-brothers-hvac");
  assert.equal(marker.installationManifestSha256, sha256(canonicalJson(manifest)));
  assert.equal(marker.handlerRegistrySha256, sha256("[]"));
  assert.equal(marker.configLoaderContract, "installation-client-config-v1");
  assert.equal(marker.durableStoreContract, "supabase-command-receipts-v1");
  assert.equal(marker.leaseContract, "site-installation-run-lease-v1");
  assert.equal(marker.scheduledInvocationContract, "direct-in-process-v1");
  assert.equal(marker.reachabilityEvidenceRevision, "garcia-netlify-scheduled-v1");
});

test("uses a direct scheduled function without an HTTP worker route", async () => {
  const source = await readFile("netlify/functions/installation-worker.mjs", "utf8");

  assert.match(source, /createSupabaseSiteInstallationRuntime/);
  assert.match(source, /runScheduledInvocation/);
  assert.match(source, /const handlers = Object\.freeze\(\[\]\)/);
  assert.match(source, /schedule:\s*"\*\/5 \* \* \* \*"/);
  assert.doesNotMatch(source, /fetch\s*\(/);
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY.*NEXT_PUBLIC_/);
});

test("prebundles the scheduled worker without portable package imports", async () => {
  const outputDir = await mkdtemp(join(tmpdir(), "garcia-installation-worker-"));
  try {
    const { buildInstallationWorker } = await import("../scripts/build-installation-worker.mjs");
    const outfile = join(outputDir, "installation-worker.mjs");
    await buildInstallationWorker(outfile);
    const bundle = await readFile(outfile, "utf8");

    assert.match(bundle, /installation-worker/);
    assert.match(bundle, /\*\/5 \* \* \* \*/);
    assert.doesNotMatch(bundle, /from\s+["']@your-builder\//);
    assert.doesNotMatch(bundle, /import\s*\(["']@your-builder\//);
    const worker = await import(`${pathToFileURL(outfile).href}?test=${Date.now()}`);
    assert.equal(typeof worker.default, "function");
  } finally {
    await rm(outputDir, { recursive: true, force: true });
  }
});

test("documents every server-only installation variable", async () => {
  const example = await readFile(".env.example", "utf8");
  for (const name of [
    "BUILDER_CONTROL_PLANE_URL",
    "BUILDER_INSTALLATION_ID",
    "BUILDER_INSTALLATION_KEY_ID",
    "BUILDER_INSTALLATION_PRIVATE_JWK",
  ]) {
    assert.match(example, new RegExp(`^${name}=$`, "m"));
    assert.doesNotMatch(example, new RegExp(`^NEXT_PUBLIC_${name}=`, "m"));
  }
});
