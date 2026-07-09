import ServiceHeroCarousel from "@/components/ServiceHeroCarousel";
import ServiceGrid from "@/components/ServiceGrid";
import { business } from "@/content/siteData.mjs";

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
                Browse furnace replacement, heat pumps, ductwork, AC repair,
                emergency HVAC, and indoor air-quality support.
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
              {business.name} lists 24-hour availability every day, including
              weekends and holidays.
            </p>
          </div>
          <a className="button primary" href={business.phoneHref}>
            Call {business.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
