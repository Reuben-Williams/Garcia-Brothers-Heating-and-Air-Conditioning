import Link from "next/link";
import ServiceHeroCarousel from "@/components/ServiceHeroCarousel";
import ServiceGrid from "@/components/ServiceGrid";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero services-hero">
        <div className="container">
          <ServiceHeroCarousel />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>All HVAC services</h2>
              <p className="section-lead">
                Browse each service area, then request the exact support the
                system needs.
              </p>
            </div>
          </div>
          <ServiceGrid detailed />
        </div>
      </section>
      <section className="section compact dark-band">
        <div className="container section-heading">
          <div>
            <h2>Need urgent heating or cooling help?</h2>
            <p className="section-lead">
              Route emergency visitors directly to a phone call from every page.
            </p>
          </div>
          <Link className="button primary" href="/contact">
            Request Service
          </Link>
        </div>
      </section>
    </>
  );
}
