import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn about how Project 24 uses cookies and similar tracking technologies to improve your experience.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/legal/cookie-policy" },
};

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
