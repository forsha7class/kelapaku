import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/motion";
import { site } from "@/lib/site";

const description =
  "KelapaKu mengolah dan memanfaatkan berbagai potensi kelapa menjadi produk bernilai, dari kelapa segar hingga kopra dan arang tempurung.";

const title = "KelapaKu — Dari Kelapa Menjadi Nilai";

export const viewport: Viewport = {
  themeColor: "#f5efe3",
};

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(site.domain),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: site.name,
    title,
    description,
    locale: "id_ID",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

/**
 * Structured data: hanya Organization + Product. LocalBusiness butuh alamat &
 * nomor nyata (PRD §29/§31) — tambahkan setelah data terverifikasi.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.domain}/#organization`,
      name: site.name,
      url: site.domain,
      description,
      email: site.contact.email,
      sameAs: [`https://instagram.com/${site.contact.instagram}`],
    },
    ...[
      "Kelapa Segar",
      "Kelapa Kupas",
      "Kopra",
      "Arang Tempurung Kelapa",
    ].map((name) => ({
      "@type": "Product",
      name,
      brand: { "@id": `${site.domain}/#organization` },
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper-2"
        >
          Lompat ke konten
        </a>
        {children}
        <ScrollProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
