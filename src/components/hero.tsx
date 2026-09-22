"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { heroShot } from "@/lib/media";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const TITLE = ["Supplier", "kelapa", "&", "produk", "olahan."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-ink">
      <motion.div
        style={reduce ? undefined : { y, scale }}
        initial={reduce ? false : { scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        {/* Foto ilustrasi (stok) — bukan dokumentasi operasi KelapaKu. */}
        <img
          src={heroShot.src}
          srcSet={heroShot.srcSet}
          sizes="100vw"
          alt={heroShot.alt}
          width={2000}
          height={1333}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink/72" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      <div className="shell flex min-h-[100svh] flex-col justify-end pb-20 pt-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="eyebrow eyebrow-on-dark"
        >
          {site.name} — {site.tagline.id}
        </motion.p>

        <h1 className="display mt-7 max-w-[16ch] text-paper-2">
          {TITLE.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={reduce ? false : { opacity: 0, y: "0.6em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.28 + i * 0.07 }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-8 max-w-[52ch] text-lg leading-relaxed text-paper/85"
        >
          Kami membeli kelapa dari warga sekitar dan mengolahnya menjadi kelapa
          segar, kelapa kupas, kopra, serta arang tempurung — satu rantai pasok,
          beberapa produk.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#contact" className="btn btn-on-dark">
            Hubungi kami
          </a>
          <a href="#products" className="btn btn-ghost-dark">
            Lihat produk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
