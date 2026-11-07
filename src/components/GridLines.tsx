/** The faint 4/12-column guide lines that run behind most sections. */
export function GridLines({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const line = tone === "dark" ? "bg-ink/[0.07]" : "bg-white/[0.07]";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <div className="mx-auto grid h-full grid-cols-4 gap-5 px-5 md:grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`relative h-full ${i >= 4 ? "hidden md:block" : ""}`}>
            <span className={`absolute inset-y-0 left-0 w-px ${line}`} />
            {i === 11 || i === 3 ? (
              <span className={`absolute inset-y-0 right-0 w-px ${line} ${i === 3 ? "md:hidden" : ""}`} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
