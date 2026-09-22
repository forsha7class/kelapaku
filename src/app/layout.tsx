import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { SignatureStory } from "@/components/signature-story";
import { Paths } from "@/components/paths";
import { Products } from "@/components/products";
import { PartsMap } from "@/components/parts-map";
import { ProductStory } from "@/components/product-story";
import { ProcessGallery } from "@/components/process-gallery";
import { Why } from "@/components/why";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

const description =
  "KelapaKu mengolah dan memanfaatkan berbagai potensi kelapa menjadi produk bernilai, dari kelapa segar hingga kopra dan arang tempurung.";

const title = "KelapaKu — Dari Kelapa Menjadi Nilai";

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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          Lompat ke konten
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
