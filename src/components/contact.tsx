import { site } from "@/lib/site";

const ICONS = {
  mail: "M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5L12 12l7.8-6H4.2Z",
  instagram:
    "M12 2.2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5-.7.2-1.2.6-1.8 1.1-.5.6-.9 1.1-1.1 1.8-.3.6-.4 1.4-.5 2.4C2 9.2 2 9.5 2 12s0 2.8.1 3.9c0 1 .2 1.8.5 2.4.2.7.6 1.2 1.1 1.8.6.5 1.1.9 1.8 1.1.6.3 1.4.4 2.4.5 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c1 0 1.8-.2 2.4-.5.7-.2 1.2-.6 1.8-1.1.5-.6.9-1.1 1.1-1.8.3-.6.4-1.4.5-2.4.1-1.1.1-1.4.1-3.9s0-2.8-.1-3.9c0-1-.2-1.8-.5-2.4-.2-.7-.6-1.2-1.1-1.8-.6-.5-1.1-.9-1.8-1.1-.6-.3-1.4-.4-2.4-.5C15 2.2 14.7 2.2 12 2.2Zm0 1.8c2.7 0 2.9 0 4 .1.8 0 1.3.2 1.6.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.6.1 1.1.1 1.3.1 4s0 2.9-.1 4c0 .8-.2 1.3-.3 1.6-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.6.3-1.1.1-1.3.1-4 .1s-2.9 0-4-.1c-.8 0-1.3-.2-1.6-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.8-.3-1.6-.1-1.1-.1-1.3-.1-4s0-2.9.1-4c0-.8.2-1.3.3-1.6.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.6-.3 1.1-.1 1.3-.1 4-.1Zm0 3.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.3-8.3a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.5a15 15 0 0 0-1.2-3.2A8 8 0 0 1 18.9 8ZM12 4.2c.7 1 1.3 2.3 1.6 3.8h-3.2c.3-1.5.9-2.8 1.6-3.8ZM4.3 14A7.9 7.9 0 0 1 4 12c0-.7.1-1.4.3-2h2.9a17 17 0 0 0 0 4H4.3Zm.8 2h2.5c.3 1.2.7 2.3 1.2 3.2A8 8 0 0 1 5.1 16Zm2.5-8H5.1a8 8 0 0 1 3.7-3.2A15 15 0 0 0 7.6 8Zm4.4 11.8c-.7-1-1.3-2.3-1.6-3.8h3.2c-.3 1.5-.9 2.8-1.6 3.8ZM13.9 14h-3.8a15 15 0 0 1 0-4h3.8a15 15 0 0 1 0 4Zm.9 5.2c.5-.9.9-2 1.2-3.2h2.5a8 8 0 0 1-3.7 3.2Zm1.7-5.2a17 17 0 0 0 0-4h2.9c.2.6.3 1.3.3 2s-.1 1.4-.3 2h-2.9Z",
  whatsapp:
    "M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.54 3.75 1.48 5.29L2 22l5-1.62a9.83 9.83 0 0 0 5.04 1.38c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm5.7 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.44-.72-2.9-1.15-4.72-4.16-4.86-4.35-.14-.2-1.15-1.55-1.15-2.96 0-1.4.73-2.09 1-2.38.26-.29.57-.36.76-.36l.55.01c.17 0 .41-.07.64.49l.86 2.09c.07.14.12.31.02.5l-.36.53c-.12.14-.24.3-.1.53.14.24.63 1.04 1.35 1.69.93.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06.14-.17.6-.7.76-.94.17-.24.33-.19.55-.1l1.7.8c.22.1.5.17.57.29.07.12.07.7-.17 1.38Z",
} as const;

type Channel = {
  key: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: string;
};

export function Contact() {
  const { email, instagram, website, whatsapp, location } = site.contact;

  /* whatsapp/location kosong → tidak dirender sama sekali: tanpa instruksi
     developer, tanpa nomor/alamat karangan. */
  const channels: Channel[] = [
    {
      key: "email",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: ICONS.mail,
    },
    {
      key: "instagram",
      label: "Instagram",
      value: `@${instagram}`,
      href: `https://instagram.com/${instagram}`,
      external: true,
      icon: ICONS.instagram,
    },
    {
      key: "website",
      label: "Website",
      value: website.replace(/^https?:\/\//, ""),
      href: website,
      external: true,
      icon: ICONS.globe,
    },
    ...(whatsapp
      ? [
          {
            key: "whatsapp",
            label: "WhatsApp",
            value: whatsapp,
            href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
            external: true,
            icon: ICONS.whatsapp,
          },
        ]
      : []),
    ...(location
      ? [{ key: "location", label: "Lokasi", value: location, icon: ICONS.globe }]
      : []),
  ];

  return (
    <section id="contact" className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Kontak</p>
        <h2 className="h2 mt-6 max-w-[14ch]">Let&apos;s talk coconut.</h2>
        <p className="lede mt-6 max-w-[52ch]">
          Mencari kelapa segar, kelapa kupas, kopra, atau arang tempurung? Punya
          pasokan kelapa? Ingin menjajaki kerja sama? Mulai dari sini.
        </p>

        <ul className="mt-8 grid max-w-[46rem] gap-x-8 gap-y-2 text-sm text-mute-2 sm:grid-cols-3">
          <li>Pembeli — produk kelapa</li>
          <li>Pemasok — pasokan dari warga</li>
          <li>Mitra — kerja sama usaha</li>
        </ul>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => {
            const inner = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bone/10 text-gold">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-[18px] fill-current"
                  >
                    <path d={c.icon} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                    {c.label}
                  </span>
                  <span className="mt-1 block truncate text-bone-2">
                    {c.value}
                  </span>
                </span>
              </>
            );

            return (
              <li key={c.key} className="flex">
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex w-full items-center gap-4 rounded-lg border border-bone/15 bg-ink-2 p-5 transition-colors hover:border-gold/60"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex w-full items-center gap-4 rounded-lg border border-bone/15 bg-ink-2 p-5">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm text-mute-2">
          Balasan lewat email pada hari kerja.
        </p>
      </div>
    </section>
  );
}
