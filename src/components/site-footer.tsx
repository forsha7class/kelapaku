import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-ink-2">
      <div className="shell grid gap-10 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl">
            {site.name}
          </p>
          <p className="mt-3 max-w-[34ch] text-bone-2">{site.tagline.id}</p>
        </div>

        <nav aria-label="Navigasi footer">
          <ul className="grid gap-3 text-sm text-mute">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-bone"
                >
                  {item.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 py-6 text-xs text-mute-2">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Kelapa dari masyarakat, diolah jadi nilai.</p>
      </div>
    </footer>
  );
}
