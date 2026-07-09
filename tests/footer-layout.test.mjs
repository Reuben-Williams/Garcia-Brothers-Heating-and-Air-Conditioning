import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("footer presents a modern contact-led layout", () => {
  const footer = readFileSync("src/components/Footer.jsx", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.match(footer, /footer-cta/);
  assert.match(footer, /footer-contact-list/);
  assert.match(footer, /footer-service-links/);
  assert.match(css, /\.footer-cta/);
  assert.match(css, /\.footer-contact-list/);
  assert.match(css, /\.footer-service-links/);
});
