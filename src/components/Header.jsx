import Link from "next/link";
import { Flame, Phone, Wrench } from "lucide-react";
import { business, navItems } from "@/content/siteData.mjs";

export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <span className="brand-mark">
            <Wrench size={22} />
          </span>
          <span>{business.shortName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button ghost" href={business.phoneHref}>
            <Phone size={18} />
            {business.phoneDisplay}
          </a>
          <a className="button primary" href={business.phoneHref}>
            <Flame size={18} />
            Emergency
          </a>
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
