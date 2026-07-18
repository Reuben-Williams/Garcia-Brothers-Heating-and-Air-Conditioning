import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(join(root, "builder-packages.lock.json"), "utf8"));
const destination = join(root, ".builder", "cache", "packages");
const localSource = process.env.BUILDER_PACKAGE_SOURCE_DIR;
const baseUrl = process.env.BUILDER_PACKAGE_BASE_URL?.replace(/\/$/, "");
const token = process.env.BUILDER_PACKAGE_TOKEN;

function digest(contents) {
  return createHash("sha256").update(contents).digest("hex");
}

async function valid(path, expected) {
  try {
    return digest(await readFile(path)) === expected;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

await mkdir(destination, { recursive: true });
for (const entry of manifest.packages) {
  if (basename(entry.file) !== entry.file || !/^[a-f0-9]{64}$/.test(entry.sha256)) {
    throw new Error("Invalid builder package lock entry.");
  }
  const target = join(destination, entry.file);
  if (await valid(target, entry.sha256)) continue;
  if (!localSource && !baseUrl) {
    throw new Error(`Package ${entry.file} is missing or invalid. Set BUILDER_PACKAGE_SOURCE_DIR or BUILDER_PACKAGE_BASE_URL to restore it.`);
  }
  if (localSource) {
    await copyFile(join(resolve(localSource), entry.file), target);
  } else {
    const response = await fetch(`${baseUrl}/${encodeURIComponent(entry.file)}`, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });
    if (!response.ok) throw new Error(`Builder package download failed: ${response.status}`);
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
  }
  if (!(await valid(target, entry.sha256))) throw new Error(`Builder package checksum failed: ${entry.file}`);
}
console.log(`Verified ${manifest.packages.length} builder packages from ${manifest.platformCommit}.`);
