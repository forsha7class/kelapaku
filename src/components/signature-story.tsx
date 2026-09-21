import { site } from "@/lib/site";

/**
 * Scene signature (PRD §24): scroll memecah kelapa jadi tiga jalur material.
 * Angka & tahap mengikuti PRD §10/§12 — bukan dekorasi.
 */
const STAGES = [
  { n: "01", en: "Whole coconut", id: "Kelapa utuh" },
  { n: "02", en: "Processing", id: "Diproses" },
  { n: "03", en: "Flesh becomes copra", id: "Daging jadi kopra" },
  { n: "04", en: "Shell becomes charcoal", id: "Tempurung jadi arang" },
  { n: "05", en: "Two products, one fruit", id: "Dua produk, satu buah" },
] as const;

export function SignatureStory() {
  return (
    <section id="story" className="border-t border-bone/10">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Story</p>
          <h2 className="h2 mt-6">
            When the
            <br />
            ceremony ends,
            <br />
            the value doesn&apos;t.
          </h2>
          <p className="lede mt-8 max-w-[46ch]">
            Sebagian kelapa sampai ke {site.name} setelah dipakai dalam upacara.
            Bagian yang masih bernilai tidak dibuang: dagingnya menjadi kopra,
            tempurungnya menjadi arang.
          </p>
          <p className="mt-6 max-w-[46ch] text-mute-2">
            Semua kelapa tetap mulai dari titik yang sama — dibeli dari warga
            sekitar. Setelah itu jalannya bercabang.
          </p>
        </div>

        <ol className="grid gap-4">
          {STAGES.map((s, i) => (
            <li
              key={s.n}
              className="rounded-lg border border-bone/10 bg-ink-2 p-6"
            >
              <div className="flex items-baseline gap-5">
                <span className="tabular text-sm text-gold">{s.n}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl">{s.en}</h3>
                  <p className="mt-1 text-mute-2">{s.id}</p>
                </div>
              </div>
              <div
                className="mt-5 h-px w-full origin-left bg-bone/15"
                data-stage={i + 1}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
