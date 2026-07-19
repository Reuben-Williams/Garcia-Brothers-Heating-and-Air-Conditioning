import Link from "next/link";
import { BadgeCheck, Clock, Phone, ShieldCheck } from "lucide-react";
import BlurredPhoto from "@/components/BlurredPhoto";
import ProjectGallery from "@/components/ProjectGallery";
import Reviews from "@/components/Reviews";
import ServiceGrid from "@/components/ServiceGrid";
import { business } from "@/content/siteData.mjs";

const fallbackHeroTitle = "Expert HVAC service for Newark-area homes.";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <Clock size={18} /> <span data-builder-region="home.hero.eyebrow" data-builder-kind="text">24/7 emergency service</span>
            </span>
            <h1 data-builder-region="home.hero.title" data-builder-kind="text">{fallbackHeroTitle}</h1>
            <p data-builder-region="home.hero.body" data-builder-kind="richText">
              Garcia Brothers Heating & Air Conditioning is a family-owned HVAC
              contractor serving Newark, East Orange, Belleville, and nearby
              Essex County communities with 24-hour heating and cooling support.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={business.phoneHref} data-builder-region="home.hero.primary-cta" data-builder-kind="link">
                <Phone size={18} />
                <span data-builder-link-label>Call Now</span>
              </a>
              <Link className="button ghost" href="/projects" data-builder-region="home.hero.secondary-cta" data-builder-kind="link">
                View Projects
              </Link>
            </div>
          </div>

          <BlurredPhoto
            className="hero-media"
              regionId="home.hero.image"
              src="/projects/project-01.png"
              alt="Residential outdoor condenser installed on a clean exterior pad"
              sizes="(max-width: 980px) 100vw, 54vw"
              priority
          >
            <div className="hero-card">
              <span className="icon-chip">
                <ShieldCheck size={24} />
              </span>
              <div data-builder-region="home.hero.reputation-note" data-builder-kind="richText">
                <strong>{business.rating} stars from {business.reviewCount} reviews</strong>
                <span>Open 24 hours every day for urgent HVAC calls.</span>
              </div>
            </div>
          </BlurredPhoto>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 data-builder-region="home.services.title" data-builder-kind="text">Heating and cooling services</h2>
              <p className="section-lead" data-builder-region="home.services.body" data-builder-kind="richText">
                Furnace replacement, heat pumps, ductwork, AC repair, emergency
                response, and indoor air-quality support for residential systems.
              </p>
            </div>
            <Link className="button secondary" href="/services" data-builder-region="home.services.cta" data-builder-kind="link">
              All Services
            </Link>
          </div>
          <ServiceGrid regionId="home.services.items" />
        </div>
      </section>

      <section className="section dark-band">
        <div className="container split">
          <div className="media-frame">
            <BlurredPhoto
              regionId="home.local-proof.image"
              src="/projects/project-02.png"
              alt="Technician working around attic HVAC equipment"
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 data-builder-region="home.local-proof.title" data-builder-kind="text">Built for real Newark homes and tight mechanical spaces.</h2>
            <p data-builder-region="home.local-proof.body" data-builder-kind="richText">
              Customer reviews call out work in cramped attics, older basements,
              and full ductwork replacements. Technicians Bryce, Edwin, Peyton,
              Preston, Bryson, and Trenton are repeatedly mentioned for clear
              explanations and careful service.
            </p>
            <div className="check-list" data-builder-region="home.local-proof.items" data-builder-kind="sections">
              <div className="check-item" data-builder-item-id="residential" data-builder-item-label="Residential HVAC focus">
                <BadgeCheck size={22} />
                <div>
                  <h3 data-builder-region="home.local-proof.residential.title" data-builder-kind="text">Residential HVAC focus</h3>
                  <p data-builder-region="home.local-proof.residential.body" data-builder-kind="richText">Heating, cooling, ductwork, and air-quality work for local homes.</p>
                </div>
              </div>
              <div className="check-item" data-builder-item-id="workmanship" data-builder-item-label="Review-backed workmanship">
                <BadgeCheck size={22} />
                <div>
                  <h3 data-builder-region="home.local-proof.workmanship.title" data-builder-kind="text">Review-backed workmanship</h3>
                  <p data-builder-region="home.local-proof.workmanship.body" data-builder-kind="richText">Named reviews highlight speed, communication, and technical skill.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 data-builder-region="home.projects.title" data-builder-kind="text">Recent project work</h2>
              <p className="section-lead" data-builder-region="home.projects.body" data-builder-kind="richText">
                A preview of installations, diagnostics, repairs, and equipment
                service.
              </p>
            </div>
            <Link className="button ghost" href="/projects" data-builder-region="home.projects.cta" data-builder-kind="link">
              Open Gallery
            </Link>
          </div>
          <ProjectGallery limit={4} regionId="home.projects.items" />
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 data-builder-region="home.reviews.title" data-builder-kind="text">Customer feedback</h2>
              <p className="section-lead" data-builder-region="home.reviews.body" data-builder-kind="richText">
                Named customer examples from Garcia Brothers review material.
              </p>
            </div>
          </div>
          <Reviews limit={3} regionId="home.reviews.items" />
        </div>
      </section>
    </>
  );
}
