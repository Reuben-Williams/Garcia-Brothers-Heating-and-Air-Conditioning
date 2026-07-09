import { Star } from "lucide-react";
import { reviews } from "@/content/siteData.mjs";

export default function Reviews({ limit }) {
  const visibleReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <div className="reviews-grid">
      {visibleReviews.map((review) => (
        <article className="review-card" key={review.name}>
          <div className="stars" aria-label="Five star review">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={18} fill="currentColor" />
            ))}
          </div>
          <p>“{review.quote}”</p>
          <h3>{review.name}</h3>
          <p>{review.location}</p>
        </article>
      ))}
    </div>
  );
}
