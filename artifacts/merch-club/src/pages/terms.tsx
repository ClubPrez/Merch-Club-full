import { LegalPage } from "./legal-page";

export default function Terms() {
  return (
    <LegalPage
      seoTitle="Terms of Service — Merch Club"
      seoDescription="The terms that govern your use of Merch Club's website and services."
      path="/terms"
      breadcrumbLabel="Terms of Service"
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="June 4, 2026"
      intro={
        <p>
          These terms govern your use of merchclub.com and any services we provide. By using the site or engaging us for
          a project, you agree to them. If you don't agree, please don't use the site.
        </p>
      }
      sections={[
        {
          heading: "Using the Site",
          body: (
            <p>
              You agree to use the site lawfully and not to interfere with how it works, attempt to access areas you're
              not authorized to, or scrape content without permission.
            </p>
          ),
        },
        {
          heading: "Projects & Quotes",
          body: (
            <p>
              Quotes, mockups, and proposals are estimates based on the scope you share with us. Final pricing, lead
              times, and deliverables are confirmed in a signed order or statement of work. Production begins after
              written approval of artwork and payment terms.
            </p>
          ),
        },
        {
          heading: "Intellectual Property",
          body: (
            <p>
              All Merch Club branding, copy, photography, and original designs on the site belong to Merch Club. You keep
              ownership of any artwork or trademarks you provide to us, and you grant us a limited license to use them to
              produce your order.
            </p>
          ),
        },
        {
          heading: "Payment & Cancellation",
          body: (
            <p>
              Payment terms are set out in your order. Once production begins, custom orders generally can't be cancelled
              or refunded. We'll always work with you in good faith if something goes wrong.
            </p>
          ),
        },
        {
          heading: "Disclaimers",
          body: (
            <p>
              The site is provided "as is." We do our best to keep information accurate and the site available, but we
              don't guarantee either. Product images are representative and final goods may vary slightly.
            </p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>
              To the fullest extent permitted by law, Merch Club is not liable for indirect, incidental, or consequential
              damages arising out of your use of the site or our services. Our total liability for any project is limited
              to the amount paid for that project.
            </p>
          ),
        },
        {
          heading: "Governing Law",
          body: <p>These terms are governed by the laws of the State of Nebraska, USA, without regard to conflict of laws principles.</p>,
        },
        {
          heading: "SMS Terms & Conditions",
          body: (
            <>
              <p><strong>1. SMS Consent Communication</strong><br />
              The information (phone numbers) obtained as part of the SMS consent process will not be shared with third parties for marketing purposes.</p>
              <p><strong>2. Types of SMS Communications</strong><br />
              If you have consented to receive text messages from Merch Club, you may receive messages related to the following:</p>
              <ul>
                <li>Appointment reminders</li>
                <li>Follow-up messages</li>
                <li>Inquiries</li>
              </ul>
              <p><strong>3. Message Frequency</strong><br />
              Message frequency may vary depending on the type of communication.</p>
              <p><strong>4. Potential Fees for SMS Messaging</strong><br />
              Please note that standard message and data rates may apply, depending on your carrier's pricing plan. These fees may vary if the message is sent domestically or internationally.</p>
              <p><strong>5. Opt-In Method</strong><br />
              You may opt in to receive SMS messages from Merch Club verbally, during a conversation.</p>
              <p><strong>6. Opt-Out Method</strong><br />
              You can opt out of receiving SMS messages at any time. To do so, simply reply "STOP" to any SMS message you receive. Alternatively, you can contact us directly to request removal from our messaging list.</p>
              <p><strong>7. Help</strong><br />
              If you are experiencing any issues, you can reply with the keyword HELP.</p>
              <p><strong>8. Standard Messaging Disclosures</strong></p>
              <ul>
                <li>Message and data rates may apply.</li>
                <li>You can opt out at any time by texting "STOP."</li>
                <li>For assistance, text "HELP" or visit our website at <a href="https://merchclub.com" className="text-black underline hover:no-underline">https://merchclub.com</a>.</li>
                <li>Message frequency may vary.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              We may update these terms from time to time. Continued use of the site after changes means you accept the
              updated terms.
            </p>
          ),
        },
      ]}
    />
  );
}
