import { BadgeCheck, ClipboardCheck, MapPin } from "lucide-react";
import BlurredPhoto from "@/components/BlurredPhoto";
import PageHero from "@/components/PageHero";
import { business, faqs } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Garcia Brothers" titleRegion="about.hero.title" bodyRegion="about.hero.body">
        Family-owned HVAC service for Newark, East Orange, Belleville, and
        nearby Essex County homeowners, with 24-hour availability every day.
      </PageHero>
      <section className="section">
        <div className="container split">
          <div>
            <h2 data-builder-region="about.story.title" data-builder-kind="text">Local heating and cooling work backed by real customer detail.</h2>
            <p className="section-lead" data-builder-region="about.story.lead" data-builder-kind="richText">
              Garcia Brothers Heating & Air Conditioning responds to routine
              maintenance calls, urgent furnace failures, heat pump installs,
              ductwork redesigns, and complete system replacements across
              Newark-area homes.
            </p>
            <p data-builder-region="about.story.body" data-builder-kind="richText">
              Reviews highlight technicians who explain the work before leaving
              the property and stay comfortable with nonstandard layouts. Named
              projects include a same-day furnace and ductwork replacement and a
              heat pump installation in a home with very limited attic access.
            </p>
            <div className="check-list" data-builder-region="about.proof.items" data-builder-kind="sections">
              <div className="check-item" data-builder-item-id="reputation" data-builder-item-label="Reputation">
                <BadgeCheck size={22} />
                <div>
                  <h3 data-builder-region="about.proof.reputation.title" data-builder-kind="text">{business.rating} star reputation</h3>
                  <p data-builder-region="about.proof.reputation.body" data-builder-kind="richText">{business.reviewCount} customer reviews are reflected in the business profile.</p>
                </div>
              </div>
              <div className="check-item" data-builder-item-id="capability" data-builder-item-label="Complex-layout capability">
                <ClipboardCheck size={22} />
                <div>
                  <h3 data-builder-region="about.proof.capability.title" data-builder-kind="text">Complex-layout capability</h3>
                  <p data-builder-region="about.proof.capability.body" data-builder-kind="richText">Tight attics, old ductwork, and full system swaps are part of the review record.</p>
                </div>
              </div>
              <div className="check-item" data-builder-item-id="location" data-builder-item-label="Newark service base">
                <MapPin size={22} />
                <div>
                  <h3 data-builder-region="about.proof.location.title" data-builder-kind="text">Newark service base</h3>
                  <p data-builder-region="about.proof.location.body" data-builder-kind="richText">{business.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="media-frame">
            <BlurredPhoto
              regionId="about.story.image"
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
              <h2 data-builder-region="about.faq.title" data-builder-kind="text">Frequently asked questions</h2>
              <p className="section-lead" data-builder-region="about.faq.body" data-builder-kind="richText">
                Practical answers based on the business profile, hours, and
                named customer review examples.
              </p>
            </div>
          </div>
          <div className="faq-grid" data-builder-region="about.faq.items" data-builder-kind="sections">
            {faqs.map((faq) => (
              <article className="info-card" key={faq.id} data-builder-item-id={faq.id} data-builder-item-label={faq.question}>
                <h3 data-builder-region={regionIds.faq(faq.id, "question")} data-builder-kind="text" data-builder-scope="global">{faq.question}</h3>
                <p data-builder-region={regionIds.faq(faq.id, "answer")} data-builder-kind="richText" data-builder-scope="global">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
