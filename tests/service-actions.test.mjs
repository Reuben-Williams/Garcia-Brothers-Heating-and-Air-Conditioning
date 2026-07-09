import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { services } from "../src/content/siteData.mjs";

test("services expose detail anchors and contact follow-up links", () => {
  for (const service of services) {
    assert.match(service.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(service.detailHref, `/services#${service.slug}`);
    assert.equal(service.contactHref, `/contact?service=${service.slug}`);
    assert.ok(service.ctaLabel.length >= 8);
  }
});

test("homepage service grid renders links for learning more and requesting service", () => {
  const source = readFileSync("src/components/ServiceGrid.jsx", "utf8");

  assert.match(source, /from "next\/link"/);
  assert.match(source, /service\.detailHref/);
  assert.match(source, /service\.contactHref/);
  assert.match(source, /Request Service/);
});
