/* Foto stok Unsplash sebagai ilustrasi — BUKAN dokumentasi operasi KelapaKu.
   Alt text menyebut "Ilustrasi" agar tidak menyiratkan foto asli (jujur secara
   faktual). Ganti dengan fotografi KelapaKu asli saat tersedia. */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

/** Beberapa lebar → ponsel tidak mengunduh versi 2000px. */
const srcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${u(id, w)} ${w}w`).join(", ");

export type Shot = { src: string; srcSet: string; alt: string };

const shot = (id: string, alt: string, widths: number[] = [800, 1600]): Shot => ({
  src: u(id, widths[widths.length - 1]),
  srcSet: srcSet(id, widths),
  alt,
});

export const heroShot = shot(
  "1585553500215-8888e867e34f",
  "Ilustrasi: tumpukan kelapa segar hijau dan coklat",
  [800, 1400, 2000],
);

export const pathShots = {
  direct: shot("1643171785612-163ed13cf1b4", "Ilustrasi: kelapa bertumpuk"),
  husk: shot("1621562010213-c95682af384b", "Ilustrasi: sabut kelapa setelah dikupas"),
  ceremony: shot(
    "1638517307486-4c2ae5c45764",
    "Ilustrasi: kelapa yang sudah dibelah",
  ),
} as const;

export const productShots = [
  shot("1603779046675-2eccbab9b982", "Ilustrasi: kelapa segar"),
  shot("1638517307486-4c2ae5c45764", "Ilustrasi: kelapa yang sudah dikupas"),
  shot("1646230153819-2f1a3651a6d4", "Ilustrasi: potongan daging kelapa"),
  shot("1689202722404-af34cebc8b96", "Ilustrasi: arang tempurung kelapa"),
] as const;

export const galleryShots = [
  shot("1585553500215-8888e867e34f", "Ilustrasi: kelapa tiba dari kebun"),
  shot("1643171785612-163ed13cf1b4", "Ilustrasi: kelapa disortir"),
  shot("1621562010213-c95682af384b", "Ilustrasi: pengupasan sabut"),
  shot("1582362731063-debbd3406f1d", "Ilustrasi: kelapa dibelah"),
  shot("1613897807164-01263a2296e2", "Ilustrasi: arang di lapangan"),
  shot("1689202722404-af34cebc8b96", "Ilustrasi: arang tempurung"),
] as const;

export const storyShot = shot(
  "1638517307486-4c2ae5c45764",
  "Ilustrasi: kelapa yang sudah dipakai, siap diolah",
  [800, 1600],
);
