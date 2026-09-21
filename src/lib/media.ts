/* Stock Unsplash — semua ID diverifikasi HTTP 200 (ganti dengan fotografi
   KelapaKu asli sesuai PRD §22). Alt text mengikuti isi foto sebenarnya. */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

export type Shot = { src: string; alt: string };

export const heroShot = {
  src: u("1585553500215-8888e867e34f", 2000),
  alt: "Tumpukan kelapa segar hijau dan coklat, siap disortir",
};

export const pathShots = {
  direct: {
    src: u("1643171785612-163ed13cf1b4"),
    alt: "Kelapa bertumpuk, siap dijual langsung",
  },
  husk: {
    src: u("1621562010213-c95682af384b"),
    alt: "Tangan memegang sabut kelapa setelah dikupas",
  },
  ceremony: {
    src: u("1638517307486-4c2ae5c45764"),
    alt: "Kelapa yang sudah dibelah, disortir untuk diolah",
  },
} as const;

export const productShots = [
  {
    src: u("1603779046675-2eccbab9b982"),
    alt: "Kelapa segar di atas permukaan terang",
  },
  {
    src: u("1638517307486-4c2ae5c45764"),
    alt: "Kelapa setelah bagian luarnya diproses",
  },
  {
    src: u("1646230153819-2f1a3651a6d4"),
    alt: "Potongan daging kelapa, bahan kopra",
  },
  {
    src: u("1689202722404-af34cebc8b96"),
    alt: "Arang tempurung kelapa berwarna gelap",
  },
] as const;

export const galleryShots = [
  { src: u("1585553500215-8888e867e34f"), alt: "Kelapa tiba dari kebun" },
  { src: u("1643171785612-163ed13cf1b4"), alt: "Kelapa disortir bertumpuk" },
  { src: u("1621562010213-c95682af384b"), alt: "Proses pengupasan sabut" },
  { src: u("1582362731063-debbd3406f1d"), alt: "Kelapa dibelah untuk diambil isinya" },
  { src: u("1613897807164-01263a2296e2"), alt: "Bahan bakar dan arang di lapangan" },
  { src: u("1689202722404-af34cebc8b96"), alt: "Arang tempurung selesai diproses" },
] as const;

export const storyShot = {
  src: u("1638517307486-4c2ae5c45764", 2000),
  alt: "Kelapa setelah digunakan, siap diproses menjadi kopra dan arang",
};
