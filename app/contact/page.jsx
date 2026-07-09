import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { business } from "@/content/siteData.mjs";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Garcia Brothers">
        Fast access to phone, email, and a service request form for heating,
        cooling, and emergency HVAC calls.
      </PageHero>
      <section className="section">
        <div className="container contact-card">
          <form className="form-grid">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" placeholder="First name" />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" placeholder="Last name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Email" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="Phone" />
            </div>
            <div className="field full">
              <label htmlFor="service">Service Needed</label>
              <select id="service" name="service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>AC repair</option>
                <option>Heating service</option>
                <option>Maintenance</option>
                <option>Installation quote</option>
                <option>Emergency HVAC</option>
              </select>
            </div>
            <div className="field full">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us what is happening with the system."
              />
            </div>
            <button className="button secondary" type="submit">
              Request Service
            </button>
          </form>

          <aside className="contact-grid">
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
                <Mail size={20} /> Email
              </h3>
              <p>{business.email}</p>
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
