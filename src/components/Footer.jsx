import Link from "next/link";
import { Clock, Flame, LockKeyhole, MapPin, Phone, Star, Wrench } from "lucide-react";
import { business, navItems, services } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <span className="eyebrow">
              <Flame size={18} /> <span data-builder-region="global.footer.emergency.eyebrow" data-builder-kind="text" data-builder-scope="global">Emergency service available</span>
            </span>
            <h2 data-builder-region="global.footer.emergency.title" data-builder-kind="text" data-builder-scope="global">Need heating or cooling help?</h2>
            <p data-builder-region="global.footer.emergency.body" data-builder-kind="richText" data-builder-scope="global">
              Call directly for urgent issues at any hour or send a service
              request with the system details.
            </p>
          </div>
          <div className="footer-cta-actions">
            <a className="button primary" href={business.phoneHref} data-builder-region="global.footer.emergency.primary-cta" data-builder-kind="link" data-builder-scope="global">
              <Phone size={18} />
              <span data-builder-link-label>{business.phoneDisplay}</span>
            </a>
            <Link className="button ghost" href="/contact" data-builder-region="global.footer.emergency.secondary-cta" data-builder-kind="link" data-builder-scope="global">
              Request Service
            </Link>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand-block">
            <h3 className="brand">
              <span className="brand-mark">
                <Wrench size={22} />
              </span>
              <span data-builder-region="global.business.name" data-builder-kind="text" data-builder-scope="global" data-builder-instance="footer-brand">{business.name}</span>
            </h3>
            <p data-builder-region="global.footer.brand-summary" data-builder-kind="richText" data-builder-scope="global">
              Family-owned heating, cooling, ductwork, and air-quality service
              for Newark, East Orange, Belleville, and nearby Essex County homes.
            </p>
          </div>

          <div>
            <h4 data-builder-region="global.footer.explore-title" data-builder-kind="text" data-builder-scope="global">Explore</h4>
            <nav aria-label="Footer navigation" data-builder-region="global.navigation.primary" data-builder-kind="sections" data-builder-scope="global" data-builder-instance="footer-navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} data-builder-item-id={item.id} data-builder-item-label={item.label} data-builder-region={regionIds.navigation(item.id)} data-builder-kind="link" data-builder-scope="global" data-builder-instance={`footer-navigation-${item.id}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 data-builder-region="global.footer.services-title" data-builder-kind="text" data-builder-scope="global">Services</h4>
            <nav className="footer-service-links" aria-label="Footer services" data-builder-region="collections.services" data-builder-kind="sections" data-builder-scope="global" data-builder-instance="footer-services">
              {services.map((service) => (
                <Link key={service.slug} href={service.detailHref} data-builder-item-id={service.slug} data-builder-item-label={service.title} data-builder-region={regionIds.service(service.slug, "detail-cta")} data-builder-kind="link" data-builder-scope="global" data-builder-instance={`footer-service-${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 data-builder-region="global.footer.contact-title" data-builder-kind="text" data-builder-scope="global">Contact</h4>
            <div className="footer-contact-list">
              <a href={business.phoneHref} data-builder-region="global.business.phone" data-builder-kind="link" data-builder-scope="global" data-builder-instance="footer-phone">
                <Phone size={16} /> <span data-builder-link-label>{business.phoneDisplay}</span>
              </a>
              <span>
                <MapPin size={16} /> <span data-builder-region="global.business.address" data-builder-kind="text" data-builder-scope="global" data-builder-instance="footer-address">{business.address}</span>
              </span>
              <span>
                <Clock size={16} /> <span data-builder-region="global.business.hours-summary" data-builder-kind="text" data-builder-scope="global" data-builder-instance="footer-hours">{business.hoursSummary}</span>
              </span>
              <span>
                <Star size={16} /> <span data-builder-region="global.business.rating-summary" data-builder-kind="text" data-builder-scope="global" data-builder-instance="footer-rating">{business.rating} stars from {business.reviewCount} reviews</span>
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span data-builder-region="global.footer.copyright" data-builder-kind="text" data-builder-scope="global">(c) 2026 {business.name}. HVAC service in Newark, NJ.</span>
          <span data-builder-region="global.footer.service-area" data-builder-kind="richText" data-builder-scope="global">{business.serviceArea}</span>
          <Link className="footer-owner-link" href="/admin/login">
            <LockKeyhole size={14} />
            Owner sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
