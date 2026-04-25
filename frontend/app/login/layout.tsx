import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Access Your Account",
  description:
    "Sign in to Project 24 with Google, GitHub, or email. Access your learning dashboard, challenges, and community.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
