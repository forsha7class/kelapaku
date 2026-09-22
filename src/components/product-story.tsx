"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion";
import { storyShot } from "@/lib/media";

export function ProductStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="border-t border-line bg-paper-2">
      <div className="grid lg:grid-cols-2">
        <div
          ref={ref}
          className="relative min-h-[52svh] overflow-hidden bg-paper-3 lg:min-h-full"
        >
          <motion.div
            style={reduce ? undefined : { y }}
            className="absolute inset-[-8%]"
          >
            <img
              src={storyShot.src}
              srcSet={storyShot.srcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={storyShot.alt}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        <div className="shell flex flex-col justify-center py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Pemanfaatan</p>
            <h2 className="h2 mt-6 max-w-[16ch]">
              Pemanfaatan kelapa sisa upacara.
            </h2>

            <p className="lede mt-8 max-w-[50ch]">
              Satu kelapa bisa mulai dari dapur warga atau dari upacara. Setelah
              fungsi pertamanya selesai, bahannya masih bisa jadi sesuatu.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid max-w-[34rem] gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              <div className="bg-paper-3 p-6">
                <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                  Daging
                </dt>
                <dd className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                  Kopra
                </dd>
              </div>
              <div className="bg-paper-3 p-6">
                <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                  Tempurung
                </dt>
                <dd className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                  Arang
                </dd>
              </div>
            </dl>
          </Reveal>

          <p className="mt-8 max-w-[46ch] text-mute">
            Kami menyebutnya kelapa sisa upacara — bukan limbah.
          </p>
        </div>
      </div>
    </section>
  );
}
