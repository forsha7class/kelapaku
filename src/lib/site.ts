export const site = {
  name: "KelapaKu",
  domain: "https://kelapaku.my.id",
  tagline: { en: "From Coconut to Value", id: "Dari kelapa menjadi nilai." },
  /* PRD §31 — placeholders, ganti sebelum production. */
  contact: {
    whatsapp: "[WHATSAPP_NUMBER]",
    email: "[EMAIL]",
    location: "[LOCATION]",
    instagram: "[INSTAGRAM]",
  },
} as const;

export const cta = {
  primary: { en: "Explore the Story", id: "Telusuri kisahnya", href: "#story" },
  secondary: {
    en: "Contact KelapaKu",
    id: "Hubungi KelapaKu",
    href: "#contact",
  },
} as const;

export const nav = [
  { en: "Story", id: "Kisah", href: "#story" },
  { en: "Paths", id: "Jalur", href: "#paths" },
  { en: "Products", id: "Produk", href: "#products" },
  { en: "Process", id: "Proses", href: "#process" },
  { en: "Contact", id: "Kontak", href: "#contact" },
] as const;
