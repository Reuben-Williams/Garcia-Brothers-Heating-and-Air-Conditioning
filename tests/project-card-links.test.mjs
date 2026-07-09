import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("project gallery cards link to matching project anchors", () => {
  const source = readFileSync("src/components/ProjectGallery.jsx", "utf8");

  assert.match(source, /from "next\/link"/);
  assert.match(source, /href=\{`\/projects#\$\{project\.id\}`\}/);
  assert.match(source, /id=\{project\.id\}/);
  assert.match(source, /aria-label=\{`View project details for \$\{project\.title\}`\}/);
});

test("project cards expose clickable and anchored states", () => {
  const css = readFileSync("app/globals.css", "utf8");

  assert.match(css, /\.project-card-link/);
  assert.match(css, /\.project-card:target/);
});
