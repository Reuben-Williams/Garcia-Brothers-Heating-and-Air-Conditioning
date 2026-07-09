import {
  Building2,
  Flame,
  MessageSquareText,
  Siren,
  Snowflake,
  Wind,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/content/siteData.mjs";

const iconMap = {
  Building2,
  Flame,
  Siren,
  Snowflake,
  Wind,
  Wrench,
};

export default function ServiceGrid({ detailed = false }) {
  return (
    <div className="service-grid">
      {services.map((service) => {
        const Icon = iconMap[service.icon] || Wrench;
        return (
          <article
            id={service.slug}
            className={`service-card${service.featured ? " featured" : ""}`}
            key={service.title}
          >
            <span className="icon-chip">
              <Icon size={26} />
            </span>
            <h3>
              <Link href={service.detailHref}>{service.title}</Link>
            </h3>
            <p>{detailed ? service.detail : service.summary}</p>
            <div className="service-actions">
              <Link className="service-link" href={service.detailHref}>
                Learn More
              </Link>
              <Link
                aria-label={service.ctaLabel}
                className="service-link primary"
                href={service.contactHref}
              >
                <MessageSquareText size={17} />
                Request Service
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
