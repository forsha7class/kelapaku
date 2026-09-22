import { Reveal } from "@/components/motion";

const PART = [
  { key: "meat", en: "Flesh / Meat", out: "Copra", id: "Daging kelapa jadi kopra." },
  { key: "shell", en: "Shell", out: "Charcoal", id: "Tempurung jadi arang." },
  { key: "husk", en: "Husk", out: "Kelapa kupas", id: "Sabut menentukan jalur kelapa kupas." },
] as const;

export function PartsMap() {
  return (
    <section className="border-t border-line">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">Bagian</p>
          <h2 className="h2 mt-6 max-w-[24ch]">
            Nothing valuable should be overlooked.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {PART.map((p, i) => (
            <div key={p.key} className="bg-paper-2">
              <Reveal delay={i * 0.12} className="h-full p-8">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                  {p.en}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-normal">
                  {p.out}
                </h3>
                <p className="mt-3 text-ink-2">{p.id}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-mute">
          Daging, tempurung, dan sabut dipisahkan sesuai jalur yang dipakai
          KelapaKu.
        </p>
      </div>
    </section>
  );
}
