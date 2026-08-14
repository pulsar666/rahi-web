/**
 * The mission scene: one road, two moments in time.
 *
 * A driver ahead of you hit the rough patch; Rahi marked it; the driver
 * behind gets a chime before reaching it. The scene deliberately shows BOTH
 * cars on the same road — the whole point of the hazard layer is that two
 * strangers who will never meet are now looking out for each other.
 *
 * Perf: glow is stacked translucent strokes (never feGaussianBlur), the only
 * infinite animation is the pothole's expanding halo (reusing the existing
 * pinHalo keyframes), and everything else draws once when the section enters
 * the viewport (`.vDraw` / `.vDot` / `.vFade`, gated by data-inview).
 */

const ROAD = "M-24,168 C 150,168 224,118 384,118 C 544,118 610,162 784,162";

/** Simple top-view car glyph, pointing +x. Colour via currentColor.
 *  The positioning transform lives on an OUTER group: the entrance animation
 *  animates `transform` via CSS, which would otherwise override the SVG
 *  transform attribute and collapse the car onto the origin. */
function Car({
  x,
  y,
  angle,
  delay,
}: {
  x: number;
  y: number;
  angle: number;
  delay: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <g className="vDot" style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <rect
          x={-17}
          y={-9}
          width={34}
          height={18}
          rx={6}
          fill="currentColor"
        />
        {/* Cabin glass, punched out in the page background colour */}
        <rect x={-7} y={-6.5} width={9} height={13} rx={2.5} fill="var(--bg)" opacity={0.85} />
        <rect x={-14} y={-5.5} width={4} height={11} rx={1.6} fill="var(--bg)" opacity={0.6} />
      </g>
    </g>
  );
}

export function HazardRelay({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 760 236"
      fill="none"
      role="img"
      aria-label="One car hits a pothole and Rahi marks the spot; a car following later on the same road receives a warning chime before reaching it."
    >
      {/* Road bed */}
      <path
        d={ROAD}
        stroke="var(--surface-elevated)"
        strokeWidth={44}
        strokeLinecap="round"
        className="vFade"
        style={{ "--d": "0ms" } as React.CSSProperties}
      />
      {/* Centre dashes */}
      <path
        d={ROAD}
        stroke="var(--text-tertiary)"
        strokeWidth={1.3}
        strokeDasharray="10 14"
        opacity={0.35}
        className="vFade"
        style={{ "--d": "150ms" } as React.CSSProperties}
      />

      {/* The recorded trace — same stacked-stroke glow as the hero route */}
      <path
        d={ROAD}
        stroke="var(--accent)"
        strokeWidth={12}
        strokeLinecap="round"
        opacity={0.07}
        pathLength={1}
        className="vDraw"
        style={{ "--d": "250ms" } as React.CSSProperties}
      />
      <path
        d={ROAD}
        stroke="var(--accent)"
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.14}
        pathLength={1}
        className="vDraw"
        style={{ "--d": "250ms" } as React.CSSProperties}
      />
      <path
        d={ROAD}
        stroke="var(--accent)"
        strokeWidth={2.2}
        strokeLinecap="round"
        pathLength={1}
        className="vDraw"
        style={{ "--d": "250ms" } as React.CSSProperties}
      />

      {/* ---- The rough patch, marked and remembered -------------------- */}
      {/* Expanding halo — the one infinite animation in this scene */}
      <circle
        cx={384}
        cy={118}
        r={7}
        fill="none"
        stroke="var(--improve)"
        strokeWidth={1.5}
        className="vHalo"
        style={{ "--d": "1500ms" } as React.CSSProperties}
      />
      <circle
        cx={384}
        cy={118}
        r={5.5}
        fill="var(--improve)"
        className="vDot"
        style={{ "--d": "1400ms" } as React.CSSProperties}
      />
      {/* Hazard pin above the spot */}
      <g className="vDot" style={{ "--d": "1600ms" } as React.CSSProperties}>
        <line
          x1={384}
          y1={104}
          x2={384}
          y2={88}
          stroke="var(--improve)"
          strokeWidth={1.4}
          opacity={0.6}
        />
        <path
          d="M384,54 L399,82 L369,82 Z"
          fill="var(--surface)"
          stroke="var(--improve)"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        <text
          x={384}
          y={78}
          textAnchor="middle"
          fill="var(--improve)"
          fontSize={15}
          fontWeight={700}
        >
          !
        </text>
      </g>

      {/* ---- You, today: just past the pothole, already through it ------ */}
      <g color="var(--text-primary)">
        <Car x={512} y={130} angle={10} delay={1100} />
      </g>
      <text
        x={512}
        y={166}
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize={13}
        className="vFade"
        style={{ "--d": "1800ms" } as React.CSSProperties}
      >
        you, today
      </text>

      {/* ---- Someone, tomorrow: behind on the same road, warned in time - */}
      <g color="var(--text-primary)">
        <Car x={128} y={166} angle={-8} delay={2000} />
      </g>
      {/* Chime arcs ahead of the following car */}
      <path
        d="M 158,152 a 15,15 0 0 1 4,25"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={1}
        className="vDraw"
        style={{ "--d": "2400ms" } as React.CSSProperties}
      />
      <path
        d="M 166,145 a 23,23 0 0 1 6,38"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.55}
        pathLength={1}
        className="vDraw"
        style={{ "--d": "2550ms" } as React.CSSProperties}
      />
      <text
        x={128}
        y={202}
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize={13}
        className="vFade"
        style={{ "--d": "2700ms" } as React.CSSProperties}
      >
        someone, tomorrow
      </text>
    </svg>
  );
}
