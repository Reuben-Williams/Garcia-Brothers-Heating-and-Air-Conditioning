import { Star } from "lucide-react";
import { reviews } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

export default function Reviews({ limit, instance = limit ? "home-reviews" : "reviews-list", regionId }) {
  const visibleReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <div className="reviews-grid" data-builder-region={regionId} data-builder-kind={regionId ? "sections" : undefined}>
      {visibleReviews.map((review) => (
        <article className="review-card" key={review.id} data-builder-item-id={review.id} data-builder-item-label={review.name}>
          <div className="stars" aria-label="Five star review">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={18} fill="currentColor" />
            ))}
          </div>
          <p data-builder-region={regionIds.review(review.id, "quote")} data-builder-kind="richText" data-builder-scope="global" data-builder-instance={`${instance}-${review.id}-quote`}>"{review.quote}"</p>
          <h3 data-builder-region={regionIds.review(review.id, "name")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`${instance}-${review.id}-name`}>{review.name}</h3>
          <p data-builder-region={regionIds.review(review.id, "location")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`${instance}-${review.id}-location`}>{review.location}</p>
        </article>
      ))}
    </div>
  );
}
