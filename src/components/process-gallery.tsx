import { galleryShots } from "@/lib/media";

export function ProcessGallery() {
  return (
    <section id="process" className="border-t border-bone/10">
      <div className="shell py-24 md:py-32">
        <p className="eyebrow">Proses</p>
        <h2 className="h2 mt-6">The work behind it.</h2>
        <p className="lede mt-6 max-w-[52ch]">
          Kelapa datang, disortir, dikupas, diolah. Ini tahap nyata di lapangan —
          bukan ilustrasi.
        </p>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryShots.map((shot, i) => (
            <figure
              key={shot.src}
              className={`overflow-hidden rounded-lg bg-ink-3 ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
