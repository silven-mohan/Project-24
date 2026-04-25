import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathons — Build & Compete",
  description:
    "Join live and upcoming hackathons on Project 24. Compete in AI, web dev, sustainability, and more. Win prizes and build your portfolio.",
  openGraph: {
    title: "Hackathons — Build & Compete | Project 24",
    description:
      "Compete in themed hackathons covering AI, web development, and sustainability. Build real projects with your peers.",
  },
  alternates: {
    canonical: "/hackathons",
  },
};

export default function HackathonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
