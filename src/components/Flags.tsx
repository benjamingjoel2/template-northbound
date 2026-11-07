import config from "@config";

export function PlaceholderFlag({ label = "Placeholder", tone = "light" }: { label?: string; tone?: "light" | "dark" }) {
  return (
    <span className={`flag ${tone === "dark" ? "bg-white/10 text-white/80" : "bg-ink/[0.06] text-ink/70"}`}>{label}</span>
  );
}

/** Amber "Verify before launch" marker. Hidden when launchPad.showVerifyFlags is false. */
export function VerifyFlag({ note, tone = "light" }: { note?: string; tone?: "light" | "dark" }) {
  if (!config.launchPad.showVerifyFlags) return null;
  return (
    <span
      className={`flag ${tone === "dark" ? "bg-amber-300/15 text-amber-200" : "bg-amber-100 text-amber-900"}`}
      title={note}
    >
      <span aria-hidden>◆</span> Verify before launch
      {note ? <span className="sr-only">: {note}</span> : null}
    </span>
  );
}
