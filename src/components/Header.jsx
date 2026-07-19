import Link from "next/link";
import { Flame, Phone, Wrench } from "lucide-react";
import { business, navItems } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <span className="brand-mark">
            <Wrench size={22} />
          </span>
          <span data-builder-region="global.business.short-name" data-builder-kind="text" data-builder-scope="global" data-builder-instance="header-brand">{business.shortName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation" data-builder-region="global.navigation.primary" data-builder-kind="sections" data-builder-scope="global" data-builder-instance="desktop-navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-builder-item-id={item.id} data-builder-item-label={item.label} data-builder-region={regionIds.navigation(item.id)} data-builder-kind="link" data-builder-scope="global" data-builder-instance={`desktop-navigation-${item.id}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button ghost" href={business.phoneHref} data-builder-region="global.business.phone" data-builder-kind="link" data-builder-scope="global" data-builder-instance="header-phone">
            <Phone size={18} />
            <span data-builder-link-label>{business.phoneDisplay}</span>
          </a>
          <a className="button primary" href={business.phoneHref} data-builder-region="global.header.emergency-cta" data-builder-kind="link" data-builder-scope="global" data-builder-instance="header-emergency">
            <Flame size={18} />
            <span data-builder-link-label>Emergency</span>
          </a>
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation" data-builder-region="global.navigation.primary" data-builder-kind="sections" data-builder-scope="global" data-builder-instance="mobile-navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} data-builder-item-id={item.id} data-builder-item-label={item.label} data-builder-region={regionIds.navigation(item.id)} data-builder-kind="link" data-builder-scope="global" data-builder-instance={`mobile-navigation-${item.id}`}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
