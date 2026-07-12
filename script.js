/* =========================================================
   MAISON DE RARA — script.js
   Fitur: filter & search, cart (localStorage), modal detail,
   checkout + validasi, simulasi pembayaran, analytics dummy.
   ========================================================= */

/* ---------- DATA PRODUK ---------- */
/* Setiap produk punya 3 varian ukuran (ml) dengan harga masing-masing.
   tagline & desc mendukung 3 bahasa: id (Indonesia), en (Inggris), fr (Prancis) */
const PRODUCTS = [
  {
    id: "p01", name: "Peach Blossom", category: "floral",
    tagline: { id: "Manis yang nggak berlebihan", en: "Sweet without overdoing it", fr: "Doux sans jamais en faire trop" },
    desc: {
      id: "Persik matang bertemu bunga putih yang baru mekar, dengan musk tipis yang menahan semuanya tetap dekat kulit. Dibuat untuk hari yang lambat dan langit yang mulai mendung.",
      en: "Ripe peach meets freshly bloomed white flowers, held close to the skin by a whisper of musk. Made for slow days and skies about to turn grey.",
      fr: "La pêche mûre rencontre des fleurs blanches à peine écloses, retenues près de la peau par un soupçon de musc. Pensé pour les journées lentes et les ciels qui s'assombrissent."
    },
    sizes: [{ ml: 30, price: 105000, stock: 18 }, { ml: 50, price: 165000, stock: 12 }, { ml: 100, price: 290000, stock: 6 }],
    img: "https://images.pexels.com/photos/31612014/pexels-photo-31612014.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p02", name: "Ocean Breeze", category: "fresh",
    tagline: { id: "Napas pertama setelah menyelam", en: "That first breath after diving in", fr: "La première respiration après avoir plongé" },
    desc: {
      id: "Garam laut, mint, dan citrus tipis — seperti napas pertama begitu kepala keluar dari air. Ringan tapi menempel lama.",
      en: "Sea salt, mint, and a hint of citrus — like the first breath the moment your head breaks the surface. Light, yet it lingers.",
      fr: "Sel marin, menthe et une pointe d'agrumes — comme la première respiration dès que la tête émerge de l'eau. Léger, mais qui persiste."
    },
    sizes: [{ ml: 30, price: 115000, stock: 22 }, { ml: 50, price: 185000, stock: 15 }, { ml: 100, price: 325000, stock: 8 }],
    img: "https://images.pexels.com/photos/7814959/pexels-photo-7814959.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p03", name: "Rose Noir", category: "floral",
    tagline: { id: "Mawar yang tahu dirinya diperhatikan", en: "A rose that knows it's being watched", fr: "Une rose qui sait qu'on la regarde" },
    desc: {
      id: "Mawar Bulgaria yang digelapkan rempah hitam dan patchouli. Bukan mawar yang lembut — ini mawar yang tahu dirinya diperhatikan.",
      en: "Bulgarian rose darkened with black spices and patchouli. Not a soft rose — a rose that knows exactly when it's being noticed.",
      fr: "Rose bulgare assombrie par des épices noires et du patchouli. Pas une rose douce — une rose qui sait précisément quand on la remarque."
    },
    sizes: [{ ml: 30, price: 160000, stock: 10 }, { ml: 50, price: 255000, stock: 7 }, { ml: 100, price: 445000, stock: 3 }],
    img: "https://images.pexels.com/photos/34089129/pexels-photo-34089129.jpeg"
  },
  {
    id: "p04", name: "Oud Mystique", category: "woody",
    tagline: { id: "Berat, hangat, susah dilupakan", en: "Heavy, warm, impossible to forget", fr: "Lourd, chaud, impossible à oublier" },
    desc: {
      id: "Dibuka dengan saffron yang tajam dan misterius, mengalir ke jantung oud pekat yang dalam, lalu mengendap jadi dasar vanilla hangat yang bertahan lama di kulit. Bukan parfum untuk sekadar wangi — ini untuk saat kamu ingin diingat. Diracik dari kayu gaharu asli, salah satu bahan parfum termahal di dunia, sehingga karakternya terasa jauh lebih dalam dibanding parfum sintetis kebanyakan.",
      en: "Opens with sharp, mysterious saffron, flows into a deep, dense oud heart, then settles into a warm vanilla base that lingers on skin. Not a perfume for just smelling nice — this is for when you want to be remembered. Crafted from real agarwood, one of the most expensive perfume materials in the world, giving it a depth most synthetic perfumes simply can't reach.",
      fr: "S'ouvre sur un safran vif et mystérieux, glisse vers un cœur d'oud dense et profond, puis se dépose sur une base de vanille chaude qui persiste sur la peau. Ce n'est pas un parfum pour simplement sentir bon — c'est pour le moment où l'on veut qu'on se souvienne de vous. Élaboré à partir de véritable bois d'agar, l'une des matières premières les plus coûteuses en parfumerie, lui conférant une profondeur que la plupart des parfums synthétiques n'atteignent jamais."
    },
    sizes: [{ ml: 30, price: 220000, stock: 8 }, { ml: 50, price: 355000, stock: 5 }, { ml: 100, price: 620000, stock: 2 }],
    img: "https://images.pexels.com/photos/26859235/pexels-photo-26859235.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p05", name: "Vanilla Bloom", category: "gourmand",
    tagline: { id: "Pelukan dalam bentuk aroma", en: "A hug, in scent form", fr: "Un câlin, en version parfum" },
    desc: {
      id: "Vanilla bourbon, karamel lembut, sejumput kayu manis. Manis yang menenangkan, bukan yang bikin enek.",
      en: "Bourbon vanilla, soft caramel, a pinch of cinnamon. Sweet in a comforting way — never cloying.",
      fr: "Vanille bourbon, caramel doux, une pincée de cannelle. Sucré et réconfortant — jamais écœurant."
    },
    sizes: [{ ml: 30, price: 140000, stock: 14 }, { ml: 50, price: 225000, stock: 9 }, { ml: 100, price: 395000, stock: 4 }],
    img: "https://images.pexels.com/photos/16085723/pexels-photo-16085723.jpeg"
  },
  {
    id: "p06", name: "Citrus Verve", category: "fresh",
    tagline: { id: "Secangkir energi tanpa kafein", en: "A shot of energy, no caffeine needed", fr: "Une dose d'énergie, sans caféine" },
    desc: {
      id: "Bergamot, jeruk nipis, grapefruit — satu semprot, mata langsung melek. Dibuat untuk hari yang harus dimulai cepat.",
      en: "Bergamot, lime, grapefruit — one spray and your eyes are wide open. Made for mornings that need to start fast.",
      fr: "Bergamote, citron vert, pamplemousse — un vaporisateur et les yeux s'ouvrent grand. Pensé pour les matins qui doivent démarrer vite."
    },
    sizes: [{ ml: 30, price: 95000, stock: 25 }, { ml: 50, price: 155000, stock: 18 }, { ml: 100, price: 270000, stock: 10 }],
    img: "https://images.pexels.com/photos/12146871/pexels-photo-12146871.jpeg"
  },
  {
    id: "p07", name: "Velvet Amber", category: "woody",
    tagline: { id: "Nyaman, tapi nggak pernah diam", en: "Comfortable, but never quite still", fr: "Confortable, mais jamais tout à fait calme" },
    desc: {
      id: "Dibuka dengan amber hangat dan lembut, mengalir ke jantung labdanum yang dalam, lalu mengendap jadi dasar tonka bean yang creamy dan tahan lama. Dibuat untuk momen yang butuh kehadiran tanpa harus teriak — obrolan yang berlarut sampai malam, ruangan yang lampunya mulai diredupkan. Amber dan labdanum dipilih dari resin berkualitas tinggi yang jarang dipakai di parfum mainstream karena karakternya yang kompleks.",
      en: "Opens with warm, soft amber, flows into a deep labdanum heart, then settles into a creamy, long-lasting tonka bean base. Made for moments that need presence without shouting — conversations that run late into the night, a room where the lights have just been dimmed. The amber and labdanum are sourced from high-grade resins rarely used in mainstream perfumery because of how complex they are to work with.",
      fr: "S'ouvre sur un ambre chaud et doux, glisse vers un cœur de labdanum profond, puis se dépose sur une base crémeuse et durable de fève tonka. Pensé pour les moments qui ont besoin de présence sans éclat — les conversations qui s'étirent tard dans la nuit, une pièce dont on vient de tamiser les lumières. L'ambre et le labdanum proviennent de résines haut de gamme, rarement utilisées en parfumerie grand public tant leur complexité est grande."
    },
    sizes: [{ ml: 30, price: 190000, stock: 9 }, { ml: 50, price: 305000, stock: 6 }, { ml: 100, price: 535000, stock: 3 }],
    img: "https://images.pexels.com/photos/14238877/pexels-photo-14238877.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p08", name: "Jasmine Whisper", category: "floral",
    tagline: { id: "Lembut tapi susah diabaikan", en: "Soft, yet impossible to ignore", fr: "Doux, mais impossible à ignorer" },
    desc: {
      id: "Melati sambac dipetik malam hari, ylang-ylang, musk putih. Lembut, tapi caranya masuk ruangan susah diabaikan.",
      en: "Jasmine sambac picked at night, ylang-ylang, white musk. Soft, yet the way it enters a room is hard to overlook.",
      fr: "Jasmin sambac cueilli la nuit, ylang-ylang, musc blanc. Doux, mais sa façon d'entrer dans une pièce ne passe jamais inaperçue."
    },
    sizes: [{ ml: 30, price: 150000, stock: 16 }, { ml: 50, price: 245000, stock: 11 }, { ml: 100, price: 430000, stock: 5 }],
    img: "https://images.pexels.com/photos/8166613/pexels-photo-8166613.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "p09", name: "Sea Salt & Fig", category: "fresh",
    tagline: { id: "Santai, tapi tetap rapi", en: "Relaxed, but always put together", fr: "Décontracté, mais toujours soigné" },
    desc: {
      id: "Garam mineral bertemu buah ara segar, dilapis cedar tipis. Aquatic yang nggak biasa — santai tapi tetap rapi.",
      en: "Mineral sea salt meets fresh fig, layered with a touch of cedar. An unusual aquatic — relaxed, yet always put together.",
      fr: "Le sel marin minéral rencontre la figue fraîche, rehaussé d'une touche de cèdre. Un aquatique inhabituel — décontracté, mais toujours soigné."
    },
    sizes: [{ ml: 30, price: 120000, stock: 13 }, { ml: 50, price: 195000, stock: 8 }, { ml: 100, price: 340000, stock: 4 }],
    img: "https://images.pexels.com/photos/15433487/pexels-photo-15433487.jpeg"
  },
  {
    id: "p10", name: "Midnight Leather", category: "woody",
    tagline: { id: "Tegas dan nggak buru-buru pergi", en: "Firm, and in no hurry to leave", fr: "Ferme, et qui ne se presse jamais de partir" },
    desc: {
      id: "Dibuka dengan asap tembakau yang tajam, mengalir ke jantung leather gelap yang tebal, lalu mengendap jadi dasar kayu bakar yang berat dan bertahan sampai pagi. Leather accord-nya diracik lewat proses layering berlapis, menghasilkan tekstur aroma yang terasa seperti kulit asli — bukan sekadar aroma \"kulit\" generik. Tegas tanpa perlu dipertegas.",
      en: "Opens with sharp tobacco smoke, flows into a thick, dark leather heart, then settles into a heavy woodfire base that lasts until morning. The leather accord is built through layered blending, giving it a texture that feels like real leather — not a generic \"leather\" note. Firm, without ever trying too hard.",
      fr: "S'ouvre sur une fumée de tabac vive, glisse vers un cœur de cuir sombre et épais, puis se dépose sur une base de bois brûlé intense qui dure jusqu'au matin. L'accord cuir est construit par superposition, lui donnant une texture qui évoque le cuir véritable — pas une note de « cuir » générique. Ferme, sans jamais forcer le trait."
    },
    sizes: [{ ml: 30, price: 200000, stock: 7 }, { ml: 50, price: 325000, stock: 4 }, { ml: 100, price: 570000, stock: 2 }],
    img: "https://images.pexels.com/photos/10688062/pexels-photo-10688062.jpeg"
  }
];

const CATEGORY_LABEL = {
  id: { floral: "Floral", fresh: "Fresh & Aquatic", woody: "Woody & Oriental", gourmand: "Gourmand" },
  en: { floral: "Floral", fresh: "Fresh & Aquatic", woody: "Woody & Oriental", gourmand: "Gourmand" },
  fr: { floral: "Floral", fresh: "Frais & Aquatique", woody: "Boisé & Oriental", gourmand: "Gourmand" }
};

/* ---------- I18N: KAMUS TERJEMAHAN (ID / EN / FR) ---------- */
const I18N = {
  id: {
    nav: { home: "Beranda", category: "Kategori", collection: "Koleksi", contact: "Kontak" },
    hero: {
      eyebrow: "Parfum niche — dibuat untuk ditandai, bukan disamarkan",
      title: '<em>Wear</em> a mood,<br>not just a scent.',
      sub: "Empat keluarga aroma. Sepuluh karakter berbeda. Satu tempat untuk menemukan wangi yang benar-benar milikmu.",
      cta1: "Jelajahi Koleksi", cta2: "Lihat Kategori"
    },
    category: { eyebrow: "🌸 Kategori", heading: "Pilih keluarga aromamu" },
    chip: { all: "Semua", floral: "🌸 Floral", fresh: "🌊 Fresh", woody: "🕯 Woody & Oriental", gourmand: "🍮 Gourmand" },
    search: { placeholder: "Cari nama parfum..." },
    sort: { default: "Urutkan", priceAsc: "Harga: Rendah ke Tinggi", priceDesc: "Harga: Tinggi ke Rendah", nameAsc: "Nama: A–Z" },
    collection: { eyebrow: "🌸 Koleksi", heading: "10 karakter, satu untukmu", empty: "Tidak ada parfum yang cocok dengan pencarianmu. Coba kata kunci atau kategori lain." },
    story: {
      eyebrow: "🎀 Perjalanan Kami", heading: "Dari eksperimen kecil, jadi Maison de Rara",
      historyTitle: "Sejarah Kami",
      historyText: 'Semua berawal dari kebiasaan kecil: mencium ujung pergelangan tangan sebelum keluar rumah, memastikan wangi yang dipakai terasa "benar". Tahun 2023, pendiri Maison de Rara lelah dengan pilihan yang itu-itu saja — parfum niche berkarakter selalu dibanderol mahal, sementara yang terjangkau seringnya terasa generik dan gampang dilupakan.<br><br>Dari kegelisahan itu lahir eksperimen kecil di kamar kos: mencampur, mencatat, gagal, mencoba lagi. Dua tahun kemudian, setelah puluhan formula ditolak dan ratusan sampel dibagikan gratis ke teman-teman terdekat untuk diuji jujur-jujuran, sepuluh karakter aroma ini akhirnya lahir — masing-masing dengan cerita dan momennya sendiri.<br><br>Maison de Rara bukan tentang wangi yang aman. Ini tentang wangi yang berani dikenali.',
      visionTitle: "Visi", visionText: "Menjadi rumah parfum niche pilihan utama anak muda Indonesia yang ingin tampil berani dan berkarakter lewat aroma yang mereka pakai.",
      missionTitle: "Misi",
      mission1: "Menghadirkan parfum berkualitas dengan harga terjangkau tanpa mengorbankan karakter aroma",
      mission2: "Mengedukasi pelanggan seputar dunia fragrance lewat storytelling di setiap produk",
      mission3: "Membangun komunitas pencinta parfum niche lokal yang saling merekomendasikan",
      mission4: "Terus berinovasi lewat riset aroma dan mendengarkan masukan pelanggan"
    },
    about: {
      eyebrow: "🌸 Tentang Kami",
      text: "Kami percaya wangi adalah bahasa yang tidak terucap — cara memperkenalkan diri sebelum sempat berbicara. Setiap botol di Maison de Rara diracik untuk mereka yang ingin diingat, bukan sekadar dikenal.",
      point1: "Sepuluh parfum niche lintas 4 keluarga aroma",
      point2: "Formulasi tahan lama, cocok iklim tropis",
      point3: "Kemasan travel-friendly & giftable"
    },
    contact: { title: "Hubungi Kami", note: "Respon dalam 1x24 jam pada hari kerja." },
    footer: {
      navTitle: "Navigasi", policyTitle: "Kebijakan", followTitle: "Ikuti Kami",
      copyright: "© 2026 Maison de Rara — Fine Scents. Prototype tugas akademik, checkout & pembayaran bersifat simulasi.",
      adminLink: "Kelola Stok"
    },
    policy: {
      shippingTitle: "Kebijakan Pengiriman & Retur", privacyTitle: "Kebijakan Privasi", termsTitle: "Syarat & Ketentuan",
      updated: "Terakhir diperbarui: Juli 2026", langNote: ""
    },
    common: { backToShop: "← Kembali ke Toko" },
    checkout: {
      backLink: "← Kembali ke Koleksi", eyebrow: "🎀 Checkout", heading: "Selesaikan pesananmu",
      shippingDataTitle: "Data Pengiriman", paymentTitle: "Metode Pembayaran", simulasiTag: "simulasi"
    },
    field: { name: "Nama Lengkap", email: "Email", phone: "No. HP / WhatsApp", address: "Alamat Lengkap", city: "Kota", postal: "Kode Pos" },
    placeholder: { name: "Nama penerima", email: "nama@email.com", phone: "08xx xxxx xxxx", address: "Jalan, nomor rumah, kelurahan, kecamatan" },
    payment: { midtrans: "Midtrans (Kartu / VA / QRIS)", transfer: "Transfer Bank Manual", cod: "Bayar di Tempat (COD)" },
    summary: { title: "Ringkasan Pesanan", subtotal: "Subtotal", shipping: "Ongkos Kirim", total: "Total", placeOrder: "Buat Pesanan", secureNote: "🔒 Simulasi pembayaran — tidak ada transaksi nyata yang terjadi." },
    admin: { eyebrow: "Internal", heading: "Kelola Stok", desc: 'Ubah jumlah stok tiap ukuran, lalu tap "Simpan Perubahan". Perubahan tersimpan otomatis di perangkat ini.', save: "Simpan Perubahan", reset: "Reset ke Stok Awal" },
    cart: { title: "Keranjang Belanja", checkoutBtn: "Checkout", empty: "Keranjangmu masih kosong. Yuk pilih wangi favoritmu di koleksi." },
    success: { title: "Pesanan Berhasil!", text1: "Nomor pesanan", text2: "telah kami terima. Detail pengiriman dikirim ke email kamu.", closeBtn: "Kembali Belanja" },
    stock: { low: "Stok Terbatas", out: "Stok Habis", outSuffix: " (Habis)", outForSize: "Stok habis untuk ukuran ini", lowRemaining: "Sisa {n} — buruan sebelum kehabisan", available: "Stok tersedia: {n}" },
    modal: { addToCart: "Tambah ke Keranjang", outOfStock: "Stok Habis", startFrom: "Mulai" },
    toast: {
      added: "{name} ({size}ml) ditambahkan ke keranjang", limitReached: "Stok {name} ({size}ml) cuma tersisa {stock}",
      notEnough: "Stok tidak cukup — sisa {stock}, di keranjang sudah {inCart}", wrongPin: "PIN salah",
      stockUpdated: "Stok berhasil diperbarui", stockReset: "Stok direset ke nilai awal",
      cartEmpty: "Keranjang masih kosong", formError: "Periksa kembali data yang kamu isi"
    }
  },

  en: {
    nav: { home: "Home", category: "Category", collection: "Collection", contact: "Contact" },
    hero: {
      eyebrow: "Niche perfume — made to be noticed, not hidden",
      title: '<em>Wear</em> a mood,<br>not just a scent.',
      sub: "Four scent families. Ten distinct characters. One place to find the fragrance that's truly yours.",
      cta1: "Explore Collection", cta2: "View Categories"
    },
    category: { eyebrow: "🌸 Category", heading: "Pick your scent family" },
    chip: { all: "All", floral: "🌸 Floral", fresh: "🌊 Fresh", woody: "🕯 Woody & Oriental", gourmand: "🍮 Gourmand" },
    search: { placeholder: "Search perfume name..." },
    sort: { default: "Sort by", priceAsc: "Price: Low to High", priceDesc: "Price: High to Low", nameAsc: "Name: A–Z" },
    collection: { eyebrow: "🌸 Collection", heading: "10 characters, one for you", empty: "No perfume matches your search. Try a different keyword or category." },
    story: {
      eyebrow: "🎀 Our Journey", heading: "From a small experiment, to Maison de Rara",
      historyTitle: "Our Story",
      historyText: 'It all started with a small habit: smelling your wrist before heading out, making sure the scent felt "right." In 2023, the founder of Maison de Rara grew tired of the same old choices — characterful niche perfumes always came with a hefty price tag, while affordable ones often felt generic and forgettable.<br><br>That restlessness sparked a small experiment in a tiny rented room: mixing, noting, failing, trying again. Two years later, after dozens of rejected formulas and hundreds of free samples tested honestly by close friends, these ten scent characters were finally born — each with its own story and moment.<br><br>Maison de Rara isn\'t about smelling safe. It\'s about smelling brave enough to be recognized.',
      visionTitle: "Vision", visionText: "To become the go-to niche perfume house for young Indonesians who want to show up bold and full of character through the scent they wear.",
      missionTitle: "Mission",
      mission1: "Offering quality perfume at an accessible price without sacrificing character",
      mission2: "Educating customers about the world of fragrance through storytelling in every product",
      mission3: "Building a community of local niche perfume lovers who recommend each other",
      mission4: "Continuously innovating through scent research and listening to customer feedback"
    },
    about: {
      eyebrow: "🌸 About Us",
      text: "We believe scent is an unspoken language — a way of introducing yourself before you even speak. Every bottle at Maison de Rara is crafted for those who want to be remembered, not just smelled.",
      point1: "Ten niche perfumes across 4 scent families",
      point2: "Long-lasting formulation, suited for tropical climates",
      point3: "Travel-friendly & giftable packaging"
    },
    contact: { title: "Contact Us", note: "We respond within 24 hours on business days." },
    footer: {
      navTitle: "Navigation", policyTitle: "Policies", followTitle: "Follow Us",
      copyright: "© 2026 Maison de Rara — Fine Scents. Academic class project, checkout & payment are simulated.",
      adminLink: "Manage Stock"
    },
    policy: {
      shippingTitle: "Shipping & Returns Policy", privacyTitle: "Privacy Policy", termsTitle: "Terms & Conditions",
      updated: "Last updated: July 2026", langNote: "This policy's full details are currently only available in Indonesian. Please switch to ID for the complete version."
    },
    common: { backToShop: "← Back to Shop" },
    checkout: {
      backLink: "← Back to Collection", eyebrow: "🎀 Checkout", heading: "Complete your order",
      shippingDataTitle: "Shipping Details", paymentTitle: "Payment Method", simulasiTag: "simulation"
    },
    field: { name: "Full Name", email: "Email", phone: "Phone / WhatsApp Number", address: "Full Address", city: "City", postal: "Postal Code" },
    placeholder: { name: "Recipient's name", email: "name@email.com", phone: "+62 8xx xxxx xxxx", address: "Street, house number, district, sub-district" },
    payment: { midtrans: "Midtrans (Card / VA / QRIS)", transfer: "Manual Bank Transfer", cod: "Cash on Delivery (COD)" },
    summary: { title: "Order Summary", subtotal: "Subtotal", shipping: "Shipping Fee", total: "Total", placeOrder: "Place Order", secureNote: "🔒 Simulated payment — no real transaction takes place." },
    admin: { eyebrow: "Internal", heading: "Manage Stock", desc: 'Adjust the stock amount for each size, then tap "Save Changes." Changes are saved automatically on this device.', save: "Save Changes", reset: "Reset to Default Stock" },
    cart: { title: "Shopping Cart", checkoutBtn: "Checkout", empty: "Your cart is empty. Go pick your favorite scent from the collection." },
    success: { title: "Order Successful!", text1: "Order number", text2: "has been received. Shipping details have been sent to your email.", closeBtn: "Back to Shopping" },
    stock: { low: "Limited Stock", out: "Out of Stock", outSuffix: " (Out of stock)", outForSize: "Out of stock for this size", lowRemaining: "Only {n} left — grab it before it's gone", available: "Stock available: {n}" },
    modal: { addToCart: "Add to Cart", outOfStock: "Out of Stock", startFrom: "From" },
    toast: {
      added: "{name} ({size}ml) added to cart", limitReached: "Only {stock} left of {name} ({size}ml)",
      notEnough: "Not enough stock — {stock} left, {inCart} already in cart", wrongPin: "Wrong PIN",
      stockUpdated: "Stock updated successfully", stockReset: "Stock reset to default",
      cartEmpty: "Your cart is empty", formError: "Please check the information you entered"
    }
  },

  fr: {
    nav: { home: "Accueil", category: "Catégorie", collection: "Collection", contact: "Contact" },
    hero: {
      eyebrow: "Parfum de niche — pensé pour être remarqué, pas dissimulé",
      title: '<em>Portez</em> une humeur,<br>pas juste un parfum.',
      sub: "Quatre familles olfactives. Dix caractères différents. Un seul endroit pour trouver le parfum qui est vraiment le vôtre.",
      cta1: "Découvrir la Collection", cta2: "Voir les Catégories"
    },
    category: { eyebrow: "🌸 Catégorie", heading: "Choisissez votre famille olfactive" },
    chip: { all: "Tous", floral: "🌸 Floral", fresh: "🌊 Frais", woody: "🕯 Boisé & Oriental", gourmand: "🍮 Gourmand" },
    search: { placeholder: "Rechercher un parfum..." },
    sort: { default: "Trier par", priceAsc: "Prix : croissant", priceDesc: "Prix : décroissant", nameAsc: "Nom : A–Z" },
    collection: { eyebrow: "🌸 Collection", heading: "10 caractères, un pour vous", empty: "Aucun parfum ne correspond à votre recherche. Essayez un autre mot-clé ou une autre catégorie." },
    story: {
      eyebrow: "🎀 Notre Parcours", heading: "D'une petite expérience à Maison de Rara",
      historyTitle: "Notre Histoire",
      historyText: 'Tout a commencé par une petite habitude : sentir son poignet avant de sortir, pour être sûre que le parfum était « le bon ». En 2023, la fondatrice de Maison de Rara en avait assez des mêmes choix répétitifs — les parfums de niche avec du caractère coûtaient toujours cher, tandis que les options abordables semblaient souvent génériques et vite oubliées.<br><br>De cette frustration est née une petite expérience dans une chambre louée : mélanger, noter, échouer, recommencer. Deux ans plus tard, après des dizaines de formules rejetées et des centaines d\'échantillons offerts à des amis proches pour un avis sincère, ces dix caractères olfactifs ont enfin vu le jour — chacun avec sa propre histoire et son propre moment.<br><br>Maison de Rara, ce n\'est pas sentir « en sécurité ». C\'est oser sentir de façon à être reconnue.',
      visionTitle: "Vision", visionText: "Devenir la maison de parfums de niche de référence pour les jeunes Indonésiens qui veulent s'affirmer avec audace et caractère à travers le parfum qu'ils portent.",
      missionTitle: "Mission",
      mission1: "Offrir des parfums de qualité à prix accessible sans sacrifier le caractère",
      mission2: "Sensibiliser les clients à l'univers de la parfumerie à travers le storytelling de chaque produit",
      mission3: "Construire une communauté locale d'amateurs de parfums de niche qui se recommandent entre eux",
      mission4: "Innover continuellement grâce à la recherche olfactive et à l'écoute des retours clients"
    },
    about: {
      eyebrow: "🌸 À Propos",
      text: "Nous croyons que le parfum est un langage silencieux — une façon de se présenter avant même de parler. Chaque flacon Maison de Rara est conçu pour celles et ceux qui veulent qu'on se souvienne d'eux, pas seulement qu'on les sente.",
      point1: "Dix parfums de niche répartis en 4 familles olfactives",
      point2: "Formulation longue tenue, adaptée au climat tropical",
      point3: "Emballage pratique pour le voyage et idéal à offrir"
    },
    contact: { title: "Nous Contacter", note: "Réponse sous 24h les jours ouvrés." },
    footer: {
      navTitle: "Navigation", policyTitle: "Politiques", followTitle: "Suivez-nous",
      copyright: "© 2026 Maison de Rara — Fine Scents. Projet académique, le paiement et la commande sont simulés.",
      adminLink: "Gérer le Stock"
    },
    policy: {
      shippingTitle: "Politique de Livraison et Retours", privacyTitle: "Politique de Confidentialité", termsTitle: "Conditions Générales",
      updated: "Dernière mise à jour : juillet 2026", langNote: "Le détail complet de cette politique n'est actuellement disponible qu'en indonésien. Merci de passer en ID pour la version complète."
    },
    common: { backToShop: "← Retour à la Boutique" },
    checkout: {
      backLink: "← Retour à la Collection", eyebrow: "🎀 Commande", heading: "Finalisez votre commande",
      shippingDataTitle: "Informations de Livraison", paymentTitle: "Mode de Paiement", simulasiTag: "simulation"
    },
    field: { name: "Nom Complet", email: "E-mail", phone: "Téléphone / WhatsApp", address: "Adresse Complète", city: "Ville", postal: "Code Postal" },
    placeholder: { name: "Nom du destinataire", email: "nom@email.com", phone: "+62 8xx xxxx xxxx", address: "Rue, numéro, quartier, arrondissement" },
    payment: { midtrans: "Midtrans (Carte / VA / QRIS)", transfer: "Virement Bancaire Manuel", cod: "Paiement à la Livraison (COD)" },
    summary: { title: "Résumé de la Commande", subtotal: "Sous-total", shipping: "Frais de Livraison", total: "Total", placeOrder: "Passer la Commande", secureNote: "🔒 Paiement simulé — aucune transaction réelle n'a lieu." },
    admin: { eyebrow: "Interne", heading: "Gérer le Stock", desc: 'Modifiez la quantité en stock de chaque taille, puis appuyez sur « Enregistrer ». Les changements sont sauvegardés automatiquement sur cet appareil.', save: "Enregistrer", reset: "Réinitialiser le Stock" },
    cart: { title: "Panier", checkoutBtn: "Commander", empty: "Votre panier est vide. Allez choisir votre parfum préféré dans la collection." },
    success: { title: "Commande Réussie !", text1: "Le numéro de commande", text2: "a bien été reçu. Les détails de livraison ont été envoyés à votre e-mail.", closeBtn: "Retour aux Achats" },
    stock: { low: "Stock Limité", out: "Rupture de Stock", outSuffix: " (Épuisé)", outForSize: "Rupture de stock pour cette taille", lowRemaining: "Plus que {n} — dépêchez-vous", available: "Stock disponible : {n}" },
    modal: { addToCart: "Ajouter au Panier", outOfStock: "Rupture de Stock", startFrom: "À partir de" },
    toast: {
      added: "{name} ({size}ml) ajouté au panier", limitReached: "Il ne reste que {stock} de {name} ({size}ml)",
      notEnough: "Stock insuffisant — {stock} restant, {inCart} déjà dans le panier", wrongPin: "Code PIN incorrect",
      stockUpdated: "Stock mis à jour avec succès", stockReset: "Stock réinitialisé",
      cartEmpty: "Votre panier est vide", formError: "Veuillez vérifier les informations saisies"
    }
  }
};

/* Helper: ambil string terjemahan via path "a.b.c", dan isi template {placeholder} */
function t(path, vars) {
  const parts = path.split(".");
  let node = I18N[currentLang];
  for (const p of parts) node = node?.[p];
  if (typeof node !== "string") return path;
  if (!vars) return node;
  return node.replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? vars[key] : `{${key}}`));
}
const SHIPPING_COST = 20000;

/* ---------- HELPER: HARGA & UKURAN ---------- */
function getMinPrice(p) { return Math.min(...p.sizes.map(s => s.price)); }
function getSizePrice(p, ml) {
  const found = p.sizes.find(s => s.ml === ml);
  return found ? found.price : p.sizes[0].price;
}
function getDefaultSize(p) { return p.sizes[1].ml; } // ukuran 50ml sebagai default

/* ---------- STOK (live, tersimpan di localStorage) ---------- */
/* Stok awal diambil dari PRODUCTS.sizes[].stock, lalu dikurangi tiap ada pesanan sukses */
function loadStockState() {
  try {
    const raw = localStorage.getItem("mdr_stock");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Gagal membaca data stok:", e);
  }
  // inisialisasi dari data produk asli
  const initial = {};
  PRODUCTS.forEach(p => {
    p.sizes.forEach(s => {
      initial[`${p.id}_${s.ml}`] = s.stock;
    });
  });
  return initial;
}
function saveStockState() {
  try {
    localStorage.setItem("mdr_stock", JSON.stringify(stockState));
  } catch (e) {
    console.error("Gagal menyimpan data stok:", e);
  }
}
function getStock(id, ml) {
  const key = `${id}_${ml}`;
  return stockState[key] !== undefined ? stockState[key] : 0;
}
function decrementStock(id, ml, qty) {
  const key = `${id}_${ml}`;
  stockState[key] = Math.max(0, getStock(id, ml) - qty);
  saveStockState();
}

/* ---------- ADMIN: KELOLA STOK ---------- */
function openAdmin() {
  const pin = prompt("Masukkan PIN Admin untuk kelola stok:");
  if (pin === null) return; // dibatalkan
  if (pin !== ADMIN_PIN) {
    showToast(t("toast.wrongPin"));
    return;
  }
  renderAdminPanel();
  showOnlyView("view-admin");
}

function renderAdminPanel() {
  const container = document.getElementById("adminProductList");
  container.innerHTML = "";
  PRODUCTS.forEach(p => {
    const row = document.createElement("div");
    row.className = "admin-product-row";
    row.innerHTML = `
      <div class="admin-product-info">
        <img src="${p.img}" alt="${p.name}">
        <span class="admin-product-name">${p.name}</span>
      </div>
      <div class="admin-size-inputs">
        ${p.sizes.map(s => `
          <label class="admin-size-input">
            <span>${s.ml}ml</span>
            <input type="number" min="0" inputmode="numeric" data-admin-stock data-id="${p.id}" data-ml="${s.ml}" value="${getStock(p.id, s.ml)}">
          </label>
        `).join("")}
      </div>
    `;
    container.appendChild(row);
  });
}

function saveAdminStock() {
  document.querySelectorAll("[data-admin-stock]").forEach(input => {
    const id = input.dataset.id;
    const ml = input.dataset.ml;
    const val = Math.max(0, parseInt(input.value, 10) || 0);
    stockState[`${id}_${ml}`] = val;
  });
  saveStockState();
  renderGrid();
  showToast(t("toast.stockUpdated"));
}

function resetAdminStock() {
  if (!confirm("Reset semua stok ke nilai awal (bawaan produk)?")) return;
  const initial = {};
  PRODUCTS.forEach(p => p.sizes.forEach(s => { initial[`${p.id}_${s.ml}`] = s.stock; }));
  stockState = initial;
  saveStockState();
  renderAdminPanel();
  renderGrid();
  showToast(t("toast.stockReset"));
}

/* ---------- STATE ---------- */
let cart = loadCart();
let stockState = loadStockState();
let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";
let currentLang = localStorage.getItem("mdr_lang") || "id";
let currentModalProductId = null;

/* ---------- ANALYTICS (dummy GA4-style events) ---------- */
function trackEvent(name, params = {}) {
  // Di production: gtag('event', name, params);
  console.log(`[analytics] ${name}`, params);
  if (typeof gtag === "function") gtag("event", name, params);
}

/* ---------- LOCALSTORAGE HELPERS ---------- */
function loadCart() {
  try {
    const raw = localStorage.getItem("mdr_cart");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Gagal membaca keranjang:", e);
    return [];
  }
}
function saveCart() {
  try {
    localStorage.setItem("mdr_cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Gagal menyimpan keranjang:", e);
  }
}

/* ---------- FORMAT ---------- */
function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

/* ---------- RENDER: PRODUCT GRID ---------- */
function getFilteredProducts() {
  let list = PRODUCTS.filter(p => currentFilter === "all" || p.category === currentFilter);
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q));
  }
  if (currentSort === "price-asc") list = [...list].sort((a, b) => getMinPrice(a) - getMinPrice(b));
  if (currentSort === "price-desc") list = [...list].sort((a, b) => getMinPrice(b) - getMinPrice(a));
  if (currentSort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function renderGrid() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const list = getFilteredProducts();

  grid.innerHTML = "";
  empty.hidden = list.length > 0;

  list.forEach(p => {
    const totalStock = p.sizes.reduce((sum, s) => sum + getStock(p.id, s.ml), 0);
    const isOut = totalStock <= 0;
    const isLow = !isOut && totalStock <= 8;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="card-media">
        <div class="card-halo halo-${p.category}"></div>
        <img src="${p.img}" alt="Parfum ${p.name}" loading="lazy">
        ${isOut ? `<span class="stock-badge out">${t("stock.out")}</span>` : isLow ? `<span class="stock-badge low">${t("stock.low")}</span>` : ""}
      </div>
      <span class="card-eyebrow tag-${p.category}">${CATEGORY_LABEL[currentLang][p.category]}</span>
      <h3 class="card-name">${p.name}</h3>
      <p class="card-tagline">${p.tagline[currentLang]}</p>
      <div class="card-footer">
        <span class="card-price">${t("modal.startFrom")} ${formatRupiah(getMinPrice(p))}</span>
        <div class="card-actions">
          <button class="icon-btn" data-detail="${p.id}" aria-label="Lihat detail">i</button>
          <button class="add-btn" data-detail="${p.id}" aria-label="Pilih ukuran">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- CART LOGIC ---------- */
/* Setiap item cart: { id, size (ml), qty } — id+size adalah kombinasi unik */
function addToCart(id, size, qty = 1) {
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) existing.qty += qty;
  else cart.push({ id, size, qty });
  saveCart();
  updateCartCount();
  const product = PRODUCTS.find(p => p.id === id);
  const unitPrice = getSizePrice(product, size);
  trackEvent("add_to_cart", { item_id: id, item_name: product.name, size_ml: size, value: unitPrice * qty });
  showToast(t("toast.added", { name: product.name, size: size }));
}

function removeFromCart(id, size) {
  cart = cart.filter(item => !(item.id === id && item.size === size));
  saveCart();
  updateCartCount();
  renderDrawer();
}

function updateQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id, size);
    return;
  }
  saveCart();
  updateCartCount();
  renderDrawer();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return sum;
    return sum + getSizePrice(p, item.size) * item.qty;
  }, 0);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count;
}

/* ---------- RENDER: DRAWER ---------- */
function renderDrawer() {
  const container = document.getElementById("drawerItems");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="drawer-empty">${t("cart.empty")}</p>`;
  } else {
    cart.forEach(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      if (!p) return;
      const unitPrice = getSizePrice(p, item.size);
      const row = document.createElement("div");
      row.className = "drawer-item";
      row.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="drawer-item-info">
          <div class="name">${p.name} <span class="size-label">(${item.size}ml)</span></div>
          <div class="qty-row">
            <button data-qty-minus="${p.id}" data-size="${item.size}">−</button>
            <span>${item.qty}</span>
            <button data-qty-plus="${p.id}" data-size="${item.size}">+</button>
            <button class="remove-btn" data-remove="${p.id}" data-size="${item.size}">Hapus</button>
          </div>
        </div>
        <span class="line-price">${formatRupiah(unitPrice * item.qty)}</span>
      `;
      container.appendChild(row);
    });
  }
  document.getElementById("drawerTotal").textContent = formatRupiah(getCartTotal());
}

/* ---------- MODAL DETAIL ---------- */
function openModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  currentModalProductId = id;
  trackEvent("view_item", { item_id: id, item_name: p.name });

  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <div class="modal-media">
      <div class="card-halo halo-${p.category}"></div>
      <img src="${p.img}" alt="Parfum ${p.name}">
    </div>
    <div class="modal-info">
      <span class="card-eyebrow tag-${p.category}">${CATEGORY_LABEL[currentLang][p.category]}</span>
      <h3 class="card-name">${p.name}</h3>
      <p class="modal-desc">${p.desc[currentLang]}</p>

      <div class="size-pills" id="sizePills">
        ${p.sizes.map(s => {
          const stock = getStock(p.id, s.ml);
          return `<button class="size-pill" data-ml="${s.ml}" ${stock <= 0 ? "disabled" : ""}>${s.ml}ml${stock <= 0 ? t("stock.outSuffix") : ""}</button>`;
        }).join("")}
      </div>

      <span class="modal-price" id="modalPrice">${formatRupiah(getSizePrice(p, getDefaultSize(p)))}</span>
      <p class="stock-info" id="stockInfo"></p>
      <div class="qty-stepper">
        <button id="modalQtyMinus">−</button>
        <span id="modalQtyValue">1</span>
        <button id="modalQtyPlus">+</button>
      </div>
      <button class="btn btn-primary" id="modalAddBtn">${t("modal.addToCart")}</button>
    </div>
  `;

  let qty = 1;
  // Kalau ukuran default kehabisan, otomatis pilih ukuran lain yang masih ada stok
  let selectedSize = getStock(p.id, getDefaultSize(p)) > 0
    ? getDefaultSize(p)
    : (p.sizes.find(s => getStock(p.id, s.ml) > 0)?.ml ?? getDefaultSize(p));

  const pillButtons = content.querySelectorAll(".size-pill");
  const addBtn = document.getElementById("modalAddBtn");
  const qtyValueEl = document.getElementById("modalQtyValue");
  const stockInfoEl = document.getElementById("stockInfo");

  function setActivePill() {
    pillButtons.forEach(btn => btn.classList.toggle("active", Number(btn.dataset.ml) === selectedSize));
    document.getElementById("modalPrice").textContent = formatRupiah(getSizePrice(p, selectedSize));

    const stock = getStock(p.id, selectedSize);
    if (qty > stock) qty = Math.max(stock, 0);
    if (qty < 1 && stock > 0) qty = 1;
    qtyValueEl.textContent = qty;

    if (stock <= 0) {
      stockInfoEl.textContent = t("stock.outForSize");
      stockInfoEl.classList.add("out");
      addBtn.disabled = true;
      addBtn.textContent = t("modal.outOfStock");
    } else {
      stockInfoEl.textContent = stock <= 5 ? t("stock.lowRemaining", { n: stock }) : t("stock.available", { n: stock });
      stockInfoEl.classList.toggle("out", false);
      stockInfoEl.classList.toggle("low", stock <= 5);
      addBtn.disabled = false;
      addBtn.textContent = t("modal.addToCart");
    }
  }
  pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      selectedSize = Number(btn.dataset.ml);
      setActivePill();
    });
  });
  setActivePill();

  document.getElementById("modalQtyMinus").onclick = () => {
    if (qty > 1) qty--;
    qtyValueEl.textContent = qty;
  };
  document.getElementById("modalQtyPlus").onclick = () => {
    const stock = getStock(p.id, selectedSize);
    if (qty < stock) qty++;
    else showToast(t("toast.limitReached", { name: p.name, size: selectedSize, stock: stock }));
    qtyValueEl.textContent = qty;
  };
  addBtn.onclick = () => {
    const stock = getStock(p.id, selectedSize);
    const alreadyInCart = cart.find(i => i.id === p.id && i.size === selectedSize)?.qty || 0;
    if (alreadyInCart + qty > stock) {
      showToast(t("toast.notEnough", { stock: stock, inCart: alreadyInCart }));
      return;
    }
    addToCart(p.id, selectedSize, qty);
    closeModal();
  };

  document.getElementById("productModal").hidden = false;
}
function closeModal() { document.getElementById("productModal").hidden = true; currentModalProductId = null; }

/* ---------- DRAWER OPEN/CLOSE ---------- */
function openDrawer() {
  renderDrawer();
  document.getElementById("drawerOverlay").hidden = false;
}
function closeDrawer() { document.getElementById("drawerOverlay").hidden = true; }

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------- VIEW SWITCH (Home <-> Checkout) ---------- */
const ALL_VIEW_IDS = ["view-home", "view-checkout", "view-pengiriman", "view-privasi", "view-syarat", "view-admin"];
const ADMIN_PIN = "1234"; // PIN demo untuk keperluan tugas — di produksi harus pakai autentikasi asli
function showOnlyView(targetId) {
  ALL_VIEW_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = id !== targetId;
  });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function goToCheckout() {
  if (cart.length === 0) {
    showToast(t("toast.cartEmpty"));
    return;
  }
  closeDrawer();
  showOnlyView("view-checkout");
  renderCheckoutSummary();
  trackEvent("begin_checkout", { value: getCartTotal(), items: cart.length });
}
function backToShop() {
  showOnlyView("view-home");
}

const POLICY_VIEW_MAP = { pengiriman: "view-pengiriman", privasi: "view-privasi", syarat: "view-syarat" };
function openPolicy(key) {
  const viewId = POLICY_VIEW_MAP[key];
  if (!viewId) return;
  showOnlyView(viewId);
  trackEvent("view_policy", { policy: key });
}

function renderCheckoutSummary() {
  const container = document.getElementById("summaryItems");
  container.innerHTML = "";
  cart.forEach(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return;
    const unitPrice = getSizePrice(p, item.size);
    const row = document.createElement("div");
    row.className = "summary-item-row";
    row.innerHTML = `<span>${p.name} (${item.size}ml) × ${item.qty}</span><span>${formatRupiah(unitPrice * item.qty)}</span>`;
    container.appendChild(row);
  });
  const subtotal = getCartTotal();
  document.getElementById("sumSubtotal").textContent = formatRupiah(subtotal);
  document.getElementById("sumOngkir").textContent = formatRupiah(SHIPPING_COST);
  document.getElementById("sumTotal").textContent = formatRupiah(subtotal + SHIPPING_COST);
}

/* ---------- CHECKOUT VALIDATION ---------- */
function validateCheckout() {
  let valid = true;
  const fields = [
    { id: "fNama", err: "err-nama", test: v => v.trim().length >= 3, msg: "Nama minimal 3 karakter" },
    { id: "fEmail", err: "err-email", test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Format email tidak valid" },
    { id: "fHp", err: "err-hp", test: v => /^[0-9+ ]{9,15}$/.test(v), msg: "Nomor HP tidak valid" },
    { id: "fAlamat", err: "err-alamat", test: v => v.trim().length >= 10, msg: "Alamat terlalu singkat" },
    { id: "fKota", err: "err-kota", test: v => v.trim().length >= 2, msg: "Kota wajib diisi" },
    { id: "fKodepos", err: "err-kodepos", test: v => /^[0-9]{4,6}$/.test(v), msg: "Kode pos tidak valid" }
  ];

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    const errorEl = document.getElementById(f.err);
    if (!f.test(input.value)) {
      input.classList.add("invalid");
      errorEl.textContent = f.msg;
      valid = false;
    } else {
      input.classList.remove("invalid");
      errorEl.textContent = "";
    }
  });
  return valid;
}

function placeOrder() {
  if (!validateCheckout()) {
    showToast(t("toast.formError"));
    return;
  }

  // Kurangi stok untuk setiap item yang dipesan
  cart.forEach(item => {
    decrementStock(item.id, item.size, item.qty);
  });

  const orderNum = "MDR-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("orderNumber").textContent = "#" + orderNum;
  document.getElementById("successOverlay").hidden = false;

  trackEvent("purchase", { transaction_id: orderNum, value: getCartTotal() + SHIPPING_COST, items: cart.length });

  cart = [];
  saveCart();
  updateCartCount();
  renderGrid(); // refresh grid supaya badge stok terbaru langsung kelihatan
}

function closeSuccessAndReset() {
  document.getElementById("successOverlay").hidden = true;
  document.getElementById("checkoutForm").reset();
  backToShop();
}

/* ---------- APPLY TRANSLATIONS KE DOM ---------- */
function applyTranslations() {
  document.documentElement.lang = currentLang;

  // Teks biasa (textContent)
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // Teks yang mengandung markup (em, br, dsb) — pakai innerHTML
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  // Placeholder input/textarea
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  // Catatan bahasa di halaman kebijakan (disembunyikan kalau bahasa Indonesia)
  document.querySelectorAll(".lang-note").forEach(el => {
    const note = t("policy.langNote");
    if (note) {
      el.textContent = note;
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  });

  // Tombol switcher aktif
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  // Render ulang bagian yang isinya dinamis (produk, keranjang, dsb)
  renderGrid();
  if (!document.getElementById("drawerOverlay").hidden) renderDrawer();
  if (!document.getElementById("productModal").hidden && currentModalProductId) openModal(currentModalProductId);
  if (!document.getElementById("view-checkout").hidden) renderCheckoutSummary();
  if (!document.getElementById("view-admin").hidden) renderAdminPanel();
}

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem("mdr_lang", lang);
  applyTranslations();
}

/* ---------- EVENT BINDING ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  applyTranslations(); // render awal sesuai bahasa tersimpan (default: id)

  // Language switcher
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // Filter chips
  document.getElementById("chipGroup").addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderGrid();
  });

  // Search
  document.getElementById("searchInput").addEventListener("input", e => {
    currentSearch = e.target.value;
    renderGrid();
  });

  // Sort
  document.getElementById("sortSelect").addEventListener("change", e => {
    currentSort = e.target.value;
    renderGrid();
  });

  // Product grid clicks (kedua tombol membuka modal untuk pilih ukuran)
  document.getElementById("productGrid").addEventListener("click", e => {
    const detailBtn = e.target.closest("[data-detail]");
    if (detailBtn) openModal(detailBtn.dataset.detail);
  });

  // Modal close
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("productModal").addEventListener("click", e => { if (e.target.id === "productModal") closeModal(); });

  // Cart drawer open/close
  document.getElementById("cartOpenBtn").addEventListener("click", openDrawer);
  document.getElementById("drawerClose").addEventListener("click", closeDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", e => { if (e.target.id === "drawerOverlay") closeDrawer(); });

  // Drawer item qty/remove (berdasarkan kombinasi id + ukuran)
  document.getElementById("drawerItems").addEventListener("click", e => {
    const minus = e.target.closest("[data-qty-minus]");
    const plus = e.target.closest("[data-qty-plus]");
    const remove = e.target.closest("[data-remove]");
    if (minus) updateQty(minus.dataset.qtyMinus, Number(minus.dataset.size), -1);
    if (plus) updateQty(plus.dataset.qtyPlus, Number(plus.dataset.size), 1);
    if (remove) removeFromCart(remove.dataset.remove, Number(remove.dataset.size));
  });

  // Mobile nav (hamburger) toggle
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  function closeMobileNav() {
    mobileNav.hidden = true;
    burgerBtn.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
  }
  burgerBtn.addEventListener("click", () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    burgerBtn.classList.toggle("open", !isOpen);
    burgerBtn.setAttribute("aria-expanded", String(!isOpen));
  });
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });

  // Checkout navigation
  document.getElementById("goCheckoutBtn").addEventListener("click", goToCheckout);
  document.getElementById("backToShop").addEventListener("click", backToShop);
  document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
  document.getElementById("closeSuccessBtn").addEventListener("click", closeSuccessAndReset);

  // Policy links (Kebijakan: Pengiriman & Retur, Privasi, Syarat & Ketentuan)
  document.querySelectorAll("[data-policy]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      openPolicy(link.dataset.policy);
    });
  });
  document.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => showOnlyView("view-home"));
  });

  // Admin: kelola stok
  document.getElementById("adminLink").addEventListener("click", e => {
    e.preventDefault();
    openAdmin();
  });
  document.getElementById("saveAdminStockBtn").addEventListener("click", saveAdminStock);
  document.getElementById("resetAdminStockBtn").addEventListener("click", resetAdminStock);

  // Smooth-scroll CTA buttons in hero
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.goto)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Nav links that need to scroll to a section after ensuring home view is visible
  document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      backToShop();
      document.getElementById(link.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll('[data-view="home"]:not([data-scroll])').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      backToShop();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
