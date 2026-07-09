import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const files = {
  component: "src/components/BlurredPhoto.jsx",
  css: "app/globals.css",
  gallery: "src/components/ProjectGallery.jsx",
  carousel: "src/components/ProjectCarousel.jsx",
  home: "app/page.jsx",
  about: "app/about/page.jsx",
};

test("blurred photo component exposes background and foreground image layers", () => {
  const component = readFileSync(files.component, "utf8");
  const css = readFileSync(files.css, "utf8");

  assert.match(component, /className=\{`blurred-photo/);
  assert.match(component, /blurred-photo-bg/);
  assert.match(component, /blurred-photo-main/);
  assert.match(css, /\.blurred-photo-bg/);
  assert.match(css, /filter:\s*blur/);
  assert.match(css, /\.blurred-photo-main/);
  assert.match(css, /object-fit:\s*contain/);
});

test("blurred photos eagerly request a cache-versioned asset URL", () => {
  const component = readFileSync(files.component, "utf8");

  assert.match(component, /IMAGE_CACHE_VERSION/);
  assert.match(component, /NEXT_PUBLIC_SITE_BASE_PATH/);
  assert.match(component, /versionedSrc/);
  assert.match(component, /<img/);
  assert.doesNotMatch(component, /next\/image/);
  assert.match(component, /loading="eager"/);
});

test("project and feature photos render through BlurredPhoto", () => {
  for (const path of [files.gallery, files.carousel, files.home, files.about]) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /BlurredPhoto/, `${path} should use BlurredPhoto`);
  }
});
