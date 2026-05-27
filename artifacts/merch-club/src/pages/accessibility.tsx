import { LegalPage } from "./legal-page";

export default function Accessibility() {
  return (
    <LegalPage
      seoTitle="Accessibility Statement — Merch Club"
      seoDescription="Merch Club's commitment to an accessible web experience for everyone."
      path="/accessibility"
      breadcrumbLabel="Accessibility"
      eyebrow="Legal"
      title="Accessibility Statement"
      lastUpdated="May 27, 2026"
      intro={
        <p>
          Merch Club is committed to making merchclub.com usable for everyone, including people who rely on assistive
          technologies. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
        </p>
      }
      sections={[
        {
          heading: "What We're Doing",
          body: (
            <>
              <p>
                We design with sufficient color contrast, keyboard-navigable controls, semantic structure, descriptive
                link text, and alternative text for meaningful images.
              </p>
              <p>
                Accessibility is reviewed as part of our normal design and development process, and we test with both
                automated tools and manual checks.
              </p>
            </>
          ),
        },
        {
          heading: "Known Limitations",
          body: (
            <p>
              Some third-party content (embedded video, social feeds, legacy PDFs) may not yet meet our accessibility
              targets. We're working to address these as we update each part of the site.
            </p>
          ),
        },
        {
          heading: "Feedback",
          body: (
            <p>
              If you run into an accessibility barrier on our site, please tell us. Email{" "}
              <a href="mailto:accessibility@merchclub.com" className="text-black underline hover:no-underline">
                accessibility@merchclub.com
              </a>{" "}
              with the page you were on and what happened, and we'll respond within five business days.
            </p>
          ),
        },
        {
          heading: "Alternative Access",
          body: (
            <p>
              If you'd prefer to reach us another way, call <span className="whitespace-nowrap">+1 531-777-0347</span>{" "}
              Monday–Friday, 8:00 AM – 6:00 PM CT, and a team member will help you directly.
            </p>
          ),
        },
      ]}
    />
  );
}
