import { Stagger, StaggerItem, Reveal } from "@/components/motion";

const REASONS = [
  {
    en: "Pasokan lokal",
    id: "Kelapa dibeli langsung dari warga sekitar.",
  },
  {
    en: "Beberapa jalur",
    id: "Kelapa bisa dijual langsung, dikupas, atau diolah lebih jauh.",
  },
  {
    en: "Pemanfaatan menyeluruh",
    id: "Kelapa sisa upacara diolah menjadi kopra dan arang tempurung.",
  },
  {
    en: "Nilai tambah",
    id: "Bagian yang biasanya tidak terpakai tetap menghasilkan nilai.",
  },
] as const;

export function Why() {
  return (
    <section className="border-t border-line bg-paper-2">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Kenapa</p>
              <h2 className="h2 mt-6">Keunggulan kerja sama.</h2>
              <p className="mt-6 max-w-[42ch] text-mute">
                Kelapa dari warga sekitar, diolah lewat beberapa jalur, dan
                setiap bagiannya tetap dipakai.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {REASONS.map((r) => (
              <StaggerItem key={r.en} className="bg-paper-2">
                <div className="h-full p-7">
                  <h3 className="text-xl">{r.en}</h3>
                  <p className="mt-2 text-ink-2">{r.id}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
