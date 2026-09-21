import { Reveal } from "@/components/reveal";
import { productShots } from "@/lib/media";

const PRODUCTS = [
  {
    n: "01",
    en: "Fresh Coconut",
    id: "Kelapa segar yang dibeli langsung dari warga sekitar.",
  },
  {
    n: "02",
    en: "Husked Coconut",
    id: "Kelapa yang sabutnya sudah dikupas, siap dijual.",
  },
  {
    n: "03",
    en: "Copra",
    id: "Daging kelapa yang diolah menjadi kopra dan dijual sebagai komoditas.",
  },
  {
    n: "04",
    en: "Coconut Shell Charcoal",
    id: "Tempurung kelapa diproses melalui pembakaran menjadi arang.",
  },
] as const;

export function Products() {
  return (
    <section id="products" className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Produk</p>
        <h2 className="h2 mt-6">What we produce.</h2>
        <p className="mt-6 max-w-[54ch] text-mute-2">
          Spesifikasi, grade, berat, dan harga belum dicantumkan — menunggu data
          resmi dari KelapaKu.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const shot = productShots[i];
            return (
              <Reveal key={p.n} delay={i * 0.08}>
                <article className="group">
                  <div className="overflow-hidden rounded-lg bg-ink-3">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="tabular text-sm text-gold">{p.n}</span>
                    <h3 className="text-[1.75rem]">{p.en}</h3>
                  </div>
                  <p className="mt-2 max-w-[46ch] text-bone-2">{p.id}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
