export default {
  siteId: "garcia-brothers-hvac",
  adapter: "supabase",
  editor: { path: "/admin/editor", protected: true },
  pages: [
    { path: "/", label: "Home", regions: [
      "global.business.name", "global.business.short-name", "global.business.phone",
      "global.business.address", "global.business.service-area", "global.business.hours-summary",
      "global.business.rating-summary", "global.business.review-url", "global.hours",
      "global.navigation.primary", "global.footer.emergency.eyebrow", "global.footer.emergency.title",
      "global.footer.emergency.body", "global.footer.emergency.primary-cta",
      "global.footer.emergency.secondary-cta", "global.footer.brand-summary", "seo.site.default",
      "seo.home", "collections.featured-projects", "home.hero.eyebrow", "home.hero.title", "home.hero.body",
      "home.hero.primary-cta", "home.hero.secondary-cta", "home.hero.image",
      "home.hero.reputation-note", "home.services.title", "home.services.body", "home.services.cta",
      "home.local-proof.title", "home.local-proof.body", "home.local-proof.image",
      "home.local-proof.items", "home.projects.title", "home.projects.body", "home.projects.cta",
      "home.reviews.title", "home.reviews.body",
    ] },
    { path: "/about", label: "About", regions: [
      "seo.about", "collections.faqs", "about.hero.title", "about.hero.body", "about.story.title",
      "about.story.lead", "about.story.body", "about.story.image", "about.proof.items",
      "about.faq.title", "about.faq.body",
    ] },
    { path: "/services", label: "Services", regions: [
      "seo.services", "collections.services", "services.hero.items", "services.list.title",
      "services.list.body", "services.urgent.title", "services.urgent.body", "services.urgent.cta",
    ] },
    { path: "/projects", label: "Projects", regions: [
      "seo.projects", "collections.projects", "projects.hero.title", "projects.hero.body",
      "projects.hero.spotlight", "projects.gallery.title", "projects.gallery.body",
      "projects.gallery.items",
    ] },
    { path: "/reviews", label: "Reviews", regions: [
      "seo.reviews", "collections.reviews", "reviews.hero.title", "reviews.hero.body",
      "reviews.summary.eyebrow", "reviews.summary.body",
      "reviews.summary.cta", "reviews.list.items",
    ] },
    { path: "/contact", label: "Contact", regions: [
      "seo.contact", "contact.hero.title", "contact.hero.body", "contact.details",
      "forms.service-request",
    ] },
  ],
  sections: {},
};
