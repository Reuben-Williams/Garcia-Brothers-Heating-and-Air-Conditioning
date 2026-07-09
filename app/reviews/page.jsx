import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";

export const metadata = {
  title: "Reviews",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero title="Reviews">
        Demo review content that can be replaced with verified customer quotes
        before the site goes live for the business.
      </PageHero>
      <section className="section">
        <div className="container">
          <Reviews />
        </div>
      </section>
    </>
  );
}
