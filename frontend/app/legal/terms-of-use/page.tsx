"use client";

import LegalPage from "@/components/legal/LegalPage";

export default function TermsOfUse() {
  return (
    <LegalPage
      title="Terms of Use"
      subtitle="By accessing or using Project 24, you agree to be bound by these terms. Please read them carefully before using the platform."
      lastUpdated="April 25, 2026"
      sections={[
        {
          heading: "Acceptance of Terms",
          body: "By creating an account or using any part of Project 24, you agree to these Terms of Use and our Privacy Policy. If you do not agree, you must not use the platform. We reserve the right to update these terms at any time. Continued use after updates constitutes acceptance.",
        },
        {
          heading: "Eligibility",
          body: [
            "You must be at least 13 years of age to use this platform.",
            "If you are under 18, you represent that you have parental or guardian consent.",
            "You must provide accurate information when creating your account.",
            "You may only maintain one account per person.",
          ],
        },
        {
          heading: "User Accounts",
          body: [
            "You are responsible for maintaining the confidentiality of your login credentials.",
            "You are fully responsible for all activity that occurs under your account.",
            "You must notify us immediately of any unauthorized access to your account.",
            "We reserve the right to suspend or terminate accounts that violate these terms.",
          ],
        },
        {
          heading: "Acceptable Use",
          body: [
            "You agree NOT to use Project 24 to upload, post, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.",
            "You agree NOT to impersonate any person or entity or misrepresent your affiliation.",
            "You agree NOT to interfere with or disrupt the platform's infrastructure or servers.",
            "You agree NOT to attempt to gain unauthorized access to any part of the platform.",
            "You agree NOT to use the platform for spam, phishing, or any commercial solicitation without prior written consent.",
            "You agree NOT to submit false challenge completions or manipulate leaderboard rankings.",
          ],
        },
        {
          heading: "User-Generated Content",
          body: "Users may submit content including challenge solutions, hackathon projects, study group posts, and profile information. By submitting content, you grant Project 24 a non-exclusive, royalty-free, worldwide license to display, distribute, and use that content in connection with operating the platform. You retain ownership of your content. You are solely responsible for ensuring your content does not infringe any third-party rights.",
        },
        {
          heading: "Third-Party Links & Integrations",
          body: "Project 24 contains links to third-party platforms including HackerRank and external hackathon websites. We are not responsible for the content, privacy practices, or terms of these external sites. Use of third-party services is at your own risk and subject to those services' own terms.",
        },
        {
          heading: "Intellectual Property",
          body: "All platform code, design, branding, and original content (excluding user-generated content) is the property of Project 24 and its contributors and is licensed under the MIT License (see the LICENSE file). You may not use the Project 24 brand, logo, or name without prior written permission.",
        },
        {
          heading: "Disclaimer of Warranties",
          body: "Project 24 is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components. Your use of the platform is entirely at your own risk.",
        },
        {
          heading: "Limitation of Liability",
          body: "To the fullest extent permitted by law, Project 24 and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the platform, even if we have been advised of the possibility of such damages.",
        },
        {
          heading: "Termination",
          body: "We reserve the right to suspend or terminate your access to Project 24 at any time, with or without cause or notice, if we believe you have violated these Terms of Use. Upon termination, your right to use the platform will immediately cease.",
        },
        {
          heading: "Governing Law",
          body: "These Terms of Use shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes shall be resolved through good-faith negotiation before pursuing any legal action.",
        },
        {
          heading: "Contact",
          body: "For questions about these Terms of Use, please contact us at: support@project24.dev or via the Project 24 GitHub repository.",
        },
      ]}
    />
  );
}
