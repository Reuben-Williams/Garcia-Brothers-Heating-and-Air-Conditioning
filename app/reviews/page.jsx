import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";
import { business } from "@/content/siteData.mjs";

export const metadata = {
  title: "Reviews",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero title="Reviews">
        Garcia Brothers holds a {business.rating}-star rating across{" "}
        {business.reviewCount} customer reviews, with named feedback calling out
        communication, speed, and technical problem solving.
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="rating-panel">
            <div>
              <span className="eyebrow">Google review summary</span>
              <h2>{business.rating} stars from {business.reviewCount} reviews</h2>
              <p className="section-lead">
                The examples below highlight furnace replacement, heat pump
                installation, ductwork redesign, holiday AC repair, and tune-up
                experiences from the source review material.
              </p>
            </div>
            <a className="button secondary" href={business.reviewUrl}>
              Read reviews on Google
            </a>
          </div>
          <Reviews />
        </div>
      </section>
    </>
  );
}
