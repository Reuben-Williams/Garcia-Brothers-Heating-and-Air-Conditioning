import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Garcia editor wires page state and durable content actions into the shared shell", async () => {
  const editor = await read("app/admin/editor/GarciaEditor.jsx");
  const page = await read("app/admin/editor/page.jsx");
  const route = await read("app/api/builder/route.js");

  for (const contract of ["onPageChange", "onWorkspaceChange", "onSaveDraft", "onPublish"]) {
    assert.match(editor, new RegExp(contract));
  }
  assert.match(editor, /message\.value/);
  assert.match(editor, /message\.alt/);
  assert.match(editor, /message\.href/);
  assert.match(page, /searchParams/);
  assert.match(page, /initialPath/);
  assert.match(route, /mode\s*===\s*["']published["']/);
});

test("Garcia editor supplies real project media and an interactive HVAC posts workspace", async () => {
  const editor = await read("app/admin/editor/GarciaEditor.jsx");
  const posts = await read("app/admin/editor/GarciaPostsWorkspace.jsx");

  assert.match(editor, /mediaAssets=\{mediaAssets\}/);
  assert.match(editor, /postsWorkspace=\{<GarciaPostsWorkspace/);
  assert.match(editor, /urlState=\{\{\s*view:\s*["']all["'],\s*sort:\s*["']updated_at["'],\s*direction:\s*["']desc["']/s);
  assert.match(posts, /PostsWorkspace/);
  assert.match(posts, /PostEditor/);
  assert.match(posts, /garcia-editor:posts/);
  assert.match(posts, /\/projects\/project-/);
});

test("Garcia public and preview chrome reapplies stored page content", async () => {
  const chrome = await read("src/components/SiteChrome.jsx");
  assert.match(chrome, /BuilderDomContentBridge/);
  assert.match(chrome, /mode=\{preview\s*\?\s*["']draft["']\s*:\s*["']published["']\}/);
});
