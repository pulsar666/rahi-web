/**
 * The Instagram mark, drawn in the site's own palette.
 *
 * Deliberately NOT the brand's magenta→orange gradient: the design system
 * allows lime + neutrals only (the tier metals are the single exception, and
 * only inside the rank graphic). The glyph is recognised by its silhouette —
 * rounded square, ring, corner dot — so `currentColor` lets every placement
 * inherit its own tone (lime on the community card, ink in the footer) and
 * still read as Instagram at 14px.
 *
 * Stroke-drawn rather than filled so the weight matches the site's other
 * hairline SVGs (relay arrows, scroll cue) instead of sitting as a heavy blob.
 */
export function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}
