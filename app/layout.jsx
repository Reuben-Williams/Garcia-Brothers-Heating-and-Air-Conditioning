import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export const metadata = {
  title: {
    default: `${business.name} | HVAC Service Demo`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Static demo website for Garcia Brothers Heating & Air Conditioning, featuring HVAC services, project photos, reviews, and contact information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <div className="site-shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
