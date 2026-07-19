export const regionIds = {
  navigation: (id) => `global.navigation.${id}`,
  service: (id, field) => `collections.services.${id}.${field}`,
  project: (id, field) => `collections.projects.${id}.${field}`,
  review: (id, field) => `collections.reviews.${id}.${field}`,
  faq: (id, field) => `collections.faqs.${id}.${field}`,
  hour: (id, field) => `global.hours.${id}.${field}`,
};
