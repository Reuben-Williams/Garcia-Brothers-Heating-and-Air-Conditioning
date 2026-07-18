import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageDirectory = join(root, ".builder", "cache", "packages");

test("checksum-locked builder packages are committed for clean deploys", async () => {
  const manifest = JSON.parse(
    await readFile(join(root, "builder-packages.lock.json"), "utf8"),
  );
  const trackedFiles = new Set(
    execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean),
  );

  for (const entry of manifest.packages) {
    const packagePath = join(packageDirectory, entry.file);
    const repositoryPath = relative(root, packagePath).replaceAll("\\", "/");
    const contents = await readFile(packagePath);
    const sha256 = createHash("sha256").update(contents).digest("hex");

    assert.equal(sha256, entry.sha256, `${entry.file} does not match its lock`);
    assert.equal(
      trackedFiles.has(repositoryPath),
      true,
      `${repositoryPath} must be committed for clean Netlify installs`,
    );
  }
});
