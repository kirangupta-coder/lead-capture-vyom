import { useState } from "react";
import { LeadForm } from "./LeadForm";
import type { LeadValues } from "./leadValidation";
import styles from "./LeadPage.module.css";

export function LeadPage() {
  const [submittedValues, setSubmittedValues] = useState<LeadValues | null>(null);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.brandRow}>
          <div className={styles.brandMark} aria-hidden="true">N.</div>
          <div>
            <div className={styles.brandName}>Northstar</div>
            <div className={styles.brandCaption}>Solutions that move you forward</div>
          </div>
        </header>

        <div className={styles.layout}>
          <section className={styles.intro} aria-labelledby="page-title">
            <div className={styles.eyebrow}><span className={styles.eyebrowDot} /> Let’s talk</div>
            <h1 className={styles.title} id="page-title">Tell us what you’re looking for.</h1>
            <p className={styles.description}>
              Share a few details and our team will get back to you with the right next steps.
              It takes less than two minutes.
            </p>
            <div className={styles.trustRow}>
              <span className={styles.trustItem}><span className={styles.trustIcon}>✓</span> Personalised follow-up</span>
              <span className={styles.trustItem}><span className={styles.trustIcon}>✓</span> No obligation</span>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="form-title">
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="form-title">Enquiry details</h2>
              <p className={styles.cardDescription}>Fields marked with an asterisk are required.</p>
            </div>
            <LeadForm onSubmit={setSubmittedValues} />

            {submittedValues && (
              <section className={styles.result} aria-live="polite" aria-labelledby="result-title">
                <h3 className={styles.resultTitle} id="result-title">Form submitted successfully</h3>
                <p className={styles.resultText}>This demo does not send data to a server. Here are the submitted values:</p>
                <pre className={styles.resultPre}>{JSON.stringify(submittedValues, null, 2)}</pre>
              </section>
            )}
          </section>
        </div>

        <footer className={styles.footer}>
          By submitting, you agree that our team may contact you about this enquiry.
          <br />© {new Date().getFullYear()} Northstar. Demo lead form.
        </footer>
      </div>
    </main>
  );
}