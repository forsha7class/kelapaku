import { Reveal } from "@/components/motion";

const PATHS = [
  {
    n: "A",
    en: "Jual langsung",
    id: "Sebagian kelapa dijual langsung tanpa diolah lebih jauh.",
    flow: ["Warga", "Kelapa", "KelapaKu", "Dijual"],
  },
  {
    n: "B",
    en: "Kelapa kupas",
    id: "Sebagian kelapa dikupas sabutnya, lalu dijual sebagai kelapa kupas.",
    flow: ["Warga", "Kelapa", "Pengupasan", "Kelapa kupas", "Dijual"],
  },
  {
    n: "C",
    en: "Kelapa sisa upacara",
    id: "Kelapa sisa upacara disortir dan diolah menjadi kopra dan arang.",
    flow: ["Kelapa sisa upacara", "Sortir", "Kopra / Arang", "Dijual"],
  },
] as const;

export function Paths() {
  return (
    <section id="paths" className="border-t border-line">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">Jalur</p>
          <h2 className="h2 mt-6 max-w-[20ch]">
            Tiga jalur pengolahan dalam satu rantai pasok.
          </h2>
          <p className="lede mt-6 max-w-[54ch]">
            Kelapa yang masuk ke KelapaKu tidak semuanya berakhir sama. Tiga
            jalur berjalan berdampingan.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <article className="group h-full rounded-xl border border-line bg-paper-2 p-7 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[var(--shadow-card-hover)] md:p-8">
                <span className="font-[family-name:var(--font-display)] text-5xl text-gold/70 transition-colors group-hover:text-gold">
                  {p.n}
                </span>
                <h3 className="mt-6 text-2xl md:text-[1.75rem]">{p.en}</h3>
                <p className="mt-3 text-ink-2">{p.id}</p>

                <ol className="mt-7 grid gap-2 text-sm text-mute">
                  {p.flow.map((step, j) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="tabular text-[0.6875rem] text-copper">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
