import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://project-24.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/profile/", "/post/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
