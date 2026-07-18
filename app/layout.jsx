import { Suspense } from "react";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { business } from "@/content/siteData.mjs";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const isPrivateStaging = process.env.NEXT_PUBLIC_SITE_ENVIRONMENT === "staging";

export const metadata = {
  title: {
    default: `${business.name} | Newark HVAC Service`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Garcia Brothers Heating & Air Conditioning provides 24-hour residential HVAC service, furnace repair, heat pump installation, ductwork, AC repair, and indoor air-quality support in Newark, NJ.",
  robots: {
    index: !isPrivateStaging,
    follow: !isPrivateStaging,
    nocache: isPrivateStaging,
    googleBot: {
      index: !isPrivateStaging,
      follow: !isPrivateStaging,
      noimageindex: isPrivateStaging,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Suspense fallback={<main className="main-content">{children}</main>}>
          <SiteChrome>{children}</SiteChrome>
        </Suspense>
      </body>
    </html>
  );
}
