/**
 * External destinations, in one place.
 *
 * The Play listing went to OPEN TESTING on 2026-08-20, so the store page is
 * public: anyone with the link can install without being an approved tester.
 * Every "early access" CTA used to be a mailto: asking to be added to the
 * closed-test list — that ask is now obsolete, and leaving it would send
 * people to email for something they can just download.
 *
 * NOTE ON AVAILABILITY: the app is published to **India only**, deliberately
 * (scoring is calibrated on Indian roads — see driving-recorder/CLAUDE.md).
 * Outside India this link resolves to a "not available in your country" page.
 * That is expected, not a broken link.
 */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.pulsar.rahi";

/** Support + privacy mailboxes (GoDaddy Titan on the .com). */
export const SUPPORT_EMAIL = "support@drivewithrahi.com";
export const PRIVACY_EMAIL = "privacy@drivewithrahi.com";
