"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

const STAGES = [
  { n: "01", en: "Whole coconut", id: "Kelapa utuh" },
  { n: "02", en: "Processing", id: "Diproses" },
  { n: "03", en: "Flesh becomes copra", id: "Daging jadi kopra" },
  { n: "04", en: "Shell becomes charcoal", id: "Tempurung jadi arang" },
  { n: "05", en: "Two products, one fruit", id: "Dua produk, satu buah" },
] as const;

export function SignatureStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
    setActive(Math.max(0, idx));
  });

  return (
    <section id="story" className="border-t border-line bg-paper-2">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Kisah</p>
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
          <p className="mt-6 max-w-[46ch] text-mute">
            Semua kelapa tetap mulai dari titik yang sama — dibeli dari warga
            sekitar. Setelah itu jalannya bercabang.
          </p>

          <div className="mt-10 hidden h-px w-full bg-line-2 lg:block">
            <motion.div style={{ width: progress }} className="h-px bg-gold" />
          </div>
        </div>

        <div ref={ref}>
          <ol className="grid gap-4">
            {STAGES.map((s, i) => (
              <motion.li
                key={s.n}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-xl border p-6 transition-colors duration-500 ${
                  active === i
                    ? "border-gold/50 bg-paper"
                    : "border-line bg-paper-2"
                }`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="tabular text-sm text-gold">{s.n}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl">{s.en}</h3>
                    <p className="mt-1 text-mute">{s.id}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
