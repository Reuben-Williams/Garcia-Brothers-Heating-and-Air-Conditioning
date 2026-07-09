import Link from "next/link";
import { BadgeCheck, Clock, Phone, ShieldCheck } from "lucide-react";
import BlurredPhoto from "@/components/BlurredPhoto";
import ProjectGallery from "@/components/ProjectGallery";
import Reviews from "@/components/Reviews";
import ServiceGrid from "@/components/ServiceGrid";
import { business } from "@/content/siteData.mjs";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <Clock size={18} /> 24/7 emergency service
            </span>
            <h1>Expert HVAC service for homes and businesses.</h1>
            <p>
              Garcia Brothers handles heating, cooling, maintenance, and
              emergency calls with clean workmanship, practical diagnostics, and
              straightforward communication.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={business.phoneHref}>
                <Phone size={18} />
                Call Now
              </a>
              <Link className="button ghost" href="/projects">
                View Projects
              </Link>
            </div>
          </div>

          <BlurredPhoto
            className="hero-media"
              src="/projects/project-01.png"
              alt="Residential outdoor condenser installed on a clean exterior pad"
              sizes="(max-width: 980px) 100vw, 54vw"
              priority
          >
            <div className="hero-card">
              <span className="icon-chip">
                <ShieldCheck size={24} />
              </span>
              <div>
                <strong>Clean installations, documented service</strong>
                <span>Real project photos from the Garcia Brothers folder.</span>
              </div>
            </div>
          </BlurredPhoto>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Heating and cooling services</h2>
              <p className="section-lead">
                The core work customers expect from a dependable HVAC company.
              </p>
            </div>
            <Link className="button secondary" href="/services">
              All Services
            </Link>
          </div>
          <ServiceGrid />
        </div>
      </section>

      <section className="section dark-band">
        <div className="container split">
          <div className="media-frame">
            <BlurredPhoto
              src="/projects/project-02.png"
              alt="Technician working around attic HVAC equipment"
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2>Built around trust, access, and neat work.</h2>
            <p>
              HVAC work often happens in tight attics, basements, utility
              closets, side yards, and finished rooms. The site uses real job
              photos because prospective customers should see the actual kind
              of work they are hiring for.
            </p>
            <div className="check-list">
              <div className="check-item">
                <BadgeCheck size={22} />
                <div>
                  <h3>Residential and commercial service</h3>
                  <p>Cooling, heating, maintenance, and light commercial calls.</p>
                </div>
              </div>
              <div className="check-item">
                <BadgeCheck size={22} />
                <div>
                  <h3>Local project proof</h3>
                  <p>Every major visual on this demo comes from the folder.</p>
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
              <h2>Recent project work</h2>
              <p className="section-lead">
                A preview of installations, diagnostics, repairs, and equipment
                service.
              </p>
            </div>
            <Link className="button ghost" href="/projects">
              Open Gallery
            </Link>
          </div>
          <ProjectGallery limit={4} />
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Customer feedback</h2>
              <p className="section-lead">
                Short review examples for the demo until real testimonials are
                available.
              </p>
            </div>
          </div>
          <Reviews limit={3} />
        </div>
      </section>
    </>
  );
}
