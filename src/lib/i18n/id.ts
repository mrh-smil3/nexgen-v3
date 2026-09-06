import type { Dictionary } from "./en";

/**
 * Indonesian copy. Two deliberate choices throughout:
 *
 * 1. Enterprise terms that Indonesian industry actually says in English stay
 *    in English — Work Order, Purchase Requisition/PR, Purchase Order/PO,
 *    dashboard, overhaul, vendor. Translating them would read as a textbook,
 *    not as someone who has worked in a plant.
 * 2. Where Indonesian has the *better* established term, it wins:
 *    "serapan anggaran" (budget absorption) and "Rencana vs Realisasi" are
 *    the standard vocabulary in BUMN and energy planning.
 *
 * Short labels are length-constrained: several sit in narrow grid columns
 * whose minimum width is set by their longest word (see the 320px notes in
 * Hero.tsx and README). Check the overflow probe after editing them.
 */
export const id: Dictionary = {
  meta: {
    title: "Nexgen — Operational Intelligence & Sistem Digital",
    description:
      "Nexgen membangun operational intelligence, integrasi sistem, platform monitoring, dan aplikasi bisnis khusus yang mengubah data enterprise menjadi kendali operasional.",
    ogTitle: "Sistem Anda Punya Datanya. Apakah Anda Punya Kendalinya?",
    ogDescription:
      "Kami menghubungkan sistem enterprise yang sudah berjalan dan mengubah data operasional menjadi visibilitas, monitoring, dan kendali yang bisa ditindaklanjuti.",
  },

  nav: {
    ariaPrimary: "Utama",
    ariaHome: "Nexgen — beranda",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    languageLabel: "Bahasa",
    links: [
      { href: "#approach", label: "Solusi" },
      { href: "#industries", label: "Industri" },
      { href: "#case-study", label: "Studi Kasus" },
      { href: "#why", label: "Tentang" },
      { href: "#contact", label: "Kontak" },
    ],
    cta: "Diskusikan Operasional Anda",
  },

  hero: {
    eyebrow: "Operational Intelligence & Kendali",
    headlineLead: "Sistem Anda punya datanya.",
    headlineAccent: "Apakah Anda punya kendalinya?",
    lede: "Kami membangun lapisan operational intelligence yang menghubungkan sistem Anda yang sudah berjalan, mengonsolidasikan data penting, dan mengubah operasional yang rumit menjadi visibilitas yang jelas dan bisa ditindaklanjuti.",
    // Kept short: the hero copy column is narrow, and the longer phrasing
    // wrapped these buttons onto two lines with an orphan word.
    ctaPrimary: "Lihat Hasil Kerja",
    ctaSecondary: "Diskusikan Operasional",
    meta: [
      { k: "Koneksi", v: "IBM Maximo · ERP" },
      { k: "Fokus", v: "Monitoring & Kendali" },
      { k: "Deploy", v: "Cloud · On-prem" },
    ],
    note: "Antarmuka representatif. Angka yang ditampilkan hanya ilustrasi, bukan data klien.",
  },

  console: {
    title: "Kendali Operasional",
    live: "Live",
    kpis: [
      { label: "Item Terbuka", sub: "dari 342 dalam lingkup" },
      { label: "Menunggu", sub: "lebih 7 hari: 6" },
      { label: "Terbit", sub: "terkonfirmasi: 78" },
    ],
    chartTitle: "Rencana vs Realisasi",
    chartSub: "Minggu 01–24 · Periode Pelaporan",
    chartAria:
      "Grafik garis yang membandingkan progres rencana dan realisasi sepanjang periode pelaporan",
    legendPlan: "Rencana",
    legendActual: "Realisasi",
    metricRealisation: "Realisasi",
    metricPlan: "Rencana",
    metricVariance: "Selisih",
    variancePts: "poin",
    states: {
      inProgress: "Berjalan",
      approved: "Disetujui",
      issued: "Terbit",
      scheduled: "Terjadwal",
      inReview: "Ditinjau",
      completed: "Selesai",
    },
    stream: [
      { code: "ITEM-4821", text: "Inspeksi aset dijadwalkan" },
      { code: "REQ-1174", text: "Permintaan part — 6 baris item" },
      { code: "ORD-0932", text: "Konfirmasi supplier diterima" },
      { code: "ITEM-4835", text: "Tugas pemeliharaan ditugaskan" },
      { code: "REQ-1188", text: "Kit komponen pengganti" },
      { code: "ITEM-4802", text: "Baris item ditutup" },
    ],
    chipIntegration: { title: "ERP · EAM", sub: "Integrasi aktif" },
    // "PIC" rather than "penanggung jawab": universally used in Indonesian
    // corporate speech, and the full phrase makes this chip overhang the panel.
    chipAlert: { title: "6 item tertunda", sub: "Ditandai ke PIC" },
  },

  flowRail: [
    { label: "Sistem Enterprise", sub: "ERP · EAM · Pengadaan" },
    { label: "Integrasi", sub: "API · Sinkronisasi · Pemetaan" },
    { label: "Lapisan Operasional", sub: "Nexgen" },
    { label: "Monitoring & Kendali", sub: "Status · Pengecualian" },
    { label: "Keputusan Manajemen", sub: "Bertindak atas yang penting" },
  ],

  trust: [
    {
      title: "Integrasi Enterprise",
      detail:
        "Integrasi dengan sistem EAM dan pengadaan enterprise, termasuk IBM Maximo",
    },
    {
      title: "Arsitektur Berbasis API",
      detail: "Lapisan integrasi REST dengan kontrak data yang terdokumentasi",
    },
    {
      title: "Kapabilitas Infrastruktur",
      detail: "Linux, Windows Server, deployment on-premise dan cloud",
    },
    {
      title: "Akses Data Terkendali",
      detail: "Akun read-only, hak akses minimum, tanpa mengganti sistem",
    },
  ],

  problem: {
    kicker: "Masalahnya",
    titleLead: "Masalahnya sering bukan",
    titleAccent: "kurangnya sistem.",
    lede: "Banyak organisasi sudah punya ERP, EAM, pengadaan, pemeliharaan, dan sistem enterprise lain. Tantangannya adalah mengubah informasi yang tersebar di sistem-sistem itu menjadi gambaran operasional yang jelas.",
    items: [
      {
        title: "Data tersebar di sistem berbeda",
        body: "ERP, EAM, pengadaan, dan pemeliharaan masing-masing menyimpan sebagian gambaran. Tidak ada satu pun yang menyimpan seluruhnya.",
      },
      {
        title: "Laporan disusun ulang manual",
        body: "Tim melakukan ekspor, salin-tempel, dan rekonsiliasi di spreadsheet setiap minggu untuk menjawab pertanyaan yang itu-itu juga.",
      },
      {
        title: "Status operasional sulit dilacak",
        body: "Progres diketahui di dalam masing-masing fungsi, tapi tidak ada pandangan bersama tentang posisi sebenarnya sebuah aktivitas.",
      },
      {
        title: "Pengadaan terpisah dari operasional",
        body: "PR yang tertunda baru terlihat setelah pekerjaan yang menunggunya sudah terlambat.",
      },
      {
        title: "Manajemen tahu terlambat",
        body: "Saat informasi selesai dikonsolidasikan jadi laporan, waktu untuk bertindak biasanya sudah lewat.",
      },
      {
        title: "Konteks penting terkunci",
        body: "Detail yang menjelaskan penyebab keterlambatan ada di sistem yang tidak dibuka oleh para pengambil keputusan.",
      },
    ],
  },

  gap: {
    kicker: "Celah Operasional",
    title: "Ada celah antara sistem Anda dan keputusan Anda.",
    lede: "Datanya sudah terekam. Yang belum ada adalah lapisan yang mengonsolidasikannya, menjaganya tetap terkini, dan menyajikannya dalam bentuk yang memang dibutuhkan sebuah keputusan operasional.",
    callout:
      "Nexgen mengisi celah operasional itu — tanpa mengganti apa pun yang sudah berjalan di bawahnya.",
    diagramTitle: "Sistem yang Ada",
    erp: { label: "ERP", sub: "Keuangan" },
    eam: { label: "EAM", sub: "Aset" },
    procurement: { label: "Pengadaan", sub: "PR / PO" },
    dataExists: { label: "Data tersedia", sub: "Lengkap tapi terpisah" },
    gapLabel: "Celah Operasional",
    gapBody: "Konsolidasi manual · status tertunda · tanpa pandangan bersama",
    decision: "Keputusan manajemen",
  },

  approach: {
    kicker: "Pendekatan Kami",
    title: "Kami membangun lapisan operasionalnya.",
    lede: "Nexgen terhubung ke sistem yang sudah dipakai organisasi Anda dan membangun lapisan operasional untuk monitoring, analisis, visibilitas alur kerja, dan dukungan keputusan.",
    stages: [
      {
        title: "Hubungkan",
        body: "Integrasikan sistem enterprise dan API yang ada, memakai kontrak data yang memang sudah disediakan platform Anda.",
      },
      {
        title: "Konsolidasi",
        body: "Satukan data operasional penting ke dalam satu struktur, sehingga angka yang sama berarti hal yang sama di mana pun.",
      },
      {
        title: "Pantau",
        body: "Lacak proses, progres, pengecualian, dan status operasional secara terus-menerus, bukan hanya saat pelaporan.",
      },
      {
        title: "Kendalikan",
        body: "Beri manajemen visibilitas yang bisa ditindaklanjuti — apa yang sesuai rencana, apa yang meleset, dan apa yang perlu diputuskan sekarang.",
      },
    ],
  },

  capabilities: {
    kicker: "Yang Kami Bangun",
    title: "Kapabilitas solusi, bukan daftar layanan.",
    lede: "Setiap kapabilitas di bawah ini ada karena sebuah pertanyaan operasional sulit dijawab. Umumnya digabung menjadi satu platform, bukan dikerjakan terpisah.",
    items: [
      {
        title: "Monitoring Operasional",
        body: "Pantau proses operasional penting dari satu antarmuka, dengan status yang mencerminkan sistem sumber, bukan hasil ekspor terakhir.",
        tags: ["Status", "Pengecualian", "Progres"],
      },
      {
        title: "Integrasi Sistem Enterprise",
        body: "Hubungkan aplikasi enterprise yang ada lewat API dan lapisan integrasi, dengan pemetaan dan sinkronisasi yang bisa diaudit.",
        tags: ["REST API", "Sinkronisasi", "Pemetaan data"],
      },
      {
        title: "Perencanaan & Kendali",
        body: "Sistem untuk perencanaan, monitoring progres, dan pelacakan realisasi, sehingga rencana dan aktual berdampingan di setiap tingkat.",
        tags: ["Rencana vs aktual", "Jadwal", "Milestone"],
      },
      {
        title: "Visibilitas Pengadaan",
        body: "Ikuti Purchase Requisition, Purchase Order, vendor, dan progres pengadaan terhadap operasional yang bergantung padanya.",
        tags: ["PR", "PO", "Vendor"],
      },
      {
        title: "Sistem Informasi Manajemen",
        body: "Ubah data operasional menjadi informasi siap pakai untuk manajemen: terkonsolidasi, terkini, dan tersusun sesuai keputusan yang akan diambil.",
        tags: ["Dashboard", "Pelaporan", "Drill-down"],
      },
      {
        title: "Aplikasi Bisnis",
        body: "Aplikasi khusus yang dibangun mengikuti alur kerja spesifik organisasi, di mana produk paket justru memaksa prosesnya yang menyesuaikan.",
        tags: ["Alur kerja", "Formulir", "Persetujuan"],
      },
    ],
  },

  caseStudy: {
    kicker: "Studi Kasus Unggulan",
    titleLead: "Dari data enterprise menjadi",
    titleAccent: "kendali operasional.",
    project: "Monitoring Perencanaan & Serapan Overhaul Pembangkit",
    projectSuffix:
      "— platform monitoring operasional yang terintegrasi dengan IBM Maximo.",
    meta: [
      { k: "Sektor", v: "Ketenagalistrikan" },
      { k: "Sistem sumber", v: "IBM Maximo" },
      { k: "Lingkup", v: "Operasional overhaul" },
      { k: "Peran Nexgen", v: "Lapisan operasional" },
    ],
    problemLabel: "Masalah",
    problemBody:
      "Operasional overhaul berjalan di banyak proses sekaligus — Work Order, pengadaan, perencanaan, dan realisasi anggaran. Semuanya sudah menghasilkan data di dalam sistem enterprise, tapi setiap pertanyaan yang melintasi proses-proses itu harus dijawab dengan menarik ekspor dan merekonsiliasinya manual, sehingga manajemen baru melihat progres dan serapan setelah semuanya terjadi.",
    solutionLabel: "Solusi",
    solutionBody:
      "Nexgen membangun platform monitoring operasional yang membaca dari IBM Maximo melalui lapisan integrasi, menyusun data Work Order dan pengadaan menjadi satu model operasional yang konsisten, lalu menyajikan perencanaan, pengadaan, dan serapan dalam satu antarmuka. Maximo tetap menjadi sistem sumber — tidak ada migrasi dan tidak ada yang diganti.",
    outcomeLabel: "Hasil",
    outcomeBody:
      "Perencanaan, progres pengadaan, dan serapan anggaran terlihat di satu tempat, ter-refresh dari sistem sumber alih-alih disusun ulang manual setiap siklus pelaporan.",
    monitoringLabel: "Area Monitoring",
    monitoringAreas: [
      "Status Work Order",
      "Status Purchase Requisition",
      "Status Purchase Order",
      "Perencanaan overhaul",
      "Progres pengadaan",
      "Serapan anggaran",
      "Realisasi operasional",
    ],
    cta: "Diskusikan operasional serupa",
    architecture: {
      title: "Arsitektur Integrasi",
      scope: "Akses baca",
      source: { label: "IBM Maximo", sub: "Sistem sumber" },
      workOrder: { label: "Work Order", sub: "WO" },
      pr: { label: "Purchase Req.", sub: "PR" },
      po: { label: "Purchase Order", sub: "PO" },
      integration: { label: "Lapisan Integrasi", sub: "REST · sinkron terjadwal" },
      core: { label: "Monitoring Operasional", sub: "Lapisan Nexgen" },
      planning: "Rencana",
      procurement: "Pengadaan",
      absorption: "Serapan",
      output: "Tampilan Manajemen",
    },
    caption:
      "Disederhanakan untuk publikasi. Lingkup integrasi, interval sinkronisasi, dan model akses ditentukan per penugasan.",
  },

  how: {
    kicker: "Cara Kerjanya",
    title: "Lima langkah dari data terpisah menuju kendali operasional.",
    lede: "Urutannya penting. Monitoring yang dibangun sebelum model operasionalnya dipahami hanya menghasilkan dashboard yang tidak dipercaya siapa pun.",
    steps: [
      {
        title: "Pahami",
        body: "Petakan alur kerja operasional, sistem yang sudah ada, dan keputusan apa yang harus didukung oleh datanya.",
      },
      {
        title: "Hubungkan",
        body: "Bangun integrasi dengan sistem dan sumber data yang ada di bawah model akses yang disepakati dan terbatas.",
      },
      {
        title: "Strukturkan",
        body: "Ubah data yang terpisah-pisah menjadi model operasional konsisten dengan definisi yang bisa dipegang semua pihak.",
      },
      {
        title: "Pantau",
        body: "Bangun dashboard, antarmuka monitoring, alur kerja, dan peringatan yang memunculkan status serta pengecualian.",
      },
      {
        title: "Kendalikan",
        body: "Bantu tim dan manajemen mengenali masalah lebih awal dan bertindak selagi masih ada ruang untuk bertindak.",
      },
    ],
  },

  industries: {
    kicker: "Industri",
    title: "Dibangun untuk operasional yang benar-benar kompleks.",
    lede: "Kami fokus pada kompleksitas operasional, bukan pada label industri. Kalau prosesnya melintasi beberapa sistem dan beberapa tim, masalahnya sudah kami kenal.",
    items: [
      {
        name: "Energi & Ketenagalistrikan",
        body: "Pemeliharaan, overhaul, monitoring aset, pengadaan, dan perencanaan di seluruh aset pembangkit.",
        focus: ["Overhaul", "Monitoring aset", "Serapan"],
      },
      {
        name: "Manufaktur",
        body: "Produksi, inventori, pengadaan, pemeliharaan, dan monitoring operasional harian.",
        focus: ["Produksi", "Inventori", "Pemeliharaan"],
      },
      {
        name: "Operasional Industri",
        body: "Alur kerja padat aset di mana kendali operasional bergantung pada banyak bagian yang harus tetap selaras.",
        focus: ["Alur kerja", "Kendali", "Kepatuhan"],
      },
      {
        name: "Logistik",
        body: "Pesanan, pengadaan, pengiriman, dan visibilitas operasional di lokasi yang tersebar.",
        focus: ["Pesanan", "Pengiriman", "Visibilitas"],
      },
      {
        name: "Teknik & Pemeliharaan",
        body: "Work Order, manajemen aset, perencanaan pemeliharaan, dan monitoring pelaksanaan.",
        focus: ["Work Order", "Perencanaan", "Pelaksanaan"],
      },
    ],
    closingBody:
      "Tidak ada di daftar ini? Polanya biasanya berulang. Beri tahu kami proses mana yang ingin Anda lihat dengan jelas, dan kami akan jujur apakah kami cocok untuk itu.",
    closingLink: "Mulai diskusinya →",
  },

  integration: {
    kicker: "Teknologi & Integrasi",
    title: "Dibangun mengelilingi sistem Anda yang sudah ada.",
    lede: "Organisasi Anda tidak butuh satu aplikasi terpisah lagi. Solusi Nexgen dirancang untuk berjalan berdampingan dengan sistem yang sudah Anda pakai — membaca apa yang tersimpan di dalamnya, menghormati di mana kewenangan berada, lalu menambahkan lapisan di atasnya.",
    principleLabel: "Prinsip kerja",
    principleBody:
      "Integrasi secara default dibatasi lingkupnya dan berorientasi baca. Kalau write-back memang dibutuhkan, itu disepakati secara eksplisit, bukan diasumsikan.",
    categories: [
      { name: "ERP", note: "Keuangan & perencanaan sumber daya" },
      { name: "EAM", note: "Manajemen aset & pemeliharaan" },
      { name: "Pengadaan", note: "Data PR, PO, dan vendor" },
      { name: "Database", note: "Akses langsung atau replikasi" },
      { name: "API", note: "REST dan service endpoint" },
      { name: "Sistem Lama", note: "Aplikasi internal generasi lama" },
      { name: "Aplikasi Khusus", note: "Perkakas buatan internal" },
    ],
    scoped: "+ Ditentukan per penugasan",
    stackLabel: "Stack pengerjaan",
    stackNote:
      "Dicantumkan sebagai bukti kapabilitas, bukan sebagai alasan bekerja sama dengan kami. Stack mengikuti operasionalnya, bukan sebaliknya.",
  },

  why: {
    kicker: "Nilai Inti",
    title: "Kenapa organisasi mengajak kami masuk.",
    lede: "Bukan karena kami lebih murah atau lebih cepat, tapi karena masalahnya sebenarnya tidak pernah soal membangun perangkat lunak.",
    values: [
      {
        title: "Pahami operasionalnya dulu",
        body: "Kami tidak mulai dari teknologi. Kami mulai dari masalah operasionalnya — apa yang harus diputuskan, oleh siapa, dan atas dasar bukti apa.",
      },
      {
        title: "Bekerja dengan sistem yang ada",
        body: "Kami memperluas nilai platform yang sudah berjalan, alih-alih meminta organisasi mengganti sesuatu yang sebenarnya berfungsi.",
      },
      {
        title: "Dari data menjadi tindakan",
        body: "Angka yang tidak ditindaklanjuti siapa pun bukanlah visibilitas. Kami merancang untuk keputusan di ujung rantainya.",
      },
      {
        title: "Disesuaikan dengan operasional",
        body: "Solusi dibentuk mengikuti alur kerja yang sebenarnya, bukan memaksa operasional menyesuaikan paket perangkat lunak generik.",
      },
      {
        title: "Cara pikir engineering",
        body: "Rekayasa perangkat lunak, infrastruktur, integrasi, dan pemahaman operasional diperlakukan sebagai satu disiplin.",
      },
    ],
  },

  digital: {
    eyebrow: "Juga tersedia",
    title: "Butuh kehadiran digital saja? Itu juga kami kerjakan.",
    body: "Tidak semua penugasan dimulai dari sistem enterprise. Kami tetap merancang dan membangun produk web untuk organisasi yang masih pada tahap lebih awal.",
    link: "Bicarakan proyek web",
    services: [
      "Website Perusahaan",
      "Landing Page",
      "E-commerce",
      "Aplikasi Web",
      "Company Profile",
      "Platform Digital",
    ],
  },

  contact: {
    kicker: "Kontak",
    titleLead: "Ceritakan apa yang ingin Anda",
    titleAccent: "kendalikan.",
    lede: "Mulailah dari masalah operasionalnya, bukan dari teknologinya. Kalau ternyata Anda tidak butuh sistem baru, kami akan mengatakannya.",
    points: [
      "Kami menelaah konteks operasionalnya sebelum mengusulkan apa pun.",
      "Sistem yang ada tetap di tempatnya — lingkup integrasi disepakati bersama Anda.",
      "Tanpa keterikatan, dan tanpa presentasi fitur yang tidak Anda minta.",
    ],
    fields: {
      name: "Nama",
      namePlaceholder: "Nama lengkap",
      company: "Perusahaan",
      companyPlaceholder: "Organisasi",
      position: "Jabatan",
      positionPlaceholder: "Peran",
      email: "Email",
      emailPlaceholder: "nama@perusahaan.com",
      phone: "Telepon / WhatsApp",
      phonePlaceholder: "+62 …",
      industry: "Industri",
      industryPlaceholder: "Pilih industri",
      systems: "Sistem yang sudah ada",
      systemsPlaceholder: "mis. IBM Maximo, SAP, aplikasi pengadaan internal",
      challenge: "Apa yang ingin Anda pantau, integrasikan, atau perbaiki?",
      challengePlaceholder:
        "Jelaskan tantangan operasionalnya — apa yang sulit terlihat saat ini, dan keputusan apa yang tertahan karenanya.",
      scope: "Perkiraan lingkup proyek",
      scopePlaceholder: "Pilih lingkup",
    },
    industries: [
      "Energi & Ketenagalistrikan",
      "Manufaktur",
      "Operasional Industri",
      "Logistik",
      "Konstruksi",
      "Teknik & Pemeliharaan",
      "Lainnya",
    ],
    scopes: [
      "Masih menjajaki",
      "Kebutuhan sudah jelas",
      "Proyek sudah dianggarkan",
      "Program berjalan",
    ],
    privacy: "Kami memakainya hanya untuk mempersiapkan diskusi.",
    submit: "Diskusikan Operasional Anda",
    sending: "Mengirim…",
    error:
      "Terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi, atau email kami langsung.",
    successTitle: "Pesan diterima.",
    successBody:
      "Terima kasih. Kami akan membaca konteks operasional yang Anda bagikan dan membalas dari alamat Nexgen. Kalau ada yang mendesak, balas saja email tersebut.",
  },

  footer: {
    tagline:
      "Dari data enterprise menuju kendali operasional. Kami membangun lapisan operasional antara sistem yang Anda jalankan dan keputusan yang Anda ambil.",
    columns: [
      {
        title: "Solusi",
        links: [
          { label: "Monitoring Operasional", href: "#capabilities" },
          { label: "Integrasi Sistem", href: "#integration" },
          { label: "Perencanaan & Kendali", href: "#capabilities" },
          { label: "Visibilitas Pengadaan", href: "#capabilities" },
        ],
      },
      {
        title: "Perusahaan",
        links: [
          { label: "Pendekatan Kami", href: "#approach" },
          { label: "Studi Kasus", href: "#case-study" },
          { label: "Industri", href: "#industries" },
          { label: "Kenapa Nexgen", href: "#why" },
        ],
      },
      {
        title: "Layanan Lain",
        links: [
          { label: "Website Perusahaan", href: "#digital" },
          { label: "Aplikasi Web", href: "#digital" },
          { label: "E-commerce", href: "#digital" },
          { label: "Platform Digital", href: "#digital" },
        ],
      },
    ],
    getInTouch: "Hubungi kami",
    cta: "Diskusikan Operasional Anda",
    rights: "Seluruh hak cipta dilindungi.",
    strapline: "Operational Intelligence & Sistem Digital",
  },
};
