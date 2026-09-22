"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { heroShot } from "@/lib/media";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const TITLE = ["From", "coconut", "to", "value"];

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
      <motion.div style={reduce ? undefined : { y, scale }} className="absolute inset-0 -z-10">
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="eyebrow !text-gold-2"
        >
          KelapaKu — {site.tagline.id}
        </motion.p>

        <h1 className="display mt-7 max-w-[16ch] text-paper-2">
          {TITLE.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: "0.6em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.18 + i * 0.09 }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="mt-8 max-w-[52ch] text-lg leading-relaxed text-paper/85"
        >
          KelapaKu mengolah kelapa dari masyarakat sekitar: kelapa segar, kelapa
          kupas, kopra, sampai arang tempurung. Satu buah kelapa tidak berhenti
          pada satu produk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.68 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#contact" className="btn btn-primary !bg-paper-2 !text-ink hover:!bg-gold hover:!text-paper-2">
            Hubungi KelapaKu
          </a>
          <a
            href="#products"
            className="btn border border-paper/30 text-paper hover:border-gold-2 hover:text-gold-2"
          >
            Lihat Produk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
