# KelapaKu

Situs brand **KelapaKu** — *Dari kelapa menjadi nilai.* Satu halaman yang
menjelaskan bagaimana kelapa dari warga sekitar diolah lewat beberapa jalur
menjadi kelapa segar, kelapa kupas, kopra, dan arang tempurung.

## Teknologi

- **Next.js 15** (App Router, static export) + **React 19**
- **Tailwind CSS v4**
- **Framer Motion** untuk animasi
- TypeScript

Situs di-*export* sebagai berkas statis (`output: "export"`) dan disajikan via
**GitHub Pages** di domain **kelapaku.my.id**.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # menghasilkan folder out/
npm run start      # pratinjau hasil build (server statis)
```

## Deploy

Push ke branch `main` memicu workflow `.github/workflows/deploy.yml` yang
membangun lalu menerbitkan situs ke GitHub Pages. Tidak perlu langkah manual.

## Struktur

```
src/app/          layout (SEO/JSON-LD), page, not-found, globals.css
src/components/   komponen per seksi halaman
src/lib/site.ts   identitas & kontak (satu sumber kebenaran)
src/lib/media.ts  sumber gambar (ilustrasi stok — lihat docs/foto-shot-list.md)
docs/             shot list foto asli
scripts/          skrip audit browser (CDP)
```

## Konten & foto

Seluruh teks kontak dan gambar dipusatkan di `src/lib/site.ts` dan
`src/lib/media.ts`. Mengganti foto cukup dengan mengganti entri di
`media.ts` — semua seksi ikut berubah.

Angka dan tahapan proses mengikuti kebutuhan dokumentasi; tidak ada klaim
kapasitas atau sertifikasi yang belum terverifikasi.

Lihat `docs/foto-shot-list.md` untuk daftar 12 slot foto asli yang dibutuhkan
untuk mengganti ilustrasi stok.
