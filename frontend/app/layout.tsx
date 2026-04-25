import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RippleGridBackground from "../components/background/RippleGridBackground";
import ClickSpark from "@/components/effects/ClickSpark";
import KineticProviders from "@/components/effects/KineticProviders";
import AppFrame from "@/components/layout/AppFrame";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://project-24.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Project 24 — Peer-to-Peer Learning Platform",
    template: "%s | Project 24",
  },
  description:
    "Join Project 24, a learner-first engineering ecosystem. Collaborate in hackathons, solve coding challenges, attend webinars, and grow with peer-led study groups.",
  keywords: [
    "peer learning",
    "coding challenges",
    "hackathons",
    "study groups",
    "webinars",
    "collaborative learning",
    "engineering community",
    "project 24",
  ],
  authors: [{ name: "Project 24 Team" }],
  creator: "Project 24",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Project 24",
    title: "Project 24 — Peer-to-Peer Learning Platform",
    description:
      "A learner-first engineering ecosystem. Hackathons, challenges, webinars, and study groups — all in one place.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Project 24 — Peer-to-Peer Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project 24 — Peer-to-Peer Learning Platform",
    description:
      "A learner-first engineering ecosystem. Hackathons, challenges, webinars, and study groups.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: [
      "d3woJ0p4_FkKHaxzTbizuORqRinronJRRUWp9ksYoSY",
      "google673575b69757ed8d"
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full w-full antialiased`}
    >
      <head>
        {/* Microsoft Clarity Tracking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wh6vqs2zax");
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Project 24",
              url: SITE_URL,
              description:
                "A learner-first engineering ecosystem. Collaborate in hackathons, solve coding challenges, attend webinars, and grow with peer-led study groups.",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "Project 24",
                url: SITE_URL,
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full w-full bg-[#06070f] text-white overflow-x-hidden m-0 p-0">
        <KineticProviders>
          <AppFrame>{children}</AppFrame>
        </KineticProviders>
        <ClickSpark
          sparkColor="#ffffff"
          sparkSize={13}
          sparkRadius={27}
          sparkCount={9}
          duration={400}
          easing="ease-out"
          extraScale={1}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
