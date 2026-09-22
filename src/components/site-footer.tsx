import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="shell grid gap-10 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl">
            {site.name}
          </p>
          <p className="mt-3 max-w-[34ch] text-ink-2">{site.tagline.id}</p>
        </div>

        <nav aria-label="Navigasi footer" className="-mx-3">
          <ul className="grid gap-3 text-sm text-mute">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[36px] min-w-[44px] items-center px-3 transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm text-mute">
          <p className="eyebrow">Kontak</p>
          <ul className="mt-3 grid gap-3">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-[36px] min-w-[44px] items-center transition-colors hover:text-ink"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${site.contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] min-w-[44px] items-center transition-colors hover:text-ink"
              >
                @{site.contact.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-xs text-mute">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Kelapa dari masyarakat, diolah jadi nilai.</p>
      </div>
    </footer>
  );
}
