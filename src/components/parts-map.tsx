"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * Satu kolom = satu bagian kelapa. Saat masuk viewport, tiga jalur material
 * terbuka berurutan (PRD §12). Pakai transition CSS, bukan animate() loop.
 */
export function PartsMap() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const PART = [
    { key: "meat", en: "Flesh / Meat", out: "Copra", id: "Daging kelapa jadi kopra." },
    { key: "shell", en: "Shell", out: "Charcoal", id: "Tempurung jadi arang." },
    { key: "husk", en: "Husk", out: "Husked pathway", id: "Sabut menentukan jalur kelapa kupas." },
  ] as const;

  return (
    <section className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Bagian</p>
        <h2 className="h2 mt-6 max-w-[24ch]">
          Nothing valuable should be overlooked.
        </h2>

        <ul ref={ref} className="mt-16 grid gap-px overflow-hidden rounded-lg bg-bone/10 md:grid-cols-3">
          {PART.map((p, i) => (
            <li
              key={p.key}
              className="bg-ink-2 p-8 transition-all duration-700 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                {p.en}
              </p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-3xl">
                {p.out}
              </p>
              <p className="mt-3 text-bone-2">{p.id}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-mute-2">
          Hanya jalur yang sesuai proses nyata KelapaKu yang ditampilkan.
        </p>
      </div>
    </section>
  );
}
