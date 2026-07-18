import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const layoutSource = fs.readFileSync(new URL("../app/layout.jsx", import.meta.url), "utf8");

test("staging metadata prevents search indexing", () => {
  assert.match(layoutSource, /NEXT_PUBLIC_SITE_ENVIRONMENT/);
  assert.match(layoutSource, /index:\s*!isPrivateStaging/);
  assert.match(layoutSource, /follow:\s*!isPrivateStaging/);
});

test("robots route blocks staging and allows production", async () => {
  const originalEnvironment = process.env.NEXT_PUBLIC_SITE_ENVIRONMENT;
  const { default: robots } = await import("../app/robots.js");

  try {
    process.env.NEXT_PUBLIC_SITE_ENVIRONMENT = "staging";
    assert.deepEqual(robots(), {
      rules: [{ userAgent: "*", disallow: "/" }],
    });

    process.env.NEXT_PUBLIC_SITE_ENVIRONMENT = "production";
    assert.deepEqual(robots(), {
      rules: [{ userAgent: "*", allow: "/" }],
    });
  } finally {
    if (originalEnvironment === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_ENVIRONMENT;
    } else {
      process.env.NEXT_PUBLIC_SITE_ENVIRONMENT = originalEnvironment;
    }
  }
});
