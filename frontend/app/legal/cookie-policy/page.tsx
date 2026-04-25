"use client";

import LegalPage from "@/components/legal/LegalPage";

export default function CookiePolicy() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="This policy explains how we use tracking technologies. By signing in, creating an account, or using Project 24, you agree to our use of cookies and tracking as described below."
      lastUpdated="April 25, 2026"
      sections={[
        {
          heading: "What Are Cookies?",
          body: "Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.",
        },
        {
          heading: "How We Use Cookies & Tracking",
          body: "Project 24 uses a combination of first-party and third-party tracking technologies. We do not serve traditional browser cookies for advertising purposes. However, we do use the following:",
        },
        {
          heading: "Essential Technologies (No Opt-Out)",
          body: [
            "Firebase Authentication Tokens — Stored in browser localStorage/IndexedDB to maintain your login session. Without these, you cannot remain logged in.",
            "Firebase Firestore SDK State — Cached locally to enable offline reads and reduce Firestore read costs.",
            "Next.js & Vercel Infrastructure — Vercel may set technical cookies for edge routing, caching, and server-side rendering. These are strictly necessary for the platform to function.",
          ],
        },
        {
          heading: "Analytics & Performance (Opt-Out Available)",
          body: [
            "Vercel Analytics — Collects anonymous, aggregated page view data and performance metrics. No personal identifiers are stored. Opt-out: Enable a browser content blocker such as uBlock Origin.",
            "Vercel Speed Insights — Collects anonymous Core Web Vitals metrics (LCP, INP, CLS) tied to your page visits. No personal identifiers. Opt-out: Enable a browser content blocker.",
            "Microsoft Clarity — Records anonymized session heatmaps and click maps to improve UX. Clarity is configured to mask all sensitive form inputs. Opt-out: Visit clarity.microsoft.com/opt-out or use a content blocker.",
          ],
        },
        {
          heading: "Third-Party Tracking",
          body: [
            "Google / Firebase — By using sign-in via Google, Google may set their own authentication cookies per Google's Privacy Policy.",
            "GitHub — By using sign-in via GitHub, GitHub may set their own authentication cookies per GitHub's Privacy Statement.",
            "HackerRank — When you click a challenge link to HackerRank, you are subject to HackerRank's own cookie and tracking policies.",
            "Google Search Console — A verification meta tag and verification file are present on the site. These do not set any tracking cookies on your device.",
          ],
        },
        {
          heading: "Managing Your Cookie Preferences",
          body: [
            "Browser Settings: All modern browsers allow you to block or delete cookies. Refer to your browser's help documentation for instructions.",
            "Content Blockers: Tools like uBlock Origin, Privacy Badger, or Brave's built-in shields can block third-party tracking scripts.",
            "Opt-Out Links: Microsoft Clarity opt-out: https://clarity.microsoft.com/opt-out | Google Analytics opt-out: https://tools.google.com/dlpage/gaoptout",
            "Note: Blocking essential cookies (Firebase Auth tokens) will prevent you from logging in and using authenticated features.",
          ],
        },
        {
          heading: "Data Retention",
          body: "Analytics data collected by Vercel is retained for up to 90 days. Microsoft Clarity session data is retained for up to 13 months. Firebase authentication tokens expire and are automatically refreshed by the Firebase SDK. You can clear all locally stored data at any time by clearing your browser's local storage for this site.",
        },
        {
          heading: "Changes to This Policy",
          body: "We may update this Cookie Policy from time to time to reflect changes in our practices or applicable regulations. By signing in, creating an account, or continued use of the platform, you agree to the latest version of this policy. When we make changes, we will update the 'Last updated' date at the top of this page.",
        },
        {
          heading: "Contact Us",
          body: "If you have any questions about our use of cookies or tracking technologies, please contact us at: silven667@gmail.com",
        },
      ]}
    />
  );
}
