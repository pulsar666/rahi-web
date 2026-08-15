import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data Rahi collects, what stays on your phone, what goes to our servers, and the choices you have.",
};

const sections = [
  ["video", "Your video"],
  ["data", "Data we collect"],
  ["permissions", "Permissions"],
  ["storage", "Data storage"],
  ["retention", "Retention"],
  ["use", "How we use data"],
  ["rights", "Your rights"],
  ["security", "Security"],
  ["children", "Children"],
  ["changes", "Policy changes"],
  ["contact", "Contact"],
] as const;

/**
 * Deliberately plain and JS-light: Play reviewers and regulators must be able
 * to read the complete policy immediately. Do not add animation here.
 *
 * SOURCE OF TRUTH: backend/legal/privacy-policy.md in driving-recorder.
 * Edit there first, then mirror the wording here.
 */
export default function Privacy() {
  return (
    <div className={styles.page}>
      <SiteHeader current="privacy" />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Your data, explained plainly</p>
          <h1><span>Privacy</span> <span>Policy</span></h1>
          <p className={styles.updated}>Last updated: 15 August 2026</p>
          <p className={styles.intro}>
            Rahi turns your phone&apos;s motion and location sensors into a
            personal driving score and coaching. This policy explains what
            stays on your phone, what goes to our servers, and the choices and
            rights you have.
          </p>
        </div>
      </header>

      <main className={styles.layout}>
        <aside className={styles.aside} aria-label="Privacy policy contents">
          <div className={styles.asideInner}>
            <p>On this page</p>
            <ol>
              {sections.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className={styles.policy}>
          <section id="video" className={styles.leadSection}>
            <p className={styles.sectionNumber}>01</p>
            <h2>The one thing to know first: your video never leaves your phone.</h2>
            <p>
              If you use Rahi&apos;s recording feature, any <strong>video is
              stored only on your device</strong>. Video is never uploaded to
              our servers, never sent to any third party, and never seen by us.
              You can delete the video for any trip at any time while keeping,
              or also deleting, the trip&apos;s score.
            </p>
            <p>
              What we process in the cloud is the motion and location sensor
              data from your drive — not images of the road, faces, or number
              plates.
            </p>
          </section>

          <section id="data">
            <p className={styles.sectionNumber}>02</p>
            <h2>What data we collect</h2>

            <h3>Data processed on our servers</h3>
            <p>When you record a trip and it uploads, we process:</p>
            <ul>
              <li><strong>Location data</strong> — GPS latitude, longitude, and speed during the trip.</li>
              <li><strong>Motion sensor data</strong> — accelerometer, gyroscope, and, if available, barometric-altitude readings with timestamps.</li>
              <li><strong>Trip metadata</strong> — start time, duration, distance, and the vehicle selected for the trip.</li>
              <li><strong>Derived results</strong> — your driving score, detected driving events, road segments, and coaching text computed from the above.</li>
              <li>
                <strong>Crash reports, if enabled</strong> — Rahi&apos;s internal
                user ID, a random fault ID, fault type and time, an optional
                trip ID and short diagnostic detail, exception type and
                message, a short technical stack trace, app version and build,
                and device model and Android version. They do not contain GPS
                coordinates, your route, sensor readings, video, email, or
                password. You can turn crash reports off in Settings → Privacy.
              </li>
              <li>
                <strong>Anonymous usage statistics</strong> — aggregate screen
                and feature events used to understand what parts of Rahi people
                use. Each event has a random, one-way anonymous install
                identifier, never your account, email, location, or trip content.
              </li>
            </ul>

            <h3>Data stored only on your device</h3>
            <ul>
              <li><strong>Video, if recorded</strong> — local only, as described above.</li>
            </ul>

            <h3>Account data</h3>
            <p>
              Rahi works anonymously by default. If you choose to back up your
              account, you provide an email address and password so you can
              recover trips after reinstalling or switching phones. Providing
              an email is optional.
            </p>

            <h3>What we do not collect</h3>
            <p>
              We do not use third-party analytics, advertising, or
              crash-tracking SDKs. We do not collect contacts, photos,
              microphone audio, or data unrelated to driving. Rahi does not
              request microphone access, and local trip video is recorded
              without audio.
            </p>
          </section>

          <section id="permissions">
            <p className={styles.sectionNumber}>03</p>
            <h2>Permissions and why we ask</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Permission</th><th>Why Rahi needs it</th></tr></thead>
                <tbody>
                  <tr><td>Precise location</td><td>To record your route and speed, the core of trip scoring.</td></tr>
                  <tr><td>High sampling-rate sensors</td><td>To read accelerometer and gyroscope frequently enough to detect braking, cornering, and acceleration. This is not health or physical-activity data.</td></tr>
                  <tr><td>Camera</td><td>Only if you choose to record trip video, which stays on your phone.</td></tr>
                  <tr><td>Notifications</td><td>To show recording status and trip-ready alerts.</td></tr>
                  <tr><td>Foreground service / keep awake</td><td>To keep recording reliably while your screen is off.</td></tr>
                  <tr><td>Network access</td><td>To upload sensor data and fetch scores and coaching.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Rahi does not request microphone or physical-activity permission.
              You can revoke any granted permission in Android Settings.
              Revoking location or sensor access will stop trip recording.
            </p>
          </section>

          <section id="storage">
            <p className={styles.sectionNumber}>04</p>
            <h2>Where your data is stored</h2>
            <p>
              Cloud sensor data and derived results are stored with Supabase in
              Mumbai, India (ap-south-1). Our trip-processing service runs on a
              server hosted in India.
            </p>
            <p>
              A copy of raw sensor data is kept in encrypted Cloudflare R2
              object storage so we can improve and re-run scoring and coaching.
              It is deleted when you delete the trip or your account.
            </p>
            <p>
              To generate coaching text, we send an anonymised numeric trip
              summary — scores, event counts, and road types, but no raw GPS
              trace or personal identifiers — to a large-language-model provider.
            </p>
          </section>

          <section id="retention">
            <p className={styles.sectionNumber}>05</p>
            <h2>How long we keep data</h2>
            <ul>
              <li><strong>Raw sensor uploads</strong> are deleted from the processing service within 24 hours.</li>
              <li><strong>Raw sensor archives</strong> are retained in encrypted storage until you delete the trip or your account.</li>
              <li><strong>Processed trip data</strong>, including scores, events, and coaching, remains until you delete the trip or your account.</li>
              <li><strong>Local video</strong> remains until you delete it or uninstall the app.</li>
            </ul>
            <p>You can delete an individual trip, or your entire account and its data, from within Rahi at any time.</p>
          </section>

          <section id="use">
            <p className={styles.sectionNumber}>06</p>
            <h2>How we use your data</h2>
            <p>We use your data only to:</p>
            <ol>
              <li>Compute and show your driving score, trip timeline, and coaching.</li>
              <li>Let you review your driving history and trends.</li>
              <li>Maintain and improve scoring and detection accuracy.</li>
            </ol>
            <p>
              We do not sell your personal data or share individual,
              identifiable driving data with insurers, advertisers, or any
              third party.
            </p>
            <p>
              If Rahi later offers a feature built on aggregated, anonymised
              road data, such data will be statistically combined across many
              drivers so an individual trip or person cannot be identified.
              We will describe the feature before it applies.
            </p>
          </section>

          <section id="rights">
            <p className={styles.sectionNumber}>07</p>
            <h2>Your rights</h2>
            <p>
              Depending on your jurisdiction, including under India&apos;s
              Digital Personal Data Protection Act, 2023, you may have the
              right to:
            </p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you.</li>
              <li><strong>Correct</strong> inaccurate data.</li>
              <li><strong>Delete</strong> data using in-app trip or account deletion, or by contacting us.</li>
              <li><strong>Withdraw consent</strong> by deleting your account and uninstalling Rahi.</li>
            </ul>
            <p>For a request you cannot complete in the app, contact us below.</p>
          </section>

          <section id="security">
            <p className={styles.sectionNumber}>08</p>
            <h2>Security</h2>
            <p>
              We use encrypted connections (HTTPS/TLS) in transit and
              provider-managed encryption at rest. Per-user access controls
              restrict one user from reading another user&apos;s trips. No system
              is perfectly secure, but we take measures appropriate to the
              sensitivity of the data.
            </p>
          </section>

          <section id="children">
            <p className={styles.sectionNumber}>09</p>
            <h2>Children</h2>
            <p>
              Rahi is intended for licensed drivers and is not directed at
              children under 18. We do not knowingly collect data from anyone
              under 18. If you believe a minor has used the app, contact us and
              we will delete the associated data.
            </p>
          </section>

          <section id="changes">
            <p className={styles.sectionNumber}>10</p>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as Rahi evolves. Material changes will
              be reflected by the “Last updated” date above, and significant
              changes will be communicated in-app before they take effect.
            </p>
          </section>

          <section id="contact" className={styles.contact}>
            <p className={styles.sectionNumber}>11</p>
            <h2>Questions about your privacy?</h2>
            <p>For a privacy request, or to reach our grievance officer:</p>
            <a href="mailto:rahaanirban91@gmail.com">rahaanirban91@gmail.com <span aria-hidden="true">↗</span></a>
            <p className={styles.responseNote}>
              We aim to respond within a reasonable time and within timelines
              required by applicable law.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
