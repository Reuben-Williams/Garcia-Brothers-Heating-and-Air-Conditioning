import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const execFileAsync = promisify(execFile);

test("builder config declares the approved stable site, routes, and protected editor", async () => {
  const config = await read("builder.config.mjs");
  assert.match(config, /siteId:\s*"garcia-brothers-hvac"/);
  assert.match(config, /path:\s*"\/admin\/editor",\s*protected:\s*true/);
  for (const path of ["/", "/about", "/services", "/projects", "/reviews", "/contact"]) {
    assert.match(config, new RegExp(`path:\\s*${JSON.stringify(path).replaceAll("/", "\\/")}`));
  }
  for (const id of [
    "global.business.name",
    "collections.services",
    "home.hero.title",
    "about.story.body",
    "services.urgent.cta",
    "projects.gallery.items",
    "reviews.list.items",
    "forms.service-request",
  ]) assert.ok(config.includes(id), `missing stable ID ${id}`);
});

test("server staging is enabled without breaking the existing GitHub Pages export", async () => {
  const config = await read("next.config.mjs");
  const staticBuild = await read("scripts/build-static.mjs");
  assert.match(config, /GITHUB_PAGES/);
  assert.match(config, /\.\.\.\(isGithubPages\s*\?\s*\{\s*output:\s*"export"\s*\}\s*:\s*\{\}\)/s);
  assert.match(config, /outputFileTracingRoot:\s*process\.cwd\(\)/);
  assert.match(config, /transpilePackages/);
  assert.match(staticBuild, /mkdtemp\(join\(cacheRoot,/);
  assert.doesNotMatch(staticBuild, /tmpdir\(\)/);
});

test("editor authentication is production-shaped and contains no acceptance shortcut", async () => {
  const page = await read("app/admin/editor/page.jsx");
  const auth = await read("src/builder/auth.mjs");
  assert.match(page, /requireGarciaMember/);
  assert.match(auth, /requireBuilderMember/);
  assert.match(auth, /builder_site_members/);
  assert.doesNotMatch(`${page}\n${auth}`, /acceptance|test-auth|hard-coded user/i);
});

test("portable package manifest is commit-pinned and contains no machine path", async () => {
  const manifest = JSON.parse(await read("builder-packages.lock.json"));
  const packageJson = await read("package.json");
  assert.equal(manifest.platformCommit, "7865f17");
  assert.equal(manifest.packages.length, 10);
  assert.ok(manifest.packages.every((entry) => /^[a-f0-9]{64}$/.test(entry.sha256)));
  assert.doesNotMatch(packageJson, /D:\\|Project Morales|site-editor-platform/);
});

test("package bootstrap accepts a complete verified offline cache", async () => {
  const root = await mkdtemp(join(tmpdir(), "garcia-builder-packages-"));
  try {
    const contents = Buffer.from("synthetic package");
    const sha256 = createHash("sha256").update(contents).digest("hex");
    await mkdir(join(root, "scripts"), { recursive: true });
    await mkdir(join(root, ".builder", "cache", "packages"), { recursive: true });
    await cp(new URL("../scripts/bootstrap-builder-packages.mjs", import.meta.url), join(root, "scripts", "bootstrap-builder-packages.mjs"));
    await writeFile(join(root, "builder-packages.lock.json"), JSON.stringify({
      version: 1,
      platformCommit: "test",
      packages: [{ file: "synthetic.tgz", sha256 }],
    }));
    await writeFile(join(root, ".builder", "cache", "packages", "synthetic.tgz"), contents);

    const { stdout } = await execFileAsync(process.execPath, [join(root, "scripts", "bootstrap-builder-packages.mjs")], {
      env: { ...process.env, BUILDER_PACKAGE_SOURCE_DIR: "", BUILDER_PACKAGE_BASE_URL: "" },
    });
    assert.match(stdout, /Verified 1 builder packages from test/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("approved high-value regions are selectable in rendered source", async () => {
  const sources = await Promise.all([
    read("app/page.jsx"),
    read("app/about/page.jsx"),
    read("app/services/page.jsx"),
    read("app/projects/page.jsx"),
    read("app/reviews/page.jsx"),
    read("src/components/ServiceRequestForm.jsx"),
  ]);
  const renderedSource = sources.join("\n");
  for (const id of [
    "home.hero.title",
    "about.story.body",
    "services.urgent.cta",
    "projects.gallery.items",
    "reviews.list.items",
    "forms.service-request",
  ]) assert.ok(renderedSource.includes(`data-builder-region=\"${id}\"`), `missing rendered region ${id}`);
});
