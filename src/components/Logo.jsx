// Typographic wordmark. Swap for the club's logo file once it is available.
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="-skew-x-10 text-[1.9em] font-black tracking-[-0.03em] [font-stretch:92%]">
        <span className="text-white">MEGA</span>
        <span className="text-jaune">GYM</span>
      </span>
      <span className="mt-[0.3em] flex items-center gap-[0.6em] text-[0.56em] font-semibold tracking-[0.42em] text-white [font-stretch:112%]">
        <span className="h-px flex-1 bg-jaune" />
        <span className="-mr-[0.42em]">FITNESS</span>
        <span className="h-px flex-1 bg-jaune" />
      </span>
    </span>
  );
}
