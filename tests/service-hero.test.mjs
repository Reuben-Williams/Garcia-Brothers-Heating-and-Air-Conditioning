import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { services } from "../src/content/siteData.mjs";

test("services provide image-led hero content", () => {
  for (const service of services) {
    assert.match(service.heroImage.src, /^\/projects\/.+\.png$/);
    assert.ok(service.heroImage.alt.length >= 20);
    assert.ok(service.heroLabel.length >= 8);
    assert.ok(service.heroSummary.length >= 30);
  }
});

test("services page renders the service hero carousel before the service grid", () => {
  const page = readFileSync("app/services/page.jsx", "utf8");
  const carouselIndex = page.indexOf("<ServiceHeroCarousel");
  const gridIndex = page.indexOf("<ServiceGrid");

  assert.ok(carouselIndex >= 0, "services page should render ServiceHeroCarousel");
  assert.ok(gridIndex >= 0, "services page should render ServiceGrid");
  assert.ok(carouselIndex < gridIndex, "service hero should come before service grid");
});

test("service hero carousel reads the URL hash and updates selection", () => {
  const source = readFileSync("src/components/ServiceHeroCarousel.jsx", "utf8");

  assert.match(source, /"use client"/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /hashchange/);
  assert.match(source, /BlurredPhoto/);
});
