import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import * as siteData from "../src/content/siteData.mjs";

const { business, navItems, projectImages, featuredProjects, reviews } = siteData;

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

test("business profile uses verified Newark contact and reputation details", () => {
  assert.equal(business.phoneDisplay, "(551) 379-0300");
  assert.equal(business.phoneHref, "tel:+15513790300");
  assert.equal(business.address, "42 S 17th St, Newark, NJ 07107");
  assert.match(business.serviceArea, /Newark/);
  assert.match(business.serviceArea, /East Orange/);
  assert.match(business.serviceArea, /Belleville/);
  assert.equal(business.rating, "4.8");
  assert.equal(business.reviewCount, 49);
  assert.match(business.reviewUrl, /^https:\/\/search\.google\.com\/local\/reviews/);
});

test("hours show daily 24 hour availability", () => {
  const { hours } = siteData;

  assert.ok(Array.isArray(hours));
  assert.equal(hours.length, 7);
  assert.deepEqual(new Set(hours.map((entry) => entry.value)), new Set(["Open 24 hours"]));
});

test("reviews contain named local customer details from the source material", () => {
  const reviewNames = reviews.map((review) => review.name);

  assert.ok(reviewNames.includes("Collin Soto"));
  assert.ok(reviewNames.includes("Santiago Cantu"));
  assert.ok(reviewNames.includes("Ruth11 H"));
  assert.ok(reviews.some((review) => /Bryce/.test(review.quote)));
  assert.ok(reviews.some((review) => /Peyton/.test(review.quote)));
  assert.ok(reviews.some((review) => /Edwin/.test(review.quote)));
});

test("faqs answer concrete homeowner questions from reviews and operations", () => {
  const { faqs } = siteData;

  assert.ok(Array.isArray(faqs));
  assert.ok(faqs.length >= 6);
  assert.ok(faqs.some((faq) => /limited attic space/.test(faq.question)));
  assert.ok(faqs.some((faq) => /holiday evening/.test(faq.question)));
  assert.ok(faqs.some((faq) => /same evening/.test(faq.answer)));
});
