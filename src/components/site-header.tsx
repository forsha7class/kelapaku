import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-ink/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            {site.name}
          </span>
          <span className="hidden text-[0.6875rem] uppercase tracking-[0.18em] text-mute sm:inline">
            {site.tagline.en}
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-sm text-bone-2 transition-colors hover:text-bone"
                >
                  {item.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#story" className="bg-bone px-5 py-2 text-sm font-medium text-ink">
          Explore
        </a>
      </div>

      {/* Mobile: baris kedua, tidak disembunyikan di balik hover/JS. */}
      <nav aria-label="Navigasi bagian" className="md:hidden">
        <ul className="shell flex gap-1 overflow-x-auto text-sm text-mute">
          {nav.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-bone"
              >
                {item.en}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
