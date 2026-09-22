"use client";

import { motion } from "motion/react";
import { Stagger, StaggerItem, Reveal } from "@/components/motion";
import { productShots } from "@/lib/media";

const PRODUCTS = [
  {
    n: "01",
    en: "Kelapa Segar",
    id: "Kelapa segar hasil pembelian langsung dari warga sekitar.",
  },
  {
    n: "02",
    en: "Kelapa Kupas",
    id: "Kelapa yang sabutnya sudah dikupas, siap dijual.",
  },
  {
    n: "03",
    en: "Kopra (Copra)",
    id: "Daging kelapa yang dikeringkan menjadi kopra dan dijual sebagai komoditas.",
  },
  {
    n: "04",
    en: "Arang Tempurung",
    id: "Tempurung kelapa yang diolah menjadi arang.",
  },
] as const;

export function Products() {
  return (
    <section id="products" className="border-t border-line bg-paper-2">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">Produk</p>
          <h2 className="h2 mt-6">Produk &amp; spesifikasi.</h2>
          <p className="mt-6 max-w-[54ch] text-mute">
            Spesifikasi dan harga tersedia berdasarkan jenis produk dan kebutuhan
            pemesanan. Hubungi KelapaKu untuk kebutuhan Anda.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const shot = productShots[i];
            return (
              <StaggerItem key={p.n}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl border border-line bg-paper-3 shadow-[var(--shadow-card)]">
                    <img
                      src={shot.src}
                      srcSet={shot.srcSet}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      alt={shot.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="tabular text-sm text-copper">{p.n}</span>
                    <h3 className="relative text-[1.75rem]">
                      {p.en}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[46ch] text-ink-2">{p.id}</p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a href="#contact" className="btn btn-primary">
            Tanya Harga
          </a>
          <a href="#process" className="btn btn-ghost">
            Lihat Proses
          </a>
        </div>
      </div>
    </section>
  );
}
