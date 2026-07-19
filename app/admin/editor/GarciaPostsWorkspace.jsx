"use client";

import { PostEditor, PostsWorkspace } from "@your-builder/editor";
import { useEffect, useMemo, useState } from "react";

const storageKey = "garcia-editor:posts";
const emptyBody = { version: 1, type: "doc", content: [{ type: "paragraph", content: [] }] };
const seedPosts = [
  createPost("seasonal-ac-checklist", "Seasonal AC checklist", "draft", "/projects/project-01.png"),
  createPost("when-to-call-for-heating-repair", "When to call for heating repair", "draft", "/projects/project-19.png"),
  createPost("ductwork-airflow-warning-signs", "Ductwork airflow warning signs", "draft", "/projects/project-23.png"),
];

function createPost(slug, title = "Untitled post", status = "draft", image = "") {
  return {
    entryId: slug,
    draftVersionId: null,
    publishedVersionId: null,
    title,
    slug,
    status,
    excerpt: "",
    body: emptyBody,
    featuredImage: image ? { kind: "static", src: image, alt: title, previewUrl: image } : null,
    authorName: "Garcia Brothers HVAC",
    authorKey: null,
    categoryKeys: ["HVAC advice"],
    tagKeys: [],
    displayDate: "2026-07-19T12:00:00.000Z",
    expiresAt: null,
    featured: false,
    pinned: false,
    seoTitle: title,
    seoDescription: "",
    canonicalUrl: null,
    noIndex: true,
    updatedAt: "2026-07-19T12:00:00.000Z",
  };
}

function readStoredPosts() {
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) && value.length ? value : seedPosts;
  } catch {
    return seedPosts;
  }
}

export default function GarciaPostsWorkspace({ mediaAssets }) {
  const [posts, setPosts] = useState(seedPosts);
  const [selectedId, setSelectedId] = useState(seedPosts[0].entryId);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => setPosts(readStoredPosts()), []);
  const selected = useMemo(() => posts.find((post) => post.entryId === selectedId) ?? posts[0], [posts, selectedId]);
  const list = posts.map((post) => ({
    entryId: post.entryId,
    title: post.title,
    slug: post.slug,
    status: post.status,
    updatedAt: post.updatedAt,
  }));

  function updateSelected(next) {
    setPosts((current) => current.map((post) => post.entryId === selected?.entryId ? { ...next, updatedAt: new Date().toISOString() } : post));
  }

  function createNew() {
    const id = `new-post-${Date.now()}`;
    const post = createPost(id);
    setPosts((current) => [post, ...current]);
    setSelectedId(id);
  }

  function save() {
    const next = posts.map((post) => post.entryId === selected?.entryId
      ? { ...post, title: post.title.trim() || "Untitled post", updatedAt: new Date().toISOString() }
      : post);
    setPosts(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setMessage("Post draft saved in this private staging workspace.");
  }

  if (!selected) return null;
  return (
    <section>
      {message ? <p role="status">{message}</p> : null}
      <PostsWorkspace posts={list} loading={false} onCreate={createNew} onSelect={setSelectedId}>
        <PostEditor value={selected} saving={false} onChange={updateSelected} onSave={save} onOpenMedia={() => setMediaOpen((open) => !open)} showPublishingPanel={false} />
        {mediaOpen ? (
          <div aria-label="Post media gallery" style={styles.mediaGrid}>
            {mediaAssets.map((asset) => (
              <button key={asset.id} type="button" style={styles.mediaButton} onClick={() => {
                updateSelected({ ...selected, featuredImage: { kind: "static", src: asset.path, alt: asset.alt, previewUrl: asset.url } });
                setMediaOpen(false);
              }}>
                <img src={asset.url} alt="" style={styles.mediaImage} />
                <span>{asset.label}</span>
              </button>
            ))}
          </div>
        ) : null}
        <button type="button" onClick={save}>Save post</button>
      </PostsWorkspace>
    </section>
  );
}

const styles = {
  mediaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))", gap: 8, maxHeight: 360, overflow: "auto", padding: 8 },
  mediaButton: { display: "grid", gap: 6, minWidth: 0, border: "1px solid #d7dde5", borderRadius: 8, background: "#fff", padding: 6, textAlign: "left", font: "inherit" },
  mediaImage: { width: "100%", aspectRatio: "4 / 3", borderRadius: 6, objectFit: "contain", background: "#eef2f6" },
};
