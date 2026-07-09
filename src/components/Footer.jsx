import Link from "next/link";
import { Mail, MapPin, Phone, Wrench } from "lucide-react";
import { business, navItems } from "@/content/siteData.mjs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="brand">
              <span className="brand-mark">
                <Wrench size={22} />
              </span>
              <span>{business.name}</span>
            </h3>
            <p>
              Dependable heating, cooling, and air-quality service with clean
              workmanship and clear communication.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <nav aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4>Contact</h4>
            <p>
              <Phone size={16} /> {business.phoneDisplay}
            </p>
            <p>
              <Mail size={16} /> {business.email}
            </p>
            <p>
              <MapPin size={16} /> {business.serviceArea}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 {business.name}. Licensed and insured demo site.
        </div>
      </div>
    </footer>
  );
}
