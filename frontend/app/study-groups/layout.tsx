import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Groups — Learn Together",
  description:
    "Join peer-led study groups on Project 24. Collaborate on DSA, frontend, backend, and more with accountability partners.",
  openGraph: {
    title: "Study Groups — Learn Together | Project 24",
    description:
      "Peer-led learning cohorts focused on collaboration, accountability, and social learning.",
  },
  alternates: {
    canonical: "/study-groups",
  },
};

export default function StudyGroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
