import { site } from "@/lib/site";

/** Placeholder belum diisi → jangan render tautan mati. */
function isPlaceholder(v: string) {
  return v.startsWith("[");
}

export function Contact() {
  const { whatsapp, email, instagram, location } = site.contact;
  const live = [
    { label: "WhatsApp", value: whatsapp },
    { label: "Email", value: email },
    { label: "Instagram", value: instagram },
    { label: "Lokasi", value: location },
  ].filter((c) => !isPlaceholder(c.value));

  return (
    <section id="contact" className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Kontak</p>
        <h2 className="h2 mt-6 max-w-[14ch]">Let&apos;s talk coconut.</h2>
        <p className="lede mt-6 max-w-[50ch]">
          Mencari kelapa segar, kelapa kupas, kopra, atau arang tempurung? Hubungi
          KelapaKu.
        </p>

        {live.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-3">
            {live.map((c) => (
              <li key={c.label}>
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-bone/25 px-6 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  {c.label}: {c.value}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 max-w-[54ch] rounded-lg border border-bone/15 bg-ink-2 p-6 text-bone-2">
            Nomor WhatsApp, email, dan lokasi belum tersedia. Isi{" "}
            <code className="text-gold">site.contact</code> di{" "}
            <code className="text-gold">src/lib/site.ts</code> untuk mengaktifkan
            tombol kontak.
          </p>
        )}
      </div>
    </section>
  );
}
