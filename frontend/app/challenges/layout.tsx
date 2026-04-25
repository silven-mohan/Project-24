import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges — Sharpen Your Skills",
  description:
    "Tackle coding challenges on Project 24. Practice algorithms, UI design, and problem-solving with HackerRank-integrated contests.",
  openGraph: {
    title: "Coding Challenges | Project 24",
    description:
      "Sharpen your coding skills with peer-driven challenges. Algorithms, UI battles, and competitive problem-solving.",
  },
  alternates: {
    canonical: "/challenges",
  },
};

export default function ChallengesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
