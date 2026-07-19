import { regionIds } from "./src/builder/region-ids.mjs";
import { faqs, hours, navItems, projectImages, reviews, services } from "./src/content/siteData.mjs";

const region = (id, kind, label) => ({ id, kind, label });
const text = (id, label) => region(id, "text", label);
const richText = (id, label) => region(id, "richText", label);
const link = (id, label) => region(id, "link", label);
const image = (id, label) => region(id, "image", label);
const sections = (id, label) => region(id, "sections", label);

const serviceRegions = services.flatMap((service) => [
  text(regionIds.service(service.slug, "title"), `${service.title} title`),
  richText(regionIds.service(service.slug, "summary"), `${service.title} summary`),
  richText(regionIds.service(service.slug, "detail"), `${service.title} detail`),
  text(regionIds.service(service.slug, "hero-label"), `${service.title} spotlight label`),
  richText(regionIds.service(service.slug, "hero-summary"), `${service.title} spotlight summary`),
  image(regionIds.service(service.slug, "hero-image"), `${service.title} image`),
  link(regionIds.service(service.slug, "detail-cta"), `${service.title} detail link`),
  link(regionIds.service(service.slug, "request-cta"), `${service.title} request link`),
]);

const projectRegions = projectImages.flatMap((project) => [
  image(regionIds.project(project.id, "image"), `${project.title} image`),
  text(regionIds.project(project.id, "title"), `${project.title} title`),
  richText(regionIds.project(project.id, "summary"), `${project.title} summary`),
]);

const reviewRegions = reviews.flatMap((review) => [
  richText(regionIds.review(review.id, "quote"), `${review.name} review`),
  text(regionIds.review(review.id, "name"), `${review.name} name`),
  text(regionIds.review(review.id, "location"), `${review.name} service context`),
]);

const faqRegions = faqs.flatMap((faq) => [
  text(regionIds.faq(faq.id, "question"), `${faq.id} question`),
  richText(regionIds.faq(faq.id, "answer"), `${faq.id} answer`),
]);

const hourRegions = hours.flatMap((entry) => {
  const id = entry.day.toLowerCase();
  return [
    text(regionIds.hour(id, "day"), `${entry.day} label`),
    text(regionIds.hour(id, "value"), `${entry.day} hours`),
  ];
});

export default {
  siteId: "garcia-brothers-hvac",
  adapter: "supabase",
  editor: { path: "/admin/editor", protected: true },
  globalRegions: [
    text("global.business.name", "Business name"),
    text("global.business.short-name", "Short business name"),
    link("global.business.phone", "Business phone"),
    text("global.business.address", "Business address"),
    richText("global.business.service-area", "Service area"),
    text("global.business.hours-summary", "Hours summary"),
    text("global.business.rating-summary", "Rating summary"),
    link("global.business.review-url", "Google reviews link"),
    sections("global.hours", "Weekly hours"),
    ...hourRegions,
    sections("global.navigation.primary", "Primary navigation"),
    ...navItems.map((item) => link(regionIds.navigation(item.id), `${item.label} navigation link`)),
    link("global.header.emergency-cta", "Header emergency button"),
    text("global.footer.emergency.eyebrow", "Footer emergency label"),
    text("global.footer.emergency.title", "Footer emergency title"),
    richText("global.footer.emergency.body", "Footer emergency description"),
    link("global.footer.emergency.primary-cta", "Footer phone button"),
    link("global.footer.emergency.secondary-cta", "Footer request button"),
    richText("global.footer.brand-summary", "Footer business summary"),
    text("global.footer.explore-title", "Footer explore heading"),
    text("global.footer.services-title", "Footer services heading"),
    text("global.footer.contact-title", "Footer contact heading"),
    text("global.footer.copyright", "Footer copyright"),
    richText("global.footer.service-area", "Footer service area"),
    richText("seo.site.default", "Default search description"),
    sections("collections.services", "Services"),
    ...serviceRegions,
    sections("collections.projects", "Projects"),
    ...projectRegions,
    sections("collections.reviews", "Reviews"),
    ...reviewRegions,
    sections("collections.faqs", "Frequently asked questions"),
    ...faqRegions,
  ],
  pages: [
    { path: "/", label: "Home", regions: [
      richText("seo.home", "Home search description"),
      text("home.hero.eyebrow", "Hero label"), text("home.hero.title", "Hero title"),
      richText("home.hero.body", "Hero description"), link("home.hero.primary-cta", "Hero phone button"),
      link("home.hero.secondary-cta", "Hero projects button"), image("home.hero.image", "Hero image"),
      richText("home.hero.reputation-note", "Hero reputation note"), text("home.services.title", "Services heading"),
      richText("home.services.body", "Services introduction"), link("home.services.cta", "All services button"),
      sections("home.services.items", "Home services"), text("home.local-proof.title", "Local proof heading"),
      richText("home.local-proof.body", "Local proof description"), image("home.local-proof.image", "Local proof image"),
      sections("home.local-proof.items", "Local proof points"), text("home.local-proof.residential.title", "Residential proof title"),
      richText("home.local-proof.residential.body", "Residential proof text"), text("home.local-proof.workmanship.title", "Workmanship proof title"),
      richText("home.local-proof.workmanship.body", "Workmanship proof text"), text("home.projects.title", "Projects heading"),
      richText("home.projects.body", "Projects introduction"), link("home.projects.cta", "Open gallery button"),
      sections("home.projects.items", "Featured projects"), text("home.reviews.title", "Reviews heading"),
      richText("home.reviews.body", "Reviews introduction"), sections("home.reviews.items", "Featured reviews"),
    ] },
    { path: "/about", label: "About", regions: [
      richText("seo.about", "About search description"), text("about.hero.title", "About title"),
      richText("about.hero.body", "About introduction"), text("about.story.title", "Story heading"),
      richText("about.story.lead", "Story lead"), richText("about.story.body", "Story body"),
      image("about.story.image", "Story image"), sections("about.proof.items", "About proof points"),
      text("about.proof.reputation.title", "Reputation proof title"), richText("about.proof.reputation.body", "Reputation proof text"),
      text("about.proof.capability.title", "Capability proof title"), richText("about.proof.capability.body", "Capability proof text"),
      text("about.proof.location.title", "Location proof title"), richText("about.proof.location.body", "Location proof text"),
      text("about.faq.title", "FAQ heading"), richText("about.faq.body", "FAQ introduction"),
      sections("about.faq.items", "FAQ items"),
    ] },
    { path: "/services", label: "Services", regions: [
      richText("seo.services", "Services search description"), sections("services.hero.items", "Service spotlight"),
      text("services.list.title", "Services list heading"), richText("services.list.body", "Services list introduction"),
      sections("services.list.items", "Service list"), text("services.urgent.title", "Urgent service heading"),
      richText("services.urgent.body", "Urgent service text"), link("services.urgent.cta", "Urgent phone button"),
    ] },
    { path: "/projects", label: "Projects", regions: [
      richText("seo.projects", "Projects search description"), text("projects.hero.title", "Projects title"),
      richText("projects.hero.body", "Projects introduction"), sections("projects.hero.spotlight", "Project spotlight"),
      text("projects.gallery.title", "Gallery heading"), richText("projects.gallery.body", "Gallery introduction"),
      sections("projects.gallery.items", "Project gallery"),
    ] },
    { path: "/reviews", label: "Reviews", regions: [
      richText("seo.reviews", "Reviews search description"), text("reviews.hero.title", "Reviews title"),
      richText("reviews.hero.body", "Reviews introduction"), text("reviews.summary.eyebrow", "Review summary label"),
      text("reviews.summary.title", "Review summary title"), richText("reviews.summary.body", "Review summary text"),
      link("reviews.summary.cta", "Google reviews button"), sections("reviews.list.items", "Review list"),
    ] },
    { path: "/contact", label: "Contact", regions: [
      richText("seo.contact", "Contact search description"), text("contact.hero.title", "Contact title"),
      richText("contact.hero.body", "Contact introduction"), sections("contact.details", "Contact details"),
      text("contact.details.phone-title", "Phone card title"), text("contact.details.address-title", "Address card title"),
      text("contact.details.hours-title", "Hours card title"), text("contact.details.area-title", "Service area card title"),
      sections("forms.service-request", "Service request form"), text("forms.service-request.first-name.label", "First name label"),
      text("forms.service-request.last-name.label", "Last name label"), text("forms.service-request.email.label", "Email label"),
      text("forms.service-request.phone.label", "Phone label"), text("forms.service-request.zip.label", "ZIP code label"),
      text("forms.service-request.urgency.label", "Urgency label"), text("forms.service-request.service.label", "Service label"),
      text("forms.service-request.urgency.standard", "Standard urgency option"), text("forms.service-request.urgency.urgent", "Urgent option"),
      text("forms.service-request.urgency.emergency", "Emergency option"), text("forms.service-request.service.placeholder", "Service placeholder"),
      text("forms.service-request.message.label", "Message label"), text("forms.service-request.message.placeholder", "Message placeholder"),
      text("forms.service-request.submit.label", "Submit button label"),
    ] },
  ],
  sections: {},
};
