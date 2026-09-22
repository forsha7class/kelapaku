import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan — KelapaKu",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-6 max-w-[20ch]">Halaman ini tidak ada.</h1>
      <p className="lede mt-6 max-w-[48ch]">
        Alamat yang Anda buka tidak ditemukan. Kembali ke halaman utama untuk
        melihat kisah, produk, dan proses KelapaKu.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link href="/" className="btn btn-primary">
          Ke halaman utama
        </Link>
        <a href={`mailto:${site.contact.email}`} className="btn btn-ghost">
          Hubungi KelapaKu
        </a>
      </div>
    </main>
  );
}
