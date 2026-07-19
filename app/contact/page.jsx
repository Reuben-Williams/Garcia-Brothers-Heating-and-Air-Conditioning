import { Clock, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { business, hours, services } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

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
            <div className="info-card" data-builder-item-id="phone" data-builder-item-label="Phone">
              <h3>
                <Phone size={20} /> <span data-builder-region="contact.details.phone-title" data-builder-kind="text">Phone</span>
              </h3>
              <p>
                <a href={business.phoneHref} data-builder-region="global.business.phone" data-builder-kind="link" data-builder-scope="global" data-builder-instance="contact-phone"><span data-builder-link-label>{business.phoneDisplay}</span></a>
              </p>
            </div>
            <div className="info-card" data-builder-item-id="address" data-builder-item-label="Address">
              <h3>
                <MapPin size={20} /> <span data-builder-region="contact.details.address-title" data-builder-kind="text">Address</span>
              </h3>
              <p data-builder-region="global.business.address" data-builder-kind="text" data-builder-scope="global" data-builder-instance="contact-address">{business.address}</p>
            </div>
            <div className="info-card" data-builder-item-id="hours" data-builder-item-label="Hours">
              <h3>
                <Clock size={20} /> <span data-builder-region="contact.details.hours-title" data-builder-kind="text">Hours</span>
              </h3>
              <div className="hours-list" data-builder-region="global.hours" data-builder-kind="sections" data-builder-scope="global" data-builder-instance="contact-hours">
                {hours.map((entry) => (
                  <p key={entry.day} data-builder-item-id={entry.day.toLowerCase()} data-builder-item-label={entry.day}>
                    <strong data-builder-region={regionIds.hour(entry.day.toLowerCase(), "day")} data-builder-kind="text" data-builder-scope="global">{entry.day}</strong>
                    <span data-builder-region={regionIds.hour(entry.day.toLowerCase(), "value")} data-builder-kind="text" data-builder-scope="global">{entry.value}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="info-card" data-builder-item-id="service-area" data-builder-item-label="Service Area">
              <h3>
                <MapPin size={20} /> <span data-builder-region="contact.details.area-title" data-builder-kind="text">Service Area</span>
              </h3>
              <p data-builder-region="global.business.service-area" data-builder-kind="richText" data-builder-scope="global" data-builder-instance="contact-service-area">{business.serviceArea}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
