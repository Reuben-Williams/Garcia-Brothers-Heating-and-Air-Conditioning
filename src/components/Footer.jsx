import Link from "next/link";
import { Clock, Flame, LockKeyhole, MapPin, Phone, Star, Wrench } from "lucide-react";
import { business, navItems, services } from "@/content/siteData.mjs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <span className="eyebrow">
              <Flame size={18} /> Emergency service available
            </span>
            <h2>Need heating or cooling help?</h2>
            <p>
              Call directly for urgent issues at any hour or send a service
              request with the system details.
            </p>
          </div>
          <div className="footer-cta-actions">
            <a className="button primary" href={business.phoneHref}>
              <Phone size={18} />
              {business.phoneDisplay}
            </a>
            <Link className="button ghost" href="/contact">
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
              <span>{business.name}</span>
            </h3>
            <p>
              Family-owned heating, cooling, ductwork, and air-quality service
              for Newark, East Orange, Belleville, and nearby Essex County homes.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <nav aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4>Services</h4>
            <nav className="footer-service-links" aria-label="Footer services">
              {services.map((service) => (
                <Link key={service.slug} href={service.detailHref}>
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="footer-contact-list">
              <a href={business.phoneHref}>
                <Phone size={16} /> {business.phoneDisplay}
              </a>
              <span>
                <MapPin size={16} /> {business.address}
              </span>
              <span>
                <Clock size={16} /> {business.hoursSummary}
              </span>
              <span>
                <Star size={16} /> {business.rating} stars from{" "}
                {business.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>(c) 2026 {business.name}. HVAC service in Newark, NJ.</span>
          <span>{business.serviceArea}</span>
          <Link className="footer-owner-link" href="/admin/login">
            <LockKeyhole size={14} />
            Owner sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
