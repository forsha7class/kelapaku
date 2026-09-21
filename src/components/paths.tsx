const PATHS = [
  {
    n: "A",
    en: "Direct sale",
    id: "Sebagian kelapa dijual langsung tanpa diolah lebih jauh.",
    flow: ["Community", "Coconut", "KelapaKu", "Sale"],
  },
  {
    n: "B",
    en: "Husk removal",
    id: "Sebagian kelapa dikupas sabutnya, dijual sebagai kelapa bersih.",
    flow: ["Community", "Coconut", "Husk removal", "Husked coconut", "Sale"],
  },
  {
    n: "C",
    en: "Used ceremony coconuts",
    id: "Kelapa sisa upacara disortir dan diproses menjadi kopra dan arang.",
    flow: ["Ceremony coconut", "Sorting", "Copra / Charcoal", "Sale"],
  },
] as const;

export function Paths() {
  return (
    <section id="paths" className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Jalur</p>
        <h2 className="h2 mt-6 max-w-[20ch]">One coconut. Different paths.</h2>
        <p className="lede mt-6 max-w-[54ch]">
          Kelapa yang masuk ke KelapaKu tidak semuanya berakhir sama. Tiga jalur
          berjalan berdampingan.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg bg-bone/10 md:grid-cols-3">
          {PATHS.map((p) => (
            <article key={p.n} className="bg-ink-2 p-7 md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-[family-name:var(--font-display)] text-5xl text-bone/25">
                  {p.n}
                </span>
              </div>
              <h3 className="mt-6 text-2xl md:text-[1.75rem]">{p.en}</h3>
              <p className="mt-3 text-bone-2">{p.id}</p>

              <ol className="mt-7 grid gap-2 text-sm text-mute-2">
                {p.flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="tabular text-[0.6875rem] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
