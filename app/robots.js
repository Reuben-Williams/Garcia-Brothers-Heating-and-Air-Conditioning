export default function robots() {
  const isPrivateStaging = process.env.NEXT_PUBLIC_SITE_ENVIRONMENT === "staging";

  return {
    rules: [
      isPrivateStaging
        ? { userAgent: "*", disallow: "/" }
        : { userAgent: "*", allow: "/" },
    ],
  };
}
