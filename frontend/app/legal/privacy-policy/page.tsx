"use client";

import LegalPage from "@/components/legal/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="We are committed to protecting your privacy. By signing in, creating an account, or using Project 24, you agree to the collection and use of information in accordance with this policy."
      lastUpdated="April 25, 2026"
      sections={[
        {
          heading: "Who We Are",
          body: "Project 24 (accessible at project-24-pi.vercel.app) is a peer-to-peer learning platform built to connect learners through challenges, hackathons, webinars, and study groups. For privacy-related questions, contact us at: silven667@gmail.com",
        },
        {
          heading: "Information We Collect",
          body: [
            "Account Information: When you sign up via Google, GitHub, or email OTP, we receive your name, email address, and profile picture from the OAuth provider.",
            "Usage Data: We log page views, feature interactions, and navigation patterns via Vercel Analytics to improve the platform.",
            "Performance Data: Vercel Speed Insights collects anonymous Core Web Vitals metrics (LCP, INP, CLS) — no personal identifiers are included.",
            "Behavioral Data: Microsoft Clarity records anonymized session heatmaps and interaction replays to help us understand how users navigate the platform.",
            "Content You Create: Any challenges, posts, hackathon registrations, or study group memberships you create are stored in our Firestore database.",
            "Device & Technical Data: Browser type, operating system, and approximate location (country/region level) via analytics tools.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "To authenticate your identity and maintain your session securely.",
            "To display your profile, connections, and activity across the platform.",
            "To improve features, fix bugs, and personalize your experience.",
            "To send transactional communications such as OTP verification codes.",
            "To monitor performance, detect errors, and protect platform security.",
            "We do NOT sell, trade, or rent your personal data to third parties.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "Firebase / Google Cloud — Authentication, Firestore database, and hosting infrastructure.",
            "Google Gemini API — AI-powered daily puzzle generation. Puzzle inputs are processed ephemerally and not stored.",
            "Vercel — Deployment infrastructure, Analytics, and Speed Insights.",
            "Microsoft Clarity — Session heatmaps and behavioral analytics.",
            "HackerRank — External challenge platform linked from the Challenges section. Subject to HackerRank's own privacy policy.",
          ],
        },
        {
          heading: "Data Storage & Security",
          body: "All user data is stored in Google Cloud Firestore, a NoSQL database protected by Firestore Security Rules. Authentication tokens are managed by Firebase Auth and are never stored in plain text. Data is transmitted over HTTPS at all times. We retain your data for as long as your account is active. You may request deletion at any time.",
        },
        {
          heading: "Your Rights",
          body: [
            "Access: You may request a copy of the personal data we hold about you.",
            "Correction: You may update your profile information at any time via the Profile page.",
            "Deletion: You may request full account and data deletion by contacting us.",
            "Portability: You may request an export of your data in a machine-readable format.",
            "Objection: You may opt out of analytics tracking by enabling content blockers (e.g., uBlock Origin).",
          ],
        },
        {
          heading: "Children's Privacy",
          body: "Project 24 is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can delete it.",
        },
        {
          heading: "Changes to This Policy",
          body: "We may update this Privacy Policy from time to time. When we make material changes, we will update the 'Last updated' date at the top of this page. By signing in, creating an account, or continued use of the platform, you agree to the latest version of this policy.",
        },
        {
          heading: "Contact Us",
          body: "For any privacy-related inquiries, please reach out via the Project 24 GitHub repository or email: silven667@gmail.com",
        },
      ]}
    />
  );
}
