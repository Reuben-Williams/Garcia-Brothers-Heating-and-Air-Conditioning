"use client";

import { BuilderPreviewBridge, BuilderProvider } from "@your-builder/next";
import { usePathname, useSearchParams } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const admin = pathname.startsWith("/admin");
  const preview = searchParams.get("builderPreview") === "1";

  return (
    <BuilderProvider siteId="garcia-brothers-hvac" mode={preview ? "editor" : "public"}>
      <BuilderPreviewBridge siteId="garcia-brothers-hvac" />
      {admin ? children : (
        <div className="site-shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      )}
    </BuilderProvider>
  );
}
