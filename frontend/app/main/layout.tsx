import type { Metadata } from "next";
import AppFrame from "@/components/layout/AppFrame";

export const metadata: Metadata = {
  title: "Arena — Explore & Learn",
  description:
    "Explore Project 24's learning arena. Access coding challenges, hackathons, webinars, study groups, and puzzle games — all in one hub.",
  openGraph: {
    title: "Arena — Explore & Learn | Project 24",
    description:
      "Your gateway to peer-to-peer learning. Coding challenges, hackathons, live webinars, and collaborative study groups.",
  },
  alternates: {
    canonical: "/main",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppFrame>{children}</AppFrame>;
}
