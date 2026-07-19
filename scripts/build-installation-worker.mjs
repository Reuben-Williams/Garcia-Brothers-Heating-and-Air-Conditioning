import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build } from "esbuild";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutfile = resolve(projectRoot, "netlify/.generated-functions/installation-worker.mjs");

export async function buildInstallationWorker(outfile = defaultOutfile) {
  await mkdir(dirname(outfile), { recursive: true });
  await build({
    absWorkingDir: projectRoot,
    entryPoints: ["netlify/functions/installation-worker.mjs"],
    outfile,
    bundle: true,
    platform: "node",
    target: "node22",
    format: "esm",
    packages: "bundle",
    conditions: ["react-server"],
    legalComments: "none",
    logLevel: "warning",
  });
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) await buildInstallationWorker();
