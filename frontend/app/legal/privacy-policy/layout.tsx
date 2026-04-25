import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Project 24 collects, uses, and protects your personal data. Your privacy is important to us.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
