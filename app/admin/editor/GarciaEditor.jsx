"use client";

import { isBuilderPreviewMessage } from "@your-builder/core";
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
import styles from "./editor.module.css";

const customerDemoApi = {};
const dashboardAccess = {
  dashboard: { effectiveRead: true, hasCapability: true },
  leads: { effectiveRead: true, hasRecordCapability: true, state: "active" },
  customers: { effectiveRead: true, hasRecordCapability: true, state: "active" },
};

function selectedRegionFromMessage(message) {
  return {
    id: message.regionId,
    kind: message.kind,
    label: message.regionId.split(".").join(" "),
    value: "",
    alt: "",
    href: "",
  };
}

export default function GarciaEditor({ member, previewBaseUrl }) {
  const [workspace, setWorkspace] = useState("growth.dashboard");
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedRegion, setSelectedRegion] = useState({
    id: "home.hero.title",
    kind: "text",
    label: "Home hero title",
    value: "Expert HVAC service for Newark homes",
  });
  const notificationsApi = useMemo(() => createNotificationsDemoApi(), []);
  const memberApi = useMemo(() => createMemberSetupDemoApi(), []);
  const leadsApi = useMemo(() => createLeadsDemoApi(), []);

  useEffect(() => {
    const previewOrigin = new URL(previewBaseUrl).origin;
    function receivePreviewMessage(event) {
      if (event.origin !== previewOrigin || !isBuilderPreviewMessage(event.data, site.siteId)) return;
      if (event.data.type === "builder:select-region") {
        setSelectedRegion(selectedRegionFromMessage(event.data));
      } else if (event.data.type === "builder:navigate") {
        const nextPath = event.data.pagePath.split(/[?#]/, 1)[0] || "/";
        if (site.pages.some((page) => page.path === nextPath)) setCurrentPath(nextPath);
      }
    }
    window.addEventListener("message", receivePreviewMessage);
    return () => window.removeEventListener("message", receivePreviewMessage);
  }, [previewBaseUrl]);

  const resetDemo = () => window.location.reload();
  const workspaces = [
    {
      id: "growth.dashboard", label: "Overview", group: "growth", icon: "layout-dashboard", mobilePriority: 1, status: "preview",
      render: () => <div className={styles.workspaceStack}>
        <DashboardWorkspace mode="demo" actorRole={member.role} access={dashboardAccess} onNavigate={(destination) => {
          if (destination === "leads") setWorkspace("growth.leads");
          if (destination === "customers") setWorkspace("growth.customers");
        }} onResetDemo={resetDemo} />
        <NotificationsWorkspace mode="demo" api={notificationsApi} urlState={{ view: "all" }} onResetDemo={resetDemo} />
        {member.role === "owner" ? <MemberSetupWorkspace mode="demo" actorRole="owner" api={memberApi} onRequestAal2={() => undefined} onResetDemo={resetDemo} /> : null}
      </div>,
    },
    {
      id: "growth.leads", label: "Leads", group: "growth", icon: "contact-round", mobilePriority: 2, status: "preview",
      render: () => <LeadsWorkspace mode="demo" api={leadsApi} access={{ memberId: member.userId, scope: "site", canRead: true, canCreate: true, canUpdate: true, canAssignOthers: member.role === "owner", canManageTasks: true, canExport: member.role === "owner" }} assignees={[{ id: member.userId, label: "Current staff member" }]} tags={[{ id: "maintenance", label: "Maintenance", color: "#175cd3" }]} services={["AC repair", "Heating repair", "Maintenance", "AC replacement"]} savedViews={[]} urlState={{}} onResetDemo={resetDemo} />,
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
        initialWorkspace={workspace}
        registration={{
          modules: [growthCustomersModule, growthLeadsModule, GROWTH_DASHBOARD_MODULE],
          workspaces,
          globalHeader: <span className={styles.memberLabel}>{member.role} access</span>,
        }}
        selectedRegion={selectedRegion}
        demoMode
        userViewUrl="/"
        logoutUrl="/admin/logout"
        auditLog={[]}
      />
    </div>
  );
}
