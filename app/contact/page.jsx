import { Clock, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { business, hours, services } from "@/content/siteData.mjs";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Garcia Brothers" titleRegion="contact.hero.title" bodyRegion="contact.hero.body">
        Fast access to phone, address, 24-hour availability, and a service
        request form for heating, cooling, and emergency HVAC calls.
      </PageHero>
      <section className="section">
        <div className="container contact-card">
          <ServiceRequestForm services={services} />

          <aside className="contact-grid" data-builder-region="contact.details" data-builder-kind="sections">
            <div className="info-card">
              <h3>
                <Phone size={20} /> Phone
              </h3>
              <p>
                <a href={business.phoneHref}>{business.phoneDisplay}</a>
              </p>
            </div>
            <div className="info-card">
              <h3>
                <MapPin size={20} /> Address
              </h3>
              <p>{business.address}</p>
            </div>
            <div className="info-card">
              <h3>
                <Clock size={20} /> Hours
              </h3>
              <div className="hours-list">
                {hours.map((entry) => (
                  <p key={entry.day}>
                    <strong>{entry.day}</strong>
                    <span>{entry.value}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="info-card">
              <h3>
                <MapPin size={20} /> Service Area
              </h3>
              <p>{business.serviceArea}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
