type Contact = {
  email: string;
  instagram: string;
  website: string;
  /** Kosong = belum tersedia → kanal disembunyikan, tidak ada data karangan. */
  whatsapp: string;
  location: string;
};

const contact: Contact = {
  email: "kelapaku.my.id@gmail.com",
  instagram: "kelapaku_official",
  website: "https://www.kelapaku.my.id",
  whatsapp: "",
  location: "Bresela",
};

export const site = {
  name: "KelapaKu",
  domain: "https://www.kelapaku.my.id",
  tagline: { en: "From Coconut to Value", id: "Dari kelapa menjadi nilai." },
  contact,
} as const;

/* Label navigasi = Bahasa Indonesia, senada dengan eyebrow tiap seksi. */
export const nav = [
  { label: "Kisah", href: "#story" },
  { label: "Jalur", href: "#paths" },
  { label: "Produk", href: "#products" },
  { label: "Proses", href: "#process" },
  { label: "Kontak", href: "#contact" },
] as const;
