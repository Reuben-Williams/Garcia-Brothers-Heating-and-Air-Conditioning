import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";
import { business } from "@/content/siteData.mjs";

export const metadata = {
  title: "Reviews",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero title="Reviews" titleRegion="reviews.hero.title" bodyRegion="reviews.hero.body">
        Garcia Brothers holds a {business.rating}-star rating across{" "}
        {business.reviewCount} customer reviews, with named feedback calling out
        communication, speed, and technical problem solving.
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="rating-panel">
            <div>
              <span className="eyebrow" data-builder-region="reviews.summary.eyebrow" data-builder-kind="text">Google review summary</span>
              <h2 data-builder-region="reviews.summary.title" data-builder-kind="text">{business.rating} stars from {business.reviewCount} reviews</h2>
              <p className="section-lead" data-builder-region="reviews.summary.body" data-builder-kind="richText">
                The examples below highlight furnace replacement, heat pump
                installation, ductwork redesign, holiday AC repair, and tune-up
                experiences from the source review material.
              </p>
            </div>
            <a className="button secondary" href={business.reviewUrl} data-builder-region="reviews.summary.cta" data-builder-kind="link">
              Read reviews on Google
            </a>
          </div>
          <Reviews regionId="reviews.list.items" />
        </div>
      </section>
    </>
  );
}
