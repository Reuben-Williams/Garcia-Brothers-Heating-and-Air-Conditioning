import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("public request form collects ZIP and urgency but never a street address", async () => {
  const form = await read("src/components/ServiceRequestForm.jsx");
  for (const name of ["firstName", "lastName", "email", "phone", "zipCode", "service", "urgency", "message"]) {
    assert.match(form, new RegExp(`name=["']${name}["']`));
  }
  assert.doesNotMatch(form, /name=["'](?:address|street|city|state)["']/);
  assert.match(form, /cf-turnstile-response/);
  assert.match(form, /\/api\/forms\/service-request/);
});

test("service request route uses the platform security and ingestion adapters", async () => {
  const route = await read("app/api/forms/service-request/route.js");
  assert.match(route, /createPublicIngestionRouteHandler/);
  assert.match(route, /createCloudflareTurnstileVerifier/);
  assert.match(route, /createSupabasePublicIngestionService/);
  assert.match(route, /forms\.service-request/);
  assert.match(route, /expectedAction:\s*"service_request"/);
  assert.doesNotMatch(route, /service_role|secret[^\n]*NEXT_PUBLIC/i);
});
