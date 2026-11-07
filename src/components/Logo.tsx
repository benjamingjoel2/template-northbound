import config from "@config";

/**
 * The centred logo: optional mark above the wordmark (brand name in the display face).
 * Set brand.logoMark in brand.config.ts to show a mark.
 */
export function Logo({ className = "" }: { className?: string }) {
  const mark = config.brand.logoMark;
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      {mark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mark} alt="" aria-hidden className="mb-1 h-2.5 w-auto" />
      ) : null}
      <span className="text-center font-display text-[15px] font-medium uppercase tracking-[0.28em] md:whitespace-nowrap">
        {config.brand.name}
      </span>
    </span>
  );
}
