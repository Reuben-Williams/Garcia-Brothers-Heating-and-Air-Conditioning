import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="HVAC Services">
        Repair, installation, maintenance, emergency support, commercial service,
        and indoor-air improvements presented in a clean static demo format.
      </PageHero>
      <section className="section">
        <div className="container">
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
