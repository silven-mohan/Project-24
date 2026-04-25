import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puzzle Games — Train Your Brain",
  description:
    "Play daily AI-generated Sudoku and Minesweeper puzzles on Project 24. Track your progress and compete with friends.",
  openGraph: {
    title: "Puzzle Games — Train Your Brain | Project 24",
    description:
      "Daily AI-generated puzzles including Sudoku and Minesweeper. Sharpen your logic skills and track your streak.",
  },
  alternates: {
    canonical: "/puzzle-games",
  },
};

export default function PuzzleGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
