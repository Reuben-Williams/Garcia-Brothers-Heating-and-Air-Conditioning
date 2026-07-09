import { BadgeCheck, ClipboardCheck, MapPin } from "lucide-react";
import BlurredPhoto from "@/components/BlurredPhoto";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Garcia Brothers">
        A dependable HVAC brand presence for homeowners and business owners who
        want clear communication, responsive service, and careful workmanship.
      </PageHero>
      <section className="section">
        <div className="container split">
          <div>
            <h2>Professional HVAC work without the vague stock-photo feel.</h2>
            <p className="section-lead">
              This demo keeps the existing brand direction from the exported
              site, then replaces placeholder visuals with actual equipment and
              job-site images from the folder.
            </p>
            <div className="check-list">
              <div className="check-item">
                <BadgeCheck size={22} />
                <div>
                  <h3>Licensed-service positioning</h3>
                  <p>Copy emphasizes safe diagnostics, neat installs, and trust.</p>
                </div>
              </div>
              <div className="check-item">
                <ClipboardCheck size={22} />
                <div>
                  <h3>Transparent work process</h3>
                  <p>Visitors see the types of equipment and spaces serviced.</p>
                </div>
              </div>
              <div className="check-item">
                <MapPin size={22} />
                <div>
                  <h3>Local-service focus</h3>
                  <p>Built for a business owner to review as a GitHub Pages demo.</p>
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
    </>
  );
}
