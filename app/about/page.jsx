import { BadgeCheck, ClipboardCheck, MapPin } from "lucide-react";
import BlurredPhoto from "@/components/BlurredPhoto";
import PageHero from "@/components/PageHero";
import { business, faqs } from "@/content/siteData.mjs";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Garcia Brothers">
        Family-owned HVAC service for Newark, East Orange, Belleville, and
        nearby Essex County homeowners, with 24-hour availability every day.
      </PageHero>
      <section className="section">
        <div className="container split">
          <div>
            <h2>Local heating and cooling work backed by real customer detail.</h2>
            <p className="section-lead">
              Garcia Brothers Heating & Air Conditioning responds to routine
              maintenance calls, urgent furnace failures, heat pump installs,
              ductwork redesigns, and complete system replacements across
              Newark-area homes.
            </p>
            <p>
              Reviews highlight technicians who explain the work before leaving
              the property and stay comfortable with nonstandard layouts. Named
              projects include a same-day furnace and ductwork replacement and a
              heat pump installation in a home with very limited attic access.
            </p>
            <div className="check-list">
              <div className="check-item">
                <BadgeCheck size={22} />
                <div>
                  <h3>{business.rating} star reputation</h3>
                  <p>{business.reviewCount} customer reviews are reflected in the business profile.</p>
                </div>
              </div>
              <div className="check-item">
                <ClipboardCheck size={22} />
                <div>
                  <h3>Complex-layout capability</h3>
                  <p>Tight attics, old ductwork, and full system swaps are part of the review record.</p>
                </div>
              </div>
              <div className="check-item">
                <MapPin size={22} />
                <div>
                  <h3>Newark service base</h3>
                  <p>{business.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="media-frame">
            <BlurredPhoto
              src="/projects/project-23.png"
              alt="Basement HVAC ductwork and mechanical lines during service"
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Frequently asked questions</h2>
              <p className="section-lead">
                Practical answers based on the business profile, hours, and
                named customer review examples.
              </p>
            </div>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <article className="info-card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
