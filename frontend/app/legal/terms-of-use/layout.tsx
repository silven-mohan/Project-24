import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the terms and conditions governing your use of the Project 24 platform.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/legal/terms-of-use" },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
