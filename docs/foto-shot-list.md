# Shot list foto KelapaKu

Total: **12 slot foto** di site. Idealnya **10–12 foto asli**; satu foto boleh dipakai
di dua slot berbeda kalau stoknya terbatas.

Penting: `pathShots` sudah **dihapus** dari `media.ts` (dead code, tak dipakai
di halaman mana pun). Jangan difoto untuk itu.

Aturan umum:

- **Rasio & crop**: potret 4:5 untuk foto orang/aktivitas, landscape 3:2 untuk suasana.
  Foto hero WAJIB landscape lebar — teks ditumpuk di atasnya, jadi bagian atas harus
  agak kosong/gelap.
- **Latar**: situs bertema terang (krem gading). Foto dengan latar gelap pekat
  tetap dipakai di hero (dengan overlay gelap), tetapi untuk seksi lain utamakan
  foto bercahaya alami agar menyatu dengan latar terang.
- **Jangan pakai stok atau foto orang lain** — seluruh nilai halaman ini ada pada
  klaim "dokumentasi nyata". Setelah foto asli masuk, kata "Ilustrasi:" di alt text
  dan kalimat disclaimer di section Proses harus dihapus.
- **Tanpa filter berlebihan**, tanpa tulisan/watermark di dalam gambar.
- Format: JPEG kualitas 80, sisi terpanjang 2000px cukup. Kalau bisa kirim juga
  versi 800px.

## Prioritas 1 — wajib (6 foto), tanpa ini site masih terasa stok

| # | Slot | Foto yang dibutuhkan | Orientasi |
|---|------|----------------------|-----------|
| 1 | Hero (1 foto) | Tumpukan kelapa dalam jumlah banyak, di kebun/gudang/halaman, cahaya alami. Sediakan ruang agak kosong di bagian atas untuk judul. | Landscape lebar, min 2000px |
| 2 | Produk 01 — Kelapa Segar | Kelapa utuh bersih, ditumpuk rapi atau di karung | 3:2 |
| 3 | Produk 02 — Kelapa Kupas | Kelapa yang sabutnya sudah dikupas, kelihatan bersih | 3:2 |
| 4 | Produk 03 — Kopra | Kopra hasil kering, ditumpuk / dikarungi / dijemur | 3:2 |
| 5 | Produk 04 — Arang Tempurung | Arang tempurung jadi, ditumpuk / dikarungi | 3:2 |
| 6 | Cerita pemanfaatan (1 foto, tampil besar 50% layar) | Kelapa sisa upacara yang masih layak diolah — bukan foto sampah | 4:5 atau 3:2 |

## Prioritas 2 — galeri proses, 6 foto (boleh dikurangi jadi 3, tapi grid jadi kurang rapi)

Galeri proses = 6 slot. Foto **pertama** tampil 2× lebih besar (span 2 kolom), jadi
jadikan yang paling kuat sebagai foto #7.

| # | Slot | Foto yang dibutuhkan | Orientasi |
|---|------|----------------------|-----------|
| 7 | Galeri (besar) | Suasana keseluruhan: tumpukan kelapa / aktivitas di lokasi | Landscape, min 1600px |
| 8 | Galeri | Karung/truk kelapa datang dibongkar | 3:2 |
| 9 | Galeri | Tangan menyortir kelapa di tumpukan | 3:2 |
| 10 | Galeri | Aktivitas mengupas — ada orang dan alatnya | 3:2 |
| 11 | Galeri | Kelapa dibelah, daging & tempurung dipisah | 3:2 |
| 12 | Galeri | Kopra dijemur atau tempurung dibakar (ada konteks tempat, bukan api saja) | 3:2 |

## Prioritas 3 — bagus kalau ada waktu (untuk slot #8–#12 nanti)

| # | Slot | Foto yang dibutuhkan |
|---|------|----------------------|
| 13 | Tambahan | Close-up tekstur: sabut/serat atau pori arang tempurung |
| 14 | Tambahan | Tampak luar gudang / tempat pengolahan |
| 15 | Tambahan | Orang yang terlibat (potret, dengan izin) |

## Yang TIDAK boleh difoto / dipakai

- Foto orang lain tanpa izin (minta izin lisan, jelaskan untuk website).
- Foto dari internet/Google/Wikipedia — itu yang bikin masalah hukum & kredibilitas.
- Foto yang menunjukkan angka, kapasitas, sertifikat, atau merek pihak lain yang belum
  dikonfirmasi boleh dipublikasikan.

## Setelah file foto siap

Simpan ke `public/img/` dengan nama:

```
hero-01.jpg                 (slot 1)
produk-kelapa-segar.jpg     (slot 2)   produk-kelapa-kupas.jpg  (slot 3)
produk-kopra.jpg            (slot 4)   produk-arang.jpg         (slot 5)
pemanfaatan-01.jpg          (slot 6)
proses-01.jpg ... proses-06.jpg        (slot 7–12)
```

Lalu tinggal edit **satu file**: `src/lib/media.ts`. Semua komponen (hero, produk,
jalur, proses, cerita) otomatis ikut berubah. Setelah itu hapus kata `Ilustrasi:` di
alt text dan hapus kalimat "Foto di bawah adalah ilustrasi tahapannya, bukan
dokumentasi lapangan KelapaKu." di `src/components/process-gallery.tsx` — dua perubahan
kecil itu yang mengubah klaim dari "katalog stok" jadi "dokumentasi nyata".
