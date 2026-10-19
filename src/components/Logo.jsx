// The club's three-bar mark, redrawn from its published logo. Swap for the
// club's own SVG file once it is available.
export function Mark({ className = '' }) {
  return (
    <svg viewBox="0 0 84 64" aria-hidden="true" focusable="false" fill="currentColor" className={className}>
      <path d="M9.25 27h18L18 64H0zM46 0h37l-10 13H60.75L48 64H30zM60.25 27h18L69 64H51z" />
    </svg>
  );
}

// Mark plus the lowercase wordmark, set in yellow and white like the club's signage.
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-[0.5em] font-logo leading-none text-white ${className}`}>
      <Mark className="h-[2.3em] w-auto shrink-0 text-jaune" />
      <span className="flex flex-col">
        <span className="text-[1em] font-bold tracking-[-0.02em]">mega gym</span>
        <span className="mt-[0.12em] text-[1.62em] font-extrabold tracking-[-0.02em]">fitness</span>
      </span>
    </span>
  );
}
