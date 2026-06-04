import { LegalPage } from "./legal-page";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      seoTitle="Privacy Policy — Merch Club"
      seoDescription="How Merch Club collects, uses, and protects your information."
      path="/privacy-policy"
      breadcrumbLabel="Privacy Policy"
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="June 4, 2026"
      intro={
        <p>
          Merch Club ("we," "us," "our") respects your privacy. This policy explains what we collect, why we collect it,
          and the choices you have. It applies to merchclub.com and any related services we provide.
        </p>
      }
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                We collect information you give us directly — name, email, company, phone, and project details when you
                contact us, request a quote, or subscribe to our newsletter.
              </p>
              <p>
                We also collect basic usage data automatically through cookies and analytics tools — pages visited,
                referring site, device type, and approximate location.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use It",
          body: (
            <p>
              To respond to your inquiries, deliver merchandise programs you've requested, send you the newsletter (if you
              opted in), improve the site, and meet legal and accounting obligations. We do not sell your personal
              information.
            </p>
          ),
        },
        {
          heading: "Sharing",
          body: (
            <>
              <p>
                We share information only with vendors that help us operate the business — production partners, fulfillment
                providers, email and analytics tools — and only what they need to do their job. We may also share
                information when required by law.
              </p>
              <p>
                Mobile opt-in, SMS consent, and phone numbers collected for SMS communication purposes will not be shared
                with any third party or affiliates for marketing purposes.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              We use a small number of cookies to keep the site working, remember preferences, and measure traffic. You
              can disable cookies in your browser settings; some parts of the site may not work as expected if you do.
            </p>
          ),
        },
        {
          heading: "Your Choices",
          body: (
            <p>
              You can unsubscribe from marketing emails any time using the link in any email. You can request a copy of
              the personal information we hold about you, ask us to correct it, or ask us to delete it by emailing{" "}
              <a href="mailto:privacy@merchclub.com" className="text-black underline hover:no-underline">
                privacy@merchclub.com
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Data Retention & Security",
          body: (
            <p>
              We keep your information only as long as we need it to provide our services and meet legal requirements. We
              use industry-standard safeguards to protect it, but no system is 100% secure.
            </p>
          ),
        },
        {
          heading: "Children",
          body: <p>Our services are not intended for anyone under 16, and we do not knowingly collect their data.</p>,
        },
        {
          heading: "Changes",
          body: (
            <p>
              We may update this policy from time to time. Material changes will be posted here with a new "last updated"
              date.
            </p>
          ),
        },
      ]}
    />
  );
}
