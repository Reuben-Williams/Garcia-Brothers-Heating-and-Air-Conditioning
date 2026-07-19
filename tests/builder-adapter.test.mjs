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

test("builder config gives every reusable record a typed stable region contract", async () => {
  const { default: config } = await import(new URL("../builder.config.mjs", import.meta.url));
  const allRegions = [
    ...(config.globalRegions ?? []),
    ...config.pages.flatMap((page) => page.regions ?? []),
  ];
  const ids = allRegions.map((region) => typeof region === "string" ? region : region.id);

  assert.equal(new Set(ids).size, ids.length, "region IDs must be unique across global and page content");
  assert.ok(allRegions.every((region) => typeof region === "object" && region.kind && region.label));
  for (const id of [
    "global.navigation.home",
    "global.footer.brand-summary",
    "collections.services.heater-repair-furnace-replacement.title",
    "collections.projects.project-01.image",
    "collections.reviews.collin-soto.quote",
    "collections.faqs.tight-attic.question",
    "forms.service-request.message.placeholder",
    "forms.service-request.submit.label",
  ]) assert.ok(ids.includes(id), `missing typed reusable region ${id}`);
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
  assert.equal(manifest.platformCommit, "682e89e87ebf5fd49c9f99a304603bf9fdfeb5ba");
  assert.equal(manifest.packages.length, 11);
  assert.ok(manifest.packages.every((entry) => /^[a-f0-9]{64}$/.test(entry.sha256)));
  assert.doesNotMatch(packageJson, /D:\\|Project Morales|site-editor-platform/);
});

test("checksum manifest and npm lock both match every packaged artifact", async () => {
  const manifest = JSON.parse(await read("builder-packages.lock.json"));
  const packageLock = JSON.parse(await read("package-lock.json"));
  const lockedByFile = new Map(Object.values(packageLock.packages)
    .filter((entry) => entry?.resolved?.startsWith("file:.builder/cache/packages/"))
    .map((entry) => [entry.resolved.split("/").at(-1), entry]));

  for (const entry of manifest.packages) {
    const contents = await readFile(new URL(`../.builder/cache/packages/${entry.file}`, import.meta.url));
    assert.equal(createHash("sha256").update(contents).digest("hex"), entry.sha256);
    assert.equal(
      lockedByFile.get(entry.file)?.integrity,
      `sha512-${createHash("sha512").update(contents).digest("base64")}`,
      `npm integrity mismatch for ${entry.file}`,
    );
  }
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
  ]) assert.ok(
    renderedSource.includes(`data-builder-region=\"${id}\"`) || renderedSource.includes(`regionId=\"${id}\"`),
    `missing rendered region ${id}`,
  );
});

test("shared chrome, collections, and forms expose stable item, instance, and target metadata", async () => {
  const sources = await Promise.all([
    read("src/components/Header.jsx"),
    read("src/components/Footer.jsx"),
    read("src/components/ServiceGrid.jsx"),
    read("src/components/ProjectGallery.jsx"),
    read("src/components/Reviews.jsx"),
    read("src/components/ServiceRequestForm.jsx"),
  ]);
  const renderedSource = sources.join("\n");

  assert.match(renderedSource, /data-builder-scope=[{]?['"]global['"]/);
  assert.match(renderedSource, /data-builder-instance/);
  assert.match(renderedSource, /data-builder-item-id/);
  assert.match(renderedSource, /data-builder-target=[{]?['"]placeholder['"]/);
  assert.match(renderedSource, /collections\.services/);
  assert.match(renderedSource, /regionIds\.project/);
  assert.match(renderedSource, /regionIds\.review/);
});
