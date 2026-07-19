"use client";

import { ChevronLeft, ChevronRight, MessageSquareText, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlurredPhoto from "@/components/BlurredPhoto";
import { business, services } from "@/content/siteData.mjs";
import { regionIds } from "@/builder/region-ids.mjs";

function getServiceIndexFromHash() {
  if (typeof window === "undefined") {
    return 0;
  }

  const slug = window.location.hash.replace("#", "");
  const index = services.findIndex((service) => service.slug === slug);
  return index >= 0 ? index : 0;
}

export default function ServiceHeroCarousel() {
  const [index, setIndex] = useState(0);
  const service = services[index];

  useEffect(() => {
    function syncFromHash() {
      setIndex(getServiceIndexFromHash());
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function updateService(nextIndex) {
    const normalizedIndex = (nextIndex + services.length) % services.length;
    const nextService = services[normalizedIndex];

    setIndex(normalizedIndex);
    window.history.replaceState(null, "", `#${nextService.slug}`);
  }

  return (
    <section className="service-hero-carousel" aria-label="Service spotlight">
      <div className="service-anchor-stack" aria-hidden="true">
        {services.map((item) => (
          <span id={item.slug} key={item.slug} />
        ))}
      </div>

      <div className="service-hero-media">
        <BlurredPhoto
          src={service.heroImage.src}
          alt={service.heroImage.alt}
          sizes="(max-width: 980px) 100vw, 52vw"
          priority
          regionId={regionIds.service(service.slug, "hero-image")}
          regionScope="global"
          regionInstance={`service-spotlight-${service.slug}-image`}
        />
      </div>

      <div className="service-hero-copy">
        <span className="eyebrow" data-builder-region={regionIds.service(service.slug, "hero-label")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`service-spotlight-${service.slug}-label`}>{service.heroLabel}</span>
        <h1 data-builder-region={regionIds.service(service.slug, "title")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`service-spotlight-${service.slug}-title`}>{service.title}</h1>
        <p data-builder-region={regionIds.service(service.slug, "hero-summary")} data-builder-kind="richText" data-builder-scope="global" data-builder-instance={`service-spotlight-${service.slug}-summary`}>{service.heroSummary}</p>
        <div className="service-hero-actions">
          <Link className="button primary" href={service.contactHref} data-builder-region={regionIds.service(service.slug, "request-cta")} data-builder-kind="link" data-builder-scope="global" data-builder-instance={`service-spotlight-${service.slug}-request`}>
            <MessageSquareText size={18} />
            <span data-builder-link-label>Request Service</span>
          </Link>
          <a className="button ghost" href={business.phoneHref} data-builder-region="global.business.phone" data-builder-kind="link" data-builder-scope="global" data-builder-instance="service-spotlight-phone">
            <Phone size={18} />
            <span data-builder-link-label>Call Now</span>
          </a>
        </div>
        <div className="service-picker" aria-label="Choose a service">
          {services.map((item, itemIndex) => (
            <button
              aria-pressed={itemIndex === index}
              className={itemIndex === index ? "active" : ""}
              key={item.slug}
              onClick={() => updateService(itemIndex)}
              type="button"
            >
              <span data-builder-region={regionIds.service(item.slug, "title")} data-builder-kind="text" data-builder-scope="global" data-builder-instance={`service-picker-${item.slug}`}>{item.title}</span>
            </button>
          ))}
        </div>
        <div className="carousel-controls service-hero-controls">
          <button
            aria-label="Show previous service"
            className="icon-button"
            onClick={() => updateService(index - 1)}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Show next service"
            className="icon-button"
            onClick={() => updateService(index + 1)}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
