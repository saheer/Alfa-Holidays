// Decorative accents shared by the Services sections (all aria-hidden)

const PLANE =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";

// Dashed flight path ending in a small plane
export function FlightPath({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 260 150"
      fill="none"
      className={`pointer-events-none text-brand-cyan ${className}`}
    >
      <path
        d="M4 98C34 92 62 100 74 118c10 16-4 28-20 22-15-6-8-26 10-40C96 76 150 44 208 32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      <g transform="translate(206 4) scale(2.2) rotate(8 12 12)" fill="currentColor">
        <path d={PLANE} />
      </g>
    </svg>
  );
}

// Soft rounded blobs used in the section corners
export function Blob({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-[45%_55%_60%_40%] bg-brand-cyan/10 ${className}`}
    />
  );
}

// Soft layered waves along the bottom edge of a section (fills the full width, never stretches
// the layout: it is absolutely positioned and clipped by the section's overflow-hidden).
export function BottomWave({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 w-full text-brand-cyan ${className}`}
    >
      <path
        d="M0 120C160 70 300 70 470 108c170 38 300 70 480 40 160-27 300-80 490-58v130H0z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M0 160c140-34 280-30 440 0 170 32 320 36 500 6 170-28 330-42 500-6v60H0z"
        fill="currentColor"
        fillOpacity="0.12"
      />
    </svg>
  );
}

// Small plane at the end of a dashed curve (sits near the bottom-right of a section)
export function PlaneTrail({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 80"
      fill="none"
      className={`pointer-events-none text-brand-cyan ${className}`}
    >
      <path
        d="M2 66C40 40 82 76 126 56c40-18 62-28 110-30"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      <g transform="translate(236 4) scale(1.7) rotate(8 12 12)" fill="currentColor">
        <path d={PLANE} />
      </g>
    </svg>
  );
}
