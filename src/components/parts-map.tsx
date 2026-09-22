import { Reveal } from "@/components/reveal";

const PART = [
  { key: "meat", en: "Flesh / Meat", out: "Copra", id: "Daging kelapa jadi kopra." },
  { key: "shell", en: "Shell", out: "Charcoal", id: "Tempurung jadi arang." },
  { key: "husk", en: "Husk", out: "Kelapa kupas", id: "Sabut menentukan jalur kelapa kupas." },
] as const;

/** Satu kolom = satu bagian kelapa; tiga jalur material terbuka berurutan. */
export function PartsMap() {
  return (
    <section className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Bagian</p>
        <h2 className="h2 mt-6 max-w-[24ch]">
          Nothing valuable should be overlooked.
        </h2>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-lg bg-bone/10 md:grid-cols-3">
          {PART.map((p, i) => (
            <li key={p.key} className="bg-ink-2">
              <Reveal delay={i * 0.12} className="p-8">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                  {p.en}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-normal">
                  {p.out}
                </h3>
                <p className="mt-3 text-bone-2">{p.id}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-mute-2">
          Daging, tempurung, dan sabut dipisahkan sesuai jalur yang dipakai
          KelapaKu.
        </p>
      </div>
    </section>
  );
}
