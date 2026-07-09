import {
  Building2,
  Flame,
  Siren,
  Snowflake,
  Wind,
  Wrench,
} from "lucide-react";
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
            className={`service-card${service.featured ? " featured" : ""}`}
            key={service.title}
          >
            <span className="icon-chip">
              <Icon size={26} />
            </span>
            <h3>{service.title}</h3>
            <p>{detailed ? service.detail : service.summary}</p>
          </article>
        );
      })}
    </div>
  );
}
