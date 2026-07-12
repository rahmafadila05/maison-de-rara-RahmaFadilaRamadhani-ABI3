# Maison de Rara — Fine Scents

Prototype website e-commerce untuk brand parfum niche **Maison de Rara**, dibuat untuk Tugas Besar mata kuliah **KAIT II** (Administrasi Bisnis, Semester Genap 2025/2026).

🔗 **Live Website:** _(isi setelah deploy ke GitHub Pages, contoh: https://username.github.io/maison-de-rara/)_
🔗 **Repository:** _(isi link repo GitHub kamu)_

---

## 1. Ringkasan Bisnis

**Nama Bisnis:** Maison de Rara — Fine Scents
**Tagline:** *"Wear a mood, not just a scent."*

**Deskripsi:**
Maison de Rara adalah brand parfum niche yang menyasar anak muda urban yang ingin tampil berani dan mudah diingat lewat aroma yang mereka pakai. Berbeda dari parfum mainstream, setiap produk Maison de Rara dirancang dengan karakter kuat dan cerita di baliknya — bukan sekadar wangi netral untuk "aman", tapi wangi yang jadi identitas.

**Value Proposition:**
- Parfum niche dengan karakter aroma yang jelas dan tidak generik
- Harga terjangkau (Rp 150rb–Rp 355rb) untuk kualitas setara niche parfum internasional
- Kemasan travel-friendly, cocok untuk gaya hidup mobile anak muda urban
- Storytelling kuat di setiap produk — pembeli tahu persis mood apa yang mereka beli

---

## 2. Target Market & Segmentasi Pelanggan

| Segmentasi | Detail |
|---|---|
| Demografis | Usia 18–35 tahun, mahasiswa & pekerja muda, kelas menengah |
| Geografis | Kota besar di Indonesia (Jabodetabek, Bandung, Surabaya, Yogyakarta) |
| Psikografis | Aktif di media sosial, peduli personal branding, suka mencoba produk niche/indie |
| Perilaku | Membeli online, terpengaruh review & rekomendasi, loyal pada brand dengan identitas kuat |

---

## 3. Analisis Pasar Singkat & Kompetitor

Industri parfum niche Indonesia tumbuh seiring meningkatnya minat anak muda pada personal grooming dan self-expression. Kompetitor utama berada di dua kelompok:

- **Brand niche lokal** (mis. HMNS, Saff & Co, Mine Perfumery) — kuat di storytelling & komunitas, harga menengah
- **Parfum mainstream retail** (mis. Bath & Body Works, The Body Shop fragrance line) — jangkauan luas tapi karakter aroma kurang khas

**Diferensiasi Maison de Rara:** fokus pada 4 keluarga aroma yang jelas (Floral, Fresh & Aquatic, Woody & Oriental, Gourmand) dengan storytelling personal di setiap botol, serta pengalaman belanja online yang playful namun tetap terasa premium.

---

## 4. Strategi Manajemen Produk & Katalog

Katalog dibagi ke dalam **4 kategori aroma**, masing-masing punya identitas warna di website agar mudah dikenali pelanggan:

| Kategori | Warna Identitas | Contoh Produk |
|---|---|---|
| Floral | Magenta | Peach Blossom, Rose Noir, Jasmine Whisper |
| Fresh & Aquatic | Teal | Ocean Breeze, Citrus Verve, Sea Salt & Fig |
| Woody & Oriental | Gold | Oud Mystique, Velvet Amber, Midnight Leather |
| Gourmand | Coral | Vanilla Bloom |

Total **10 produk** ditampilkan dengan foto, tagline singkat, deskripsi aroma lengkap, dan harga. Setiap produk tersedia dalam **3 varian ukuran (30ml / 50ml / 100ml)** dengan harga dan **stok berbeda per ukuran**, dipilih lewat halaman detail (modal) yang juga menjelaskan notes aroma dan cocok dipakai kapan. Stok otomatis berkurang begitu pesanan berhasil dibuat, dan tersimpan di `localStorage` sehingga tetap konsisten meski halaman di-refresh.

---

## 5. Model Bisnis & Revenue Stream

- **Model:** Direct-to-Consumer (D2C) — penjualan langsung lewat website sendiri, tanpa perantara marketplace
- **Revenue stream utama:** penjualan unit parfum (30ml–50ml)
- **Revenue stream tambahan (rencana pengembangan):**
  - Bundle/gift set (2–3 parfum dalam satu paket dengan harga spesial)
  - Travel size / sample discovery set untuk pelanggan baru
  - Program referral (diskon untuk yang mengajak teman)

---

## 6. Strategi Harga, Promosi, dan Diskon

**Strategi Harga:** Value-based pricing — harga disesuaikan dengan kompleksitas bahan (mis. Oud Mystique & Midnight Leather dipatok lebih tinggi karena bahan oud dan leather accord lebih mahal), tetap kompetitif dibanding brand niche lain.

**Strategi Promosi:**
- Konten storytelling di Instagram & TikTok (tiap parfum = satu "karakter"/mood)
- Kolaborasi dengan micro-influencer lifestyle & fashion
- Email/WhatsApp blast untuk produk baru & promo musiman

**Strategi Diskon:**
- Diskon 10% untuk pembelian pertama (kode: `HALORARA`)
- Bundling 2 parfum kategori sama = gratis ongkir
- Flash sale di tanggal kembar (mis. 7.7, 8.8) khas e-commerce Indonesia

---

## 7. Proses Checkout & Simulasi Payment Gateway

Alur checkout di website ini:
1. Pelanggan menambahkan produk ke keranjang (tersimpan di `localStorage` sehingga tidak hilang saat refresh)
2. Klik ikon keranjang → drawer menampilkan ringkasan item, bisa ubah jumlah atau hapus item
3. Klik **Checkout** → masuk ke halaman checkout, isi data pengiriman (nama, email, no. HP, alamat, kota, kode pos)
4. Pilih metode pembayaran (simulasi): **Midtrans** (kartu/VA/QRIS), Transfer Bank Manual, atau COD
5. Validasi form dijalankan di sisi client (format email, nomor HP, panjang alamat, dll.) sebelum pesanan bisa dibuat
6. Klik **Buat Pesanan** → sistem men-generate nomor pesanan dan menampilkan konfirmasi sukses

> **Catatan:** Payment gateway pada prototype ini bersifat **simulasi/dummy** — tidak ada transaksi uang nyata. Pada implementasi produksi, langkah pembayaran akan diarahkan ke **Midtrans Snap API** untuk memproses pembayaran kartu, virtual account, dan QRIS secara nyata.

---

## 8. Rencana SEO, Keamanan, dan Pemeliharaan

**SEO:**
- Meta title & description deskriptif di setiap halaman (`<title>`, `meta description`)
- URL & struktur heading (H1–H3) yang jelas dan konsisten
- Alt text deskriptif di semua gambar produk untuk image search
- Rencana konten blog "Panduan Memilih Parfum" untuk menangkap trafik organik pencarian informasional

**Keamanan:**
- Validasi input di sisi client untuk mencegah data checkout yang salah format
- Pada implementasi produksi: validasi ulang di sisi server, HTTPS wajib, tokenisasi pembayaran via payment gateway (tidak menyimpan data kartu di server sendiri)
- Data keranjang di localStorage bersifat lokal per-browser, tidak dikirim ke server pihak ketiga mana pun

**Pemeliharaan:**
- Update katalog produk berkala (produk baru, stok, harga)
- Monitoring performa website lewat Google Analytics (lihat bagian 9)
- Backup rutin dan pengecekan broken link/gambar setiap bulan

---

## 9. Rencana Penggunaan Data Analytics untuk Pengambilan Keputusan

Website ini menyertakan integrasi **Google Analytics (dummy)** di `index.html` beserta event tracking custom di `js/script.js` (`trackEvent()`), yang mencatat:

| Event | Kapan Terjadi | Kegunaan Bisnis |
|---|---|---|
| `view_item` | Pelanggan membuka detail produk | Melihat produk mana yang paling menarik minat |
| `add_to_cart` | Produk ditambahkan ke keranjang | Mengukur *add-to-cart rate* per produk/kategori |
| `begin_checkout` | Pelanggan masuk ke halaman checkout | Mendeteksi di titik mana calon pembeli mulai serius |
| `purchase` | Pesanan berhasil dibuat | Menghitung *conversion rate* dan produk terlaris |

**Metrik utama yang akan dipantau:**
- **Bounce rate** — apakah hero & halaman utama cukup menarik untuk membuat pengunjung menjelajah lebih jauh
- **Conversion rate** (purchase ÷ sesi) — efektivitas keseluruhan funnel dari kunjungan sampai checkout
- **Add-to-cart rate** — produk/kategori mana yang paling diminati meski belum tentu dibeli
- **Produk terlaris** — dasar keputusan restock dan produk mana yang perlu dipromosikan lebih
- **Breakdown perangkat** (desktop vs mobile) — memastikan alokasi effort desain responsif sudah tepat sasaran

Data ini akan digunakan untuk keputusan bisnis seperti: produk mana yang perlu didiskon karena rendah peminat, kategori mana yang perlu ditambah variannya, dan apakah funnel checkout perlu disederhanakan jika banyak yang keluar di tahap tersebut.

---

## 10. Struktur Folder

```
maison-de-rara/
├── index.html          # Struktur utama semua halaman (home, checkout, modal, drawer, admin)
├── css/
│   └── style.css        # Semua styling, desain token, animasi, responsive
├── js/
│   └── script.js        # Data produk, logic cart/filter/checkout/stok, analytics
├── images/
│   └── logo.png          # Logo brand Maison de Rara
└── README.md             # Dokumentasi ini
```

---

## 11. Fitur Teknis yang Sudah Diimplementasikan

- ✅ Responsive design (desktop, tablet, mobile) dengan media query
- ✅ Navbar + Hero Banner
- ✅ Halaman Katalog Produk (10 produk, masing-masing 3 varian ukuran: 30ml/50ml/100ml)
- ✅ Manajemen stok otomatis (berkurang tiap checkout berhasil, badge "Stok Terbatas"/"Stok Habis")
- ✅ Menu Admin untuk kelola stok manual (link "Kelola Stok" di footer, PIN demo: `1234`)
- ✅ Section Sejarah Toko & Visi Misi
- ✅ Multi-bahasa (Indonesia / English / Français) via language switcher di navbar
- ✅ Modal Detail Produk
- ✅ Keranjang Belanja (Add to Cart, Update Quantity, Remove, Total Otomatis) — pakai `localStorage`
- ✅ Halaman Checkout (form + simulasi pembayaran)
- ✅ Footer lengkap
- ✅ Filter & Search produk (kategori, harga, nama)
- ✅ Perhitungan total otomatis + validasi form
- ✅ Smooth scrolling & animasi halus (orb hero, hover card, modal, drawer)
- ✅ Integrasi Google Analytics (dummy) + custom event tracking
- ✅ Sumber gambar dari Pexels (bebas royalti)

## 12. Cara Menjalankan Secara Lokal

Karena semua fitur murni HTML/CSS/JS (tanpa build tool), cukup buka `index.html` langsung di browser, atau jalankan local server sederhana:

```bash
# Python 3
python -m http.server 8000

# lalu buka http://localhost:8000
```

## 13. Deployment ke GitHub Pages

1. Push seluruh folder ini ke repository GitHub
2. Buka **Settings → Pages** di repo
3. Pilih branch `main` dan folder `/ (root)`
4. Simpan — GitHub akan memberi live URL dalam beberapa menit
5. Tempel live URL tersebut di bagian atas README ini

---

*Dibuat untuk keperluan Tugas Besar KAIT II — Administrasi Bisnis. Semua transaksi pembayaran pada prototype ini bersifat simulasi.*
