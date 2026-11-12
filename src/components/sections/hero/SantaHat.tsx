/**
 * A classic Santa hat, drawn inline so it stays crisp at every portrait size
 * and costs no extra request. The brim is the bottom edge: the portrait places
 * it across the crown, with the cone rising above the circular crop.
 */
export function SantaHat({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 200 172"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Cone, tapering to the tip beneath the pom. */}
      <path
        d="M18 140 C26 102 48 62 88 40 C100 34 110 32 118 34 C140 70 164 104 182 140 Z"
        fill="#c92f2f"
      />
      {/* Shaded left side, so the cone reads as rounded rather than flat. */}
      <path
        d="M18 140 C26 102 48 62 88 40 C94 36 100 34 106 33 C82 54 56 96 46 140 Z"
        fill="#a51c1c"
        opacity="0.35"
      />
      {/* A fold catching the light. */}
      <path
        d="M62 122 C78 90 94 66 112 50"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.16"
      />
      {/* Pom-pom: an offset shadow under a white disc, capping the tip. */}
      <circle cx="120" cy="36" r="24" fill="#e3edf4" />
      <circle cx="117" cy="33" r="22" fill="#ffffff" />
      {/* Fur brim, with a soft shadow along the lower edge. */}
      <rect x="4" y="128" width="192" height="40" rx="20" fill="#ffffff" />
      <rect
        x="16"
        y="156"
        width="168"
        height="6"
        rx="3"
        fill="#dfe9f1"
        opacity="0.7"
      />
    </svg>
  );
}
