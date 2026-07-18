import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, rm, symlink } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const root = resolve(process.cwd());
const cacheRoot = join(root, ".builder", "cache");
await mkdir(cacheRoot, { recursive: true });
const staging = await mkdtemp(join(cacheRoot, "garcia-static-export-"));
const sourceEntries = [
  "app", "public", "src", "jsconfig.json", "next.config.mjs", "package.json", "package-lock.json",
];

try {
  await Promise.all(sourceEntries.map((entry) => cp(join(root, entry), join(staging, entry), { recursive: true })));
  await rm(join(staging, "app", "admin"), { recursive: true, force: true });
  await rm(join(staging, "app", "api"), { recursive: true, force: true });
  await symlink(join(root, "node_modules"), join(staging, "node_modules"), "junction");

  const result = spawnSync(
    process.execPath,
    [join(root, "node_modules", "next", "dist", "bin", "next"), "build", "--webpack"],
    { cwd: staging, env: { ...process.env, GITHUB_PAGES: "true" }, stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else {
    const output = join(root, "out");
    await rm(output, { recursive: true, force: true });
    await mkdir(output, { recursive: true });
    await cp(join(staging, "out"), output, { recursive: true });
    console.log(`Static brochure exported to ${basename(output)}${process.platform === "win32" ? "\\" : "/"}.`);
  }
} finally {
  await rm(staging, { recursive: true, force: true });
}
