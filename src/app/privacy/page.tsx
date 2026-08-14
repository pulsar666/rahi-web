import type { Metadata } from "next";
import styles from "./privacy.module.css";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data Rahi collects, what stays on your phone, what goes to our servers, and the choices you have.",
};

/**
 * Deliberately plain and JS-light: this is the page Play reviewers and
 * regulators open, and it must render instantly and completely without
 * waiting on any animation or bundle. Do not add motion here.
 *
 * SOURCE OF TRUTH: backend/legal/privacy-policy.md in the driving-recorder
 * repo. Edit there first, then mirror here — a policy that disagrees with
 * itself across two URLs is worse than one that is merely out of date.
 *
 * NOTE: the live Play Console listing still points at the old
 * pulsar666.github.io/rahi-privacy URL. Do not switch the console field
 * while production access is under review.
 */
export default function Privacy() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <a className={styles.back} href="/" aria-label="Back to Rahi home">
          <span aria-hidden="true">←</span>
          <Wordmark height={20} />
        </a>
      </header>

      <main className={styles.doc}>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Placeholder — full policy to follow.</p>

        <p>
          Rahi is a driving companion app that turns your phone&apos;s motion
          and location sensors into a personal driving score and coaching.
        </p>
        <p>
          The complete privacy policy currently lives at{" "}
          <a
            className={styles.link}
            href="https://pulsar666.github.io/rahi-privacy/"
          >
            pulsar666.github.io/rahi-privacy
          </a>
          . It will be published here once this site goes live.
        </p>

        <h2>Contact</h2>
        <p>
          For any privacy question or request, contact{" "}
          <a className={styles.link} href="mailto:rahaanirban91@gmail.com">
            rahaanirban91@gmail.com
          </a>
          .
        </p>
      </main>
    </div>
  );
}
