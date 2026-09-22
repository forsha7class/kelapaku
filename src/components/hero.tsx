import { heroShot } from "@/lib/media";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Foto stok sebagai ilustrasi, bukan dokumentasi operasi KelapaKu.
          Scrim wajib: kontras teks di atas foto diverifikasi di titik tergelap. */}
      <img
        src={heroShot.src}
        srcSet={heroShot.srcSet}
        sizes="100vw"
        alt={heroShot.alt}
        width={2000}
        height={1333}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/78" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="shell flex min-h-[86svh] flex-col justify-end py-20">
        <p className="eyebrow">KelapaKu — {site.tagline.id}</p>

        <h1 className="display mt-8 max-w-[18ch]">
          From coconut
          <br />
          to value
        </h1>
        <p className="lede mt-8 max-w-[52ch]">
          KelapaKu mengolah kelapa dari masyarakat sekitar: kelapa segar, kelapa
          kupas, kopra, sampai arang tempurung. Satu buah kelapa tidak berhenti
          pada satu produk.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold"
          >
            Hubungi KelapaKu
          </a>
          <a
            href="#products"
            className="inline-flex min-h-[44px] items-center rounded-full border border-bone/30 px-6 text-sm transition-colors hover:border-gold hover:text-gold"
          >
            Lihat Produk
          </a>
        </div>
      </div>
    </section>
  );
}
