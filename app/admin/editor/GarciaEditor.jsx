"use client";

import { EditorShell } from "@your-builder/editor";
import { GROWTH_DASHBOARD_MODULE } from "@your-builder/growth-dashboard";
import {
  DashboardWorkspace,
  MemberSetupWorkspace,
  NotificationsWorkspace,
  createMemberSetupDemoApi,
  createNotificationsDemoApi,
} from "@your-builder/growth-dashboard/ui";
import { growthCustomersModule } from "@your-builder/growth-customers";
import { CustomersWorkspace } from "@your-builder/growth-customers/ui";
import { growthLeadsModule } from "@your-builder/growth-leads";
import { LeadsWorkspace, createLeadsDemoApi } from "@your-builder/growth-leads/ui";
import { useEffect, useMemo, useState } from "react";
import site from "../../../builder.config.mjs";
import { projectImages } from "../../../src/content/siteData.mjs";
import GarciaPostsWorkspace from "./GarciaPostsWorkspace";
import styles from "./editor.module.css";

const customerDemoApi = {};
const dashboardAccess = {
  dashboard: { effectiveRead: true, hasCapability: true },
  leads: { effectiveRead: true, hasRecordCapability: true, state: "active" },
  customers: { effectiveRead: true, hasRecordCapability: true, state: "active" },
};

function selectionFromSaved(regionId, value) {
  if (value.type === "image") return { id: regionId, kind: "image", label: regionId.split(".").join(" "), value: value.src, alt: value.alt ?? "" };
  if (value.type === "link") return { id: regionId, kind: "link", label: regionId.split(".").join(" "), value: value.label, href: value.href };
  if (value.type === "icon") return { id: regionId, kind: "icon", label: regionId.split(".").join(" "), value: value.icon };
  return { id: regionId, kind: value.type, label: regionId.split(".").join(" "), value: value.value };
}

async function builderRequest(url, options) {
  const response = await fetch(url, {
    credentials: "same-origin",
    cache: "no-store",
    headers: { accept: "application/json", ...(options?.body ? { "content-type": "application/json" } : {}) },
    ...options,
  });
  if (!response.ok) throw new Error("builder_request_failed");
  return response.status === 204 ? null : response.json();
}

export default function GarciaEditor({ member, previewBaseUrl, initialPath = "/" }) {
  const [workspace, setWorkspace] = useState("website.pages");
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedRegion, setSelectedRegion] = useState();
  const [postSelectionDraft, setPostSelectionDraft] = useState();
  const [auditLog, setAuditLog] = useState([]);
  const [previewRevision, setPreviewRevision] = useState(0);
  const notificationsApi = useMemo(() => createNotificationsDemoApi(), []);
  const memberApi = useMemo(() => createMemberSetupDemoApi(), []);
  const leadsApi = useMemo(() => createLeadsDemoApi(), []);
  const mediaAssets = useMemo(() => projectImages.map((project) => ({
    id: project.id,
    siteId: site.siteId,
    path: project.src,
    url: new URL(project.src.replace(/^\/+/, ""), `${previewBaseUrl.replace(/\/$/, "")}/`).toString(),
    alt: project.alt,
    label: project.title,
    mimeType: "image/png",
    source: "seed",
    userId: "site-seed",
    createdAt: "2026-07-19T00:00:00.000Z",
  })), [previewBaseUrl]);

  async function refreshAudit(path = currentPath) {
    try {
      setAuditLog(await builderRequest(`/api/builder?resource=audit&path=${encodeURIComponent(path)}`));
    } catch {
      setAuditLog([]);
    }
  }

  useEffect(() => { void refreshAudit(currentPath); }, [currentPath]);

  function updateLocation(path, nextWorkspace) {
    const url = new URL(window.location.href);
    url.searchParams.set("path", path);
    url.searchParams.set("workspace", nextWorkspace);
    window.history.pushState(null, "", url);
  }

  function changePage(path) {
    setCurrentPath(path);
    setWorkspace("website.pages");
    setSelectedRegion(undefined);
    updateLocation(path, "website.pages");
  }

  function changeWorkspace(nextWorkspace) {
    setWorkspace(nextWorkspace);
    updateLocation(currentPath, nextWorkspace);
  }

  async function saveDraft(input) {
    await builderRequest("/api/builder", { method: "POST", body: JSON.stringify(input) });
    setSelectedRegion(selectionFromSaved(input.regionId, input.value));
    setPreviewRevision((revision) => revision + 1);
    await refreshAudit(input.pagePath);
  }

  async function publish(input) {
    await builderRequest("/api/builder", { method: "PUT", body: JSON.stringify(input) });
    setPreviewRevision((revision) => revision + 1);
    await refreshAudit(input.pagePath);
  }

  async function linkSelectedRegions({ pagePath, regions, href }) {
    await Promise.all(regions.map((region) => builderRequest("/api/builder", {
      method: "POST",
      body: JSON.stringify({
        pagePath,
        regionId: region.id,
        value: { type: "link", label: region.value ?? region.label ?? region.id, href },
      }),
    })));
    setPreviewRevision((revision) => revision + 1);
    await refreshAudit(pagePath);
  }

  function createPostFromSelection({ regions }) {
    const id = `selected-regions-${Date.now()}`;
    setPostSelectionDraft({
      id,
      title: regions[0]?.label ?? "New website update",
      excerpt: `Draft created from ${regions.length} selected website area${regions.length === 1 ? "" : "s"}.`,
      paragraphs: regions.map((region) => region.value).filter(Boolean),
    });
    changeWorkspace("website.posts");
  }

  const resetDemo = () => window.location.reload();
  const workspaces = [
    {
      id: "growth.dashboard", label: "Overview", group: "growth", icon: "layout-dashboard", mobilePriority: 1, status: "preview",
      render: () => <div className={styles.workspaceStack}>
        <DashboardWorkspace mode="demo" actorRole={member.role} access={dashboardAccess} onNavigate={(destination) => {
          if (destination === "leads") changeWorkspace("growth.leads");
          if (destination === "customers") changeWorkspace("growth.customers");
        }} onResetDemo={resetDemo} />
        <NotificationsWorkspace mode="demo" api={notificationsApi} urlState={{ view: "all" }} onResetDemo={resetDemo} />
        {member.role === "owner" ? <MemberSetupWorkspace mode="demo" actorRole="owner" api={memberApi} onRequestAal2={() => undefined} onResetDemo={resetDemo} /> : null}
      </div>,
    },
    {
      id: "growth.leads", label: "Leads", group: "growth", icon: "contact-round", mobilePriority: 2, status: "preview",
      render: () => <LeadsWorkspace mode="demo" api={leadsApi} access={{ memberId: member.userId, scope: "site", canRead: true, canCreate: true, canUpdate: true, canAssignOthers: member.role === "owner", canManageTasks: true, canExport: member.role === "owner" }} assignees={[{ id: member.userId, label: "Current staff member" }]} tags={[{ id: "maintenance", label: "Maintenance", color: "#175cd3" }]} services={["AC repair", "Heating repair", "Maintenance", "AC replacement"]} savedViews={[]} urlState={{ view: "all", sort: "updated_at", direction: "desc" }} onResetDemo={resetDemo} />,
    },
    {
      id: "growth.customers", label: "Customers", group: "growth", icon: "users", mobilePriority: 3, status: "preview",
      render: () => <CustomersWorkspace mode="demo" api={customerDemoApi} access={{ scope: "site", canRead: true, canUpdate: true, canReviewMerge: member.role === "owner", canExport: member.role === "owner", canRequestDeletion: member.role === "owner", canManageTags: true, canShareSegments: member.role === "owner" }} savedSegments={[]} tags={[{ id: "maintenance", label: "Maintenance", color: "#175cd3" }]} onUrlStateChange={() => undefined} onResetDemo={resetDemo} />,
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.stagingNotice} role="status">
        <strong>Private staging</strong><span>Growth records are sample data until activation is approved.</span>
      </div>
      <EditorShell
        siteId={site.siteId}
        currentPath={currentPath}
        pages={site.pages}
        previewBaseUrl={previewBaseUrl}
        previewRevision={previewRevision}
        initialWorkspace={workspace}
        registration={{
          modules: [growthCustomersModule, growthLeadsModule, GROWTH_DASHBOARD_MODULE],
          workspaces,
          globalHeader: <span className={styles.memberLabel}>{member.role} access</span>,
        }}
        selectedRegion={selectedRegion}
        mediaAssets={mediaAssets}
        postsWorkspace={<GarciaPostsWorkspace mediaAssets={mediaAssets} selectionDraft={postSelectionDraft} onSelectionDraftConsumed={() => setPostSelectionDraft(undefined)} />}
        onPageChange={changePage}
        onWorkspaceChange={changeWorkspace}
        onRegionSelectionChange={({ primary }) => setSelectedRegion(primary)}
        onLinkSelectedRegions={linkSelectedRegions}
        onCreatePostFromSelection={createPostFromSelection}
        onSaveDraft={saveDraft}
        onPublish={publish}
        userViewUrl="/"
        logoutUrl="/admin/logout"
        auditLog={auditLog}
      />
    </div>
  );
}
