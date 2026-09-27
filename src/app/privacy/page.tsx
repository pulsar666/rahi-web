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
  ["auto", "Automatic pause and restart"],
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
 * SOURCE OF TRUTH: this page. (backend/legal/privacy-policy.md in
 * driving-recorder is an older snapshot, dated 23 June 2026 — do not edit
 * it first; refresh it from this page when convenient.)
 */
export default function Privacy() {
  return (
    <div className={styles.page}>
      <SiteHeader current="privacy" />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Your data, explained plainly</p>
          <h1><span>Privacy</span> <span>Policy</span></h1>
          <p className={styles.updated}>Last updated: 27 September 2026</p>
          <p className={styles.intro}>
            Rahi turns your phone&apos;s motion and location sensors into a
            personal driving score and coaching, on Android and iPhone. This
            policy explains what
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
              <li>
                <strong>Location data</strong> — GPS latitude, longitude, and
                speed during the trip. A trip&apos;s data can include the few
                minutes after you stop — for example, walking away from the
                car — which we do not use for scoring.
              </li>
              <li>
                <strong>Motion and device sensor data</strong> —
                accelerometer, gyroscope, magnetometer (compass), ambient light
                (Android), and, if available, barometer readings with
                timestamps, and how the phone is mounted in the car.
              </li>
              <li>
                <strong>Device status during recording</strong> — phone
                temperature state, battery level and charging state, and the
                app&apos;s processor use, recorded every 30 seconds so we can
                find and fix recording problems.
              </li>
              <li>
                <strong>Trip metadata</strong> — start time, duration,
                distance, your phone model, operating-system and app version,
                and the vehicle selected for the trip: type, make, model, year,
                fuel, transmission, and any nickname or licence-plate number
                you choose to enter in your garage.
              </li>
              <li><strong>Derived results</strong> — your driving score, detected driving events, road segments, and coaching text computed from the above.</li>
              <li>
                <strong>Crash reports, if enabled</strong> — Rahi&apos;s internal
                user ID, a random fault ID, fault type and time, an optional
                trip ID and short diagnostic detail, exception type and
                message, a short technical stack trace, app version and build,
                and device model and Android or iOS version. They do not contain
                GPS coordinates, your route, sensor readings, video, email, or
                password. Crash reports are on by default (off until you opt in
                if you are in the EU, EEA, or UK); you can turn them off in
                Settings → Privacy.
              </li>
              <li>
                <strong>Anonymous usage statistics</strong> — aggregate screen
                and feature events used to understand what parts of Rahi people
                use. Each event has a random, one-way anonymous install
                identifier, never your account, email, location, or trip content.
              </li>
              <li>
                <strong>Coaching feedback</strong> — if you rate a coaching
                moment or leave a comment, we store it with your account to
                improve coaching.
              </li>
              <li>
                <strong>Leaderboard name</strong> — the name you choose to
                appear under on the leaderboard, if you set one.
              </li>
            </ul>

            <h3>Data stored only on your device</h3>
            <ul>
              <li><strong>Video, if recorded</strong> — local only, as described above.</li>
            </ul>

            <h3>Account data</h3>
            <p>
              Rahi works anonymously by default. If you choose to back up your
              account so you can recover trips after reinstalling or switching
              phones, you can sign in with Google, with Apple (on iPhone), or
              with an email address and password. With Google or Apple we
              receive your email address (with Apple, this can be a private
              relay address) and your name if you share it; with Google, also
              a link to your profile picture. We never receive your Google or
              Apple password. Signing in is optional.
            </p>

            <h3>What we do not collect</h3>
            <p>
              We do not use third-party analytics, advertising, or
              crash-tracking SDKs, and Rahi does not track you across other
              apps or use an advertising identifier. We do not collect contacts, photos,
              microphone audio, or data unrelated to driving. Rahi does not
              request microphone access, and local trip video is recorded
              without audio.
            </p>
          </section>

          <section id="auto">
            <p className={styles.sectionNumber}>03</p>
            <h2>Automatic pause, split, and restart</h2>
            <p>
              Rahi uses your phone&apos;s motion sensors to tell driving apart
              from standing still or walking, so a recording follows your
              drive. This is worked out on your phone; it is not stored as a
              separate activity record.
            </p>
            <ul>
              <li>
                <strong>Camera pause</strong> — when you have been stopped for
                about 2 minutes, Rahi switches the camera off, and switches it
                back on when you drive again.
              </li>
              <li>
                <strong>Split and restart</strong> — after a long stop (about
                30 minutes) Rahi ends the trip and pauses; on Android, walking
                away from the car does the same. If Rahi then senses driving
                again within 6 hours, it starts a new trip automatically with
                the same settings, including video if video is on. A
                notification (on iPhone, a Live Activity) stays visible the
                whole time; tap Stop to end recording completely.
              </li>
              <li>
                <strong>iPhone: auto-stop (optional)</strong> — if you turn on
                &ldquo;Auto-stop when you walk away&rdquo;, Rahi uses Apple&apos;s
                on-device motion-activity detection to notice that you are
                walking, and ends recording completely. On iPhone, video also
                pauses whenever the app is closed or the phone is locked.
              </li>
            </ul>
          </section>

          <section id="permissions">
            <p className={styles.sectionNumber}>04</p>
            <h2>Permissions and why we ask</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Permission</th><th>Why Rahi needs it</th></tr></thead>
                <tbody>
                  <tr><td>Precise location</td><td>To record your route and speed, the core of trip scoring.</td></tr>
                  <tr><td>High sampling-rate sensors</td><td>To read accelerometer and gyroscope frequently enough to detect braking, cornering, and acceleration. This is not health or physical-activity data.</td></tr>
                  <tr><td>Camera</td><td>Only if you choose to record trip video, which stays on your phone.</td></tr>
                  <tr><td>Notifications</td><td>To show recording status and trip-ready alerts.</td></tr>
                  <tr><td>Foreground service / keep awake</td><td>To keep recording reliably while your screen is off, and to finish uploading a trip in the background.</td></tr>
                  <tr><td>Network access</td><td>To upload sensor data and fetch scores and coaching.</td></tr>
                  <tr><td>Ignore battery optimisations (optional)</td><td>Only if you grant it: stops Android from suspending a recording mid-drive on phones with aggressive power management. Recording works without it, but may be interrupted.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The table above is for Android. On Android, Rahi does not request
              the physical-activity permission. On iPhone, Rahi asks for:
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>iPhone permission</th><th>Why Rahi needs it</th></tr></thead>
                <tbody>
                  <tr><td>Location (while using the app, precise)</td><td>To record your route and speed during a drive you start, including while the screen is off during that drive.</td></tr>
                  <tr><td>Motion &amp; Fitness</td><td>To read the barometer and motion sensors used for scoring, and — only if you turn on auto-stop — to notice when you start walking. This is never used as health or fitness data.</td></tr>
                  <tr><td>Camera</td><td>Only if you choose to record trip video, which stays on your phone.</td></tr>
                  <tr><td>Notifications</td><td>To show recording status and trip-ready alerts.</td></tr>
                  <tr><td>Add to Photos</td><td>Only when you choose to save a reel or share card to your Photos.</td></tr>
                  <tr><td>Background audio</td><td>To play road-hazard warnings while another app is on screen.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Rahi never requests microphone access. You can revoke any granted
              permission in Android Settings or in iOS Settings → Rahi.
              Revoking location or sensor access will stop trip recording.
            </p>
          </section>

          <section id="storage">
            <p className={styles.sectionNumber}>05</p>
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
              <strong>AI coaching.</strong> Your written coaching is produced
              by OpenAI&apos;s AI, whose servers are in the United States. We
              send it a summary of the trip: your scores and the moments we
              detected, road and place names along the route, time of day and
              weather, your vehicle&apos;s nickname, and how often you have
              driven that route before. It never receives your name, email,
              account ID, raw GPS trace, or video. On iPhone, Rahi asks your
              permission before the first upload, and you can turn it off at
              any time in Settings → Privacy (&ldquo;Cloud scoring &amp; AI
              coaching&rdquo;); trips then stay on your phone.
            </p>
            <p>We also rely on these service providers:</p>
            <ul>
              <li><strong>Open-Meteo</strong> — receives the approximate trip location and time, to look up the weather during your drive.</li>
              <li><strong>OpenFreeMap</strong> — serves the map tiles for the area you view in the app.</li>
              <li><strong>Your phone&apos;s geocoder</strong> (Google on Android, Apple on iPhone) — turns a few points of your route into place names, such as where a trip started and ended.</li>
              <li><strong>Google and Apple sign-in</strong> — only if you choose to sign in with them.</li>
            </ul>
            <p>
              Some of these providers process data outside India. We share with
              them only what each needs to do its job.
            </p>
          </section>

          <section id="retention">
            <p className={styles.sectionNumber}>06</p>
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
            <p className={styles.sectionNumber}>07</p>
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
              Rahi includes a <strong>shared road-hazard map</strong>. When your
              trip detects a rough patch or pothole, that location contributes
              to an aggregate hazard layer that warns other drivers approaching
              the same stretch. This layer is statistically combined across many
              drivers: the shared layer other drivers see contains only the
              location, a severity tier, and how many distinct drivers
              confirmed it — never who, and never your route. Privately, we
              record which trip contributed each hazard; deleting a trip or
              your account erases that link. The anonymous road statistic
              itself stays, because a pothole is a fact about the road, and
              hazards fade over time as roads are repaired.
            </p>
            <p>
              Rahi also has a <strong>leaderboard</strong>. Other Rahi users can
              see a ranked list showing each driver&apos;s rank, score, total
              distance, trip count, and hazards contributed. You appear under
              a random code such as &ldquo;driver_3f2a&rdquo; unless you choose a
              leaderboard name. Your email, account ID, routes, and locations
              are never shown.
            </p>
            <p>
              If Rahi later offers further features built on aggregated,
              anonymised road data, they will follow the same principle and be
              described to you before they apply.
            </p>
          </section>

          <section id="rights">
            <p className={styles.sectionNumber}>08</p>
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
              <li><strong>Withdraw consent</strong> by turning off uploads in Settings → Privacy (iPhone, and Android in the EU, EEA, or UK), or by deleting your account and uninstalling Rahi.</li>
            </ul>
            <h3>Deleting your account</h3>
            <p>
              In Rahi, open Settings and tap <strong>Delete account &amp;
              data</strong>. This permanently deletes your account, trips,
              scores, coaching, raw sensor archives, garage, and feedback, and
              erases the link between your trips and the shared hazard map
              (the anonymous road statistics stay). On iPhone it also clears
              the trips stored on the phone; on Android, delete trips in the
              app or uninstall Rahi to remove trip video from the phone. If
              you no longer have the app, email privacy@drivewithrahi.com from
              your account&apos;s email address and we will delete it for you.
            </p>
            <p>For a request you cannot complete in the app, contact us below.</p>
          </section>

          <section id="security">
            <p className={styles.sectionNumber}>09</p>
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
            <p className={styles.sectionNumber}>10</p>
            <h2>Children</h2>
            <p>
              Rahi is intended for licensed drivers and is not directed at
              children under 18. We do not knowingly collect data from anyone
              under 18. If you believe a minor has used the app, contact us and
              we will delete the associated data.
            </p>
          </section>

          <section id="changes">
            <p className={styles.sectionNumber}>11</p>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as Rahi evolves. Material changes will
              be reflected by the “Last updated” date above, and significant
              changes will be communicated in-app before they take effect.
            </p>
          </section>

          <section id="contact" className={styles.contact}>
            <p className={styles.sectionNumber}>12</p>
            <h2>Questions about your privacy?</h2>
            <p>For a privacy request, or to reach our grievance officer:</p>
            <a href="mailto:privacy@drivewithrahi.com">privacy@drivewithrahi.com <span aria-hidden="true">↗</span></a>
            <p className={styles.responseNote}>
              For general help with the app, write to{" "}
              <a href="mailto:support@drivewithrahi.com">support@drivewithrahi.com</a>.
            </p>
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
