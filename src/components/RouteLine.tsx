/**
 * The glowing route line — the single strongest motif in the reference
 * boards: a lime path that traces through the scene, dashed centre-line, with
 * pulsing waypoint pins.
 *
 * Drawn as SVG so it scales and can be stroke-dash animated (the line "draws
 * itself" on load, which is the whole point — a static line is just a
 * squiggle; a drawing line reads as a journey being recorded).
 *
 * The glow is a real Gaussian blur behind the crisp stroke rather than a CSS
 * drop-shadow, so it survives on the SVG's own coordinate system at any size.
 */

const PATH =
  "M0,150 C 120,150 160,60 280,60 C 400,60 430,190 560,190 C 690,190 720,90 840,90 C 940,90 980,130 1100,130";

/** Waypoints sit ON the path; coordinates are eyeballed to the curve above. */
const PINS = [
  { x: 280, y: 60 },
  { x: 560, y: 190 },
  { x: 840, y: 90 },
];

export function RouteLine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1100 240"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Glow is faked with two progressively wider, more transparent strokes
          rather than an feGaussianBlur. A real blur filter forces the whole
          SVG through an offscreen raster pass EVERY frame while the line is
          animating — on a budget phone that alone drops the hero to ~20fps.
          Stacked strokes cost nothing and are visually indistinguishable at
          this size. */}
      <path
        d={PATH}
        stroke="var(--accent)"
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.08}
        pathLength={1}
        className="routeDraw"
      />
      <path
        d={PATH}
        stroke="var(--accent)"
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.16}
        pathLength={1}
        className="routeDraw"
      />

      {/* Crisp line */}
      <path
        d={PATH}
        stroke="var(--accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        pathLength={1}
        className="routeDraw"
      />

      {/* Dashed centre-line, offset-animated so the road reads as moving. */}
      <path
        d={PATH}
        stroke="var(--bg)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray="7 11"
        opacity={0.85}
        className="routeDash"
      />

      {PINS.map((pin, i) => (
        <g key={`${pin.x}-${pin.y}`}>
          {/* Expanding halo */}
          <circle
            cx={pin.x}
            cy={pin.y}
            r={6}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.5}
            className="routePinHalo"
            style={{ animationDelay: `${1.6 + i * 0.45}s` }}
          />
          <circle
            cx={pin.x}
            cy={pin.y}
            r={5}
            fill="var(--accent)"
            className="routePin"
            style={{ animationDelay: `${1.5 + i * 0.45}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
