import { Reveal } from "@/components/reveal";
import { storyShot } from "@/lib/media";

export function ProductStory() {
  return (
    <section className="border-t border-bone/10">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[52svh] bg-ink-3 lg:min-h-full">
          <img
            src={storyShot.src}
            srcSet={storyShot.srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={storyShot.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
        </div>

        <div className="shell flex flex-col justify-center py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Pemanfaatan</p>
            <h2 className="h2 mt-6 max-w-[16ch]">Second life for the coconut.</h2>

            <p className="lede mt-8 max-w-[50ch]">
              Satu kelapa bisa mulai dari dapur warga atau dari upacara. Setelah
              fungsi pertamanya selesai, bahannya masih bisa jadi sesuatu.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid max-w-[34rem] gap-px overflow-hidden rounded-lg bg-bone/10 sm:grid-cols-2">
            <div className="bg-ink-2 p-6">
              <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                Daging
              </dt>
              <dd className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                Kopra
              </dd>
            </div>
            <div className="bg-ink-2 p-6">
              <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-mute">
                Tempurung
              </dt>
              <dd className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                Arang
              </dd>
            </div>
          </dl>
          </Reveal>

          <p className="mt-8 max-w-[46ch] text-mute-2">
            Kami menyebutnya kelapa sisa upacara — bukan limbah.
          </p>
        </div>
      </div>
    </section>
  );
}
