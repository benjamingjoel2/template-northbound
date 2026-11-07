import config from "@config";
import { menus } from "@/lib/menu";
import { Photo } from "./Photo";
import { LanguageSwitcher } from "./Switchers";
import { Year } from "./Year";

function Column({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div className="md:col-span-2">
      <nav aria-label={label}>
        <h2 className="t-eyebrow mb-2 text-ink">{label}</h2>
        <ul className="space-y-0.5">
          {links.map((l) => (
            <li key={l.label}>
              <a className="t-body text-muted transition-colors hover:text-ink" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Footer() {
  const { brand, contact, nav } = config;
  const year = new Date().getFullYear();
  const enquire = { label: contact.enquireLabel, href: contact.enquireHref };

  return (
    <footer className="bg-paper-deep text-ink">
      <section
        aria-labelledby="footer-cta"
        className="relative flex h-[42vh] min-h-[280px] max-h-[420px] items-end overflow-hidden text-white"
      >
        <Photo photo={contact.footerPhoto} sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent" />
        <div className="relative z-10 flex w-full flex-col items-start gap-5 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
          <h2 id="footer-cta" className="t-h3 max-w-[18ch]">
            {contact.footerHeading}
          </h2>
          <a
            className="flex h-11 items-center rounded-[2px] bg-accent px-6 text-[13px] font-medium text-white transition-colors hover:bg-ink"
            href={enquire.href}
          >
            {enquire.label}
          </a>
        </div>
      </section>

      <div className="px-5 pt-14 md:px-10">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <p className="font-display text-[15px] font-medium uppercase tracking-[0.28em]">{brand.name}</p>
            <p className="t-body mt-3 max-w-[22rem] text-muted">{brand.tagline}</p>
            <p className="mt-4">
              <a className="t-body break-all transition-colors hover:text-accent" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
            <address className="t-small mt-2 not-italic text-muted">{contact.address}</address>
          </div>
          <Column label={nav.labels.journeys} links={config.journeys.map((j) => ({ label: j.title, href: j.href }))} />
          <Column label={nav.labels.destination} links={menus.destination.groups[0].links} />
          <Column label={config.staysSection.menuLabel} links={config.stays.map((s) => ({ label: s.name, href: s.href }))} />
          <Column label={nav.labels.about} links={[...nav.about, enquire]} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/10 py-5 md:flex-row md:items-center md:justify-between">
          <p className="t-small text-muted">
            © <Year initial={year} /> {brand.name}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {nav.legal.map((l) => (
              <li key={l.label}>
                <a className="t-small text-muted hover:text-ink" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher variant="plain" current={config.seo.locale} />
        </div>
      </div>
    </footer>
  );
}
