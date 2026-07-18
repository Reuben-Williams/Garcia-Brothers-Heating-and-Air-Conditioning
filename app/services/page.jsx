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
          <div data-builder-region="services.hero.items" data-builder-kind="sections"><ServiceHeroCarousel /></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 data-builder-region="services.list.title" data-builder-kind="text">All HVAC services</h2>
              <p className="section-lead" data-builder-region="services.list.body" data-builder-kind="richText">
                Browse furnace replacement, heat pumps, ductwork, AC repair,
                emergency HVAC, and indoor air-quality support.
              </p>
            </div>
          </div>
          <div data-builder-region="collections.services" data-builder-kind="sections"><ServiceGrid detailed /></div>
        </div>
      </section>
      <section className="section compact dark-band">
        <div className="container section-heading">
          <div>
            <h2 data-builder-region="services.urgent.title" data-builder-kind="text">Need urgent heating or cooling help?</h2>
            <p className="section-lead" data-builder-region="services.urgent.body" data-builder-kind="richText">
              {business.name} lists 24-hour availability every day, including
              weekends and holidays.
            </p>
          </div>
          <a className="button primary" href={business.phoneHref} data-builder-region="services.urgent.cta" data-builder-kind="link">
            Call {business.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
