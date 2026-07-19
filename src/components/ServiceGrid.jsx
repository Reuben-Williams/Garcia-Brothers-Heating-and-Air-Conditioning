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
import { regionIds } from "@/builder/region-ids.mjs";

const iconMap = {
  Building2,
  Flame,
  Siren,
  Snowflake,
  Wind,
  Wrench,
};

export default function ServiceGrid({ detailed = false, instance = detailed ? "services-list" : "home-services", regionId }) {
  return (
    <div className="service-grid" data-builder-region={regionId} data-builder-kind={regionId ? "sections" : undefined}>
      {services.map((service) => {
        const Icon = iconMap[service.icon] || Wrench;
        return (
          <article
            id={`${service.slug}-details`}
            className={`service-card${service.featured ? " featured" : ""}`}
            key={service.title}
            data-builder-item-id={service.slug}
            data-builder-item-label={service.title}
          >
            <span className="icon-chip">
              <Icon size={26} />
            </span>
            <h3>
              <Link href={service.detailHref} data-builder-region={regionIds.service(service.slug, "title")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`${instance}-${service.slug}-title`}>{service.title}</Link>
            </h3>
            <p data-builder-region={regionIds.service(service.slug, detailed ? "detail" : "summary")} data-builder-kind="richText" data-builder-scope="global" data-builder-instance={`${instance}-${service.slug}-copy`}>{detailed ? service.detail : service.summary}</p>
            <div className="service-actions">
              <Link className="service-link" href={service.detailHref} data-builder-region={regionIds.service(service.slug, "detail-cta")} data-builder-kind="link" data-builder-scope="global" data-builder-instance={`${instance}-${service.slug}-detail-cta`}>
                Learn More
              </Link>
              <Link
                aria-label={service.ctaLabel}
                className="service-link primary"
                href={service.contactHref}
                data-builder-region={regionIds.service(service.slug, "request-cta")}
                data-builder-kind="link"
                data-builder-scope="global"
                data-builder-instance={`${instance}-${service.slug}-request-cta`}
              >
                <MessageSquareText size={17} />
                <span data-builder-link-label>Request Service</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
