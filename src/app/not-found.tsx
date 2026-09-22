import Link from "next/link";
import { site } from "@/lib/site";

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
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-gold"
        >
          Ke halaman utama
        </Link>
        <a
          href={`mailto:${site.contact.email}`}
          className="inline-flex min-h-[44px] items-center rounded-full border border-bone/30 px-6 text-sm transition-colors hover:border-gold hover:text-gold"
        >
          Hubungi KelapaKu
        </a>
      </div>
    </main>
  );
}
