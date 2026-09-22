"use client";

import { Stagger, StaggerItem, Reveal, Tilt } from "@/components/motion";
import { galleryShots } from "@/lib/media";

export function ProcessGallery() {
  return (
    <section id="process" className="border-t border-line">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">Proses</p>
          <h2 className="h2 mt-6">Alur pengolahan.</h2>
          <p className="lede mt-6 max-w-[52ch]">
            Kelapa datang, disortir, dikupas, diolah. Foto di bawah adalah
            ilustrasi tahapannya, bukan dokumentasi lapangan KelapaKu.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" amount={0.1}>
          {galleryShots.map((shot, i) => (
            <StaggerItem
              key={shot.src}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <Tilt className="h-full">
                <figure className="h-full overflow-hidden rounded-xl border border-line bg-paper-3 shadow-[var(--shadow-card)]">
                  <img
                    src={shot.src}
                    srcSet={shot.srcSet}
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    alt={shot.alt}
                    width={1600}
                    height={1067}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03] ${
                      i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  />
                </figure>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
