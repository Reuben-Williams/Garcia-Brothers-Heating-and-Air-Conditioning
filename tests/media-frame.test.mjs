import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("blurred photos fill media frames that define only min-height", () => {
  const css = readFileSync("app/globals.css", "utf8");

  assert.match(css, /\.media-frame\s*>\s*\.blurred-photo\s*\{/);
  assert.match(css, /\.media-frame\s*>\s*\.blurred-photo\s*\{[^}]*position:\s*absolute/s);
  assert.match(css, /\.media-frame\s*>\s*\.blurred-photo\s*\{[^}]*inset:\s*0/s);
});
