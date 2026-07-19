import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireGarciaMember } from "@/builder/auth.mjs";
import GarciaEditor from "./GarciaEditor";
import site from "../../../builder.config.mjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Owner workspace" };

export default async function BuilderEditorPage({ searchParams }) {
  let member;
  try {
    member = await requireGarciaMember();
  } catch {
    redirect("/admin/login?next=/admin/editor");
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "127.0.0.1:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("127.0.0.1") || host.startsWith("localhost") ? "http" : "https");
  const previewBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || `${protocol}://${host}`;
  const params = await searchParams;
  const requestedPath = Array.isArray(params?.path) ? params.path[0] : params?.path;
  const initialPath = site.pages.some((page) => page.path === requestedPath) ? requestedPath : "/";

  return <GarciaEditor member={member} previewBaseUrl={previewBaseUrl} initialPath={initialPath} />;
}
