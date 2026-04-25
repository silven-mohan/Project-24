import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinars — Learn from Experts",
  description:
    "Watch recorded sessions or join live webinars on Project 24. Deep dives into modern tech, best practices, and hands-on workshops.",
  openGraph: {
    title: "Webinars — Learn from Experts | Project 24",
    description:
      "Live and recorded tech webinars covering modern development, AI, and software engineering best practices.",
  },
  alternates: {
    canonical: "/webinars",
  },
};

export default function WebinarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
