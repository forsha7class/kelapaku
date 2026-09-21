import { Reveal } from "@/components/reveal";

const REASONS = [
  {
    en: "Local sourcing",
    id: "Kelapa dibeli langsung dari warga sekitar.",
  },
  {
    en: "Multiple pathways",
    id: "Kelapa bisa dijual langsung, dikupas, atau diolah lebih jauh.",
  },
  {
    en: "Material utilization",
    id: "Kelapa sisa upacara diolah menjadi kopra dan arang tempurung.",
  },
  {
    en: "Practical value creation",
    id: "Bagian yang biasanya tidak terpakai tetap menghasilkan nilai.",
  },
] as const;

export function Why() {
  return (
    <section className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Kenapa</p>
              <h2 className="h2 mt-6">Why KelapaKu.</h2>
              <p className="mt-6 max-w-[42ch] text-mute-2">
                Tanpa klaim kualitas atau skala yang belum bisa dibuktikan. Ini yang
                bisa kami sebut sekarang.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-lg bg-bone/10 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <li key={r.en} className="bg-ink-2">
                <Reveal delay={i * 0.06} className="p-7">
                  <h3 className="text-xl">{r.en}</h3>
                  <p className="mt-2 text-bone-2">{r.id}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
