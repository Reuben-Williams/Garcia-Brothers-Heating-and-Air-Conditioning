import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  navItems,
  projectImages,
  featuredProjects,
} from "../src/content/siteData.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("navigation includes the projects page and only root-relative routes", () => {
  assert.ok(navItems.some((item) => item.href === "/projects"));
  for (const item of navItems) {
    assert.match(item.href, /^\//);
    assert.ok(item.label.length > 0);
  }
});

test("project images point to local public assets with useful descriptions", () => {
  assert.ok(projectImages.length >= 30);

  for (const image of projectImages) {
    assert.match(image.src, /^\/projects\/.+\.png$/);
    assert.ok(image.title.length >= 8);
    assert.ok(image.summary.length >= 20);
    assert.ok(image.alt.length >= 20);

    const publicPath = join(root, "public", image.src.slice(1));
    assert.equal(existsSync(publicPath), true, `${image.src} is missing`);
  }
});

test("featured projects are a curated subset of available images", () => {
  const ids = new Set(projectImages.map((image) => image.id));
  assert.ok(featuredProjects.length >= 5);

  for (const project of featuredProjects) {
    assert.equal(ids.has(project.id), true, `${project.id} is not in projectImages`);
  }
});
