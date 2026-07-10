import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("projects page gives the hero carousel every project image", () => {
  const page = readFileSync("app/projects/page.jsx", "utf8");

  assert.match(page, /projectImages/);
  assert.match(page, /<ProjectCarousel projects=\{projectImages\}/);
});

test("project hero carousel reads project hashes and exposes hero anchors", () => {
  const source = readFileSync("src/components/ProjectCarousel.jsx", "utf8");

  assert.match(source, /window\.location\.hash/);
  assert.match(source, /hashchange/);
  assert.match(source, /findIndex\(\(item\) => item\.id === projectId\)/);
  assert.match(source, /className="project-anchor-stack"/);
  assert.match(source, /id=\{item\.id\}/);
});
