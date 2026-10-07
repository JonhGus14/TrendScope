# 📊 TrendScope - Marketplace Trend Analyzer

Aplikasi real-time untuk menganalisis tren produk marketplace dengan prediksi AI, filter berdasarkan kategori & harga, serta margin kesalahan prediksi.

![TrendScope](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Fitur Utama

### 🎯 Dashboard Real-time
- **Live Data Updates** - Data otomatis update setiap 3 detik
- **100+ Produk** dari 10 kategori berbeda
- **5 Marketplace** - Tokopedia, Shopee, Lazada, Bukalapak, TikTok Shop
- **Grafik Tren** - Visualisasi trend setiap produk

### 🔍 Filter & Pencarian
- **Filter Kategori** - 10 kategori (Elektronik, Fashion, Kecantikan, dll)
- **Filter Marketplace** - Pilih marketplace spesifik
- **Filter Harga** - 6 rentang harga (dari < Rp 50.000 sampai > Rp 2.000.000)
- **Periode Prediksi** - 3 Hari, 7 Hari, 30 Hari, 3 Bulan, 1 Tahun

### 🤖 Smart Recommendations
- **🔥 HOT PICK** - Produk paling laris
- **🚀 RISING STAR** - Produk baru naik daun
- **⭐ BEST VALUE** - Harga terjangkau, margin besar
- **🛡️ SAFE BET** - Stabil, aman jangka panjang
- **🎯 OPPORTUNITY** - Prediksi naik tinggi

### 📈 Analisis Prediksi
- **AI Prediction** - Prediksi tren 3 hari - 1 tahun
- **Error Margin** - Margin kesalahan transparan (3-7 hari, 30 hari, 90 hari-1 tahun)
- **Confidence Score** - Tingkat keyakinan prediksi
- **Faktor Akurasi** - Penjelasan faktor yang mempengaruhi akurasi

### 📝 Sales Page
- Framework copywriting lengkap: **Hook → Masalah → Solusi → Kepercayaan → CTA**
- Responsive design
- Animasi smooth

---

## 🚀 Cara Install & Menjalankan

### 📋 Persyaratan Sistem

Sebelum memulai, pastikan Anda sudah menginstall:

- **Node.js** versi 18.0.0 atau lebih baru
- **npm** versi 9.0.0 atau lebih baru (atau yarn/pnpm)

**Cek versi Node.js:**
```bash
node --version
```

**Cek versi npm:**
```bash
npm --version
```

Jika belum install, download di: https://nodejs.org/

---

### 📥 Langkah 1: Download Project

**Opsi A: Download ZIP**
1. Klik tombol "Code" → "Download ZIP"
2. Extract file ZIP ke folder yang Anda inginkan

**Opsi B: Clone dengan Git**
```bash
git clone <repository-url>
cd trendscope
```

**Opsi C: Copy Manual**
1. Copy semua file dari environment Qwen AI
2. Paste ke folder baru di komputer Anda

---

### 📦 Langkah 2: Install Dependencies

Buka terminal/command prompt di folder project, lalu jalankan:

```bash
npm install
```

Tunggu hingga semua dependencies terinstall (biasanya 1-3 menit tergantung koneksi internet).

**Jika menggunakan yarn:**
```bash
yarn install
```

**Jika menggunakan pnpm:**
```bash
pnpm install
```

---

### 💻 Langkah 3: Jalankan Development Server

```bash
npm run dev
```

Anda akan melihat output seperti ini:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Buka browser dan akses: **http://localhost:5173**

---

### 🏗️ Langkah 4: Build untuk Production

Untuk membuat versi production yang optimized:

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

**Preview hasil build:**
```bash
npm run preview
```

---

## 🌐 Cara Deploy

### 🚀 Deploy ke Vercel (Recommended)

**Opsi 1: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel
```

**Opsi 2: Via GitHub**
1. Push code ke GitHub
2. Buka https://vercel.com
3. Import repository
4. Klik "Deploy"

**Opsi 3: Via Vercel Dashboard**
1. Buka https://vercel.com/new
2. Upload folder project
3. Klik "Deploy"

---

### 🌐 Deploy ke Netlify

**Opsi 1: Via Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Opsi 2: Drag & Drop**
1. Build project: `npm run build`
2. Buka https://app.netlify.com/drop
3. Drag folder `dist/` ke browser
4. Done!

**Opsi 3: Via GitHub**
1. Push code ke GitHub
2. Buka https://app.netlify.com
3. Connect to GitHub
4. Pilih repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Klik "Deploy site"

---

### 📦 Deploy ke GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Tambahkan di `package.json`:
```json
{
  "homepage": "https://username.github.io/trendscope",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

### ☁️ Deploy ke Cloudflare Pages

1. Build project: `npm run build`
2. Buka https://pages.cloudflare.com
3. Create a project
4. Connect to Git repository
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy!

---

## 📁 Struktur Folder

```
trendscope/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── FilterPanel.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── StatsOverview.tsx
│   │   ├── SmartRecommendations.tsx
│   │   └── SalesPage.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   ├── types.ts           # TypeScript types
│   └── data.ts            # Data generation & utilities
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── README.md              # This file
```

---

## 🛠️ Teknologi yang Digunakan

- **React 18.2.0** - UI library
- **TypeScript 5.0** - Type safety
- **Vite 5.0** - Build tool & dev server
- **Tailwind CSS 4.0** - Styling
- **Recharts 2.10** - Charts & graphs
- **Lucide React** - Icons

---

## 📖 Cara Menggunakan Aplikasi

### 1. Dashboard Utama
- Lihat statistik overview di bagian atas
- Scroll untuk melihat rekomendasi produk
- Lihat semua produk di bagian bawah

### 2. Filter Produk
- **Kategori**: Pilih dari 10 kategori yang tersedia
- **Marketplace**: Filter berdasarkan platform marketplace
- **Harga**: Atur rentang harga sesuai budget
- **Periode Prediksi**: Pilih 3 Hari sampai 1 Tahun
- **Search**: Cari produk berdasarkan nama atau kategori

### 3. Lihat Detail Produk
- Klik kartu produk untuk melihat detail lengkap
- Lihat grafik tren historis & prediksi
- Analisis margin kesalahan
- Baca rekomendasi AI

### 4. Mode Live
- Klik tombol "LIVE" di header untuk pause/resume update
- Data otomatis update setiap 3 detik saat mode LIVE aktif

### 5. Sales Page
- Klik tombol "📣 Kenalan Dulu" di header
- Lihat penjelasan lengkap fitur aplikasi
- Framework copywriting untuk konversi

---

## 🔧 Troubleshooting

### ❌ Error: "Cannot read properties of null (reading 'useRef')"

**Solusi:**
Pastikan semua komponen sudah mengimport React:
```typescript
import React from 'react';
```

### ❌ Error: "Module not found"

**Solusi:**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: "Port already in use"

**Solusi:**
```bash
# Gunakan port lain
npm run dev -- --port 3000
```

### ❌ Build gagal

**Solusi:**
```bash
# Clear cache dan build ulang
rm -rf dist
npm run build
```

### ❌ TypeScript errors

**Solusi:**
```bash
# Check TypeScript
npm run typecheck
```

---

## 📝 Scripts yang Tersedia

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck
```

---

## 🎨 Customization

### Mengubah Warna Tema

Edit file `src/index.css`:
```css
:root {
  --primary-color: #10b981; /* emerald */
  --secondary-color: #8b5cf6; /* purple */
}
```

### Menambah Kategori Baru

Edit file `src/types.ts`:
```typescript
export type Category = 
  | 'Semua Kategori'
  | 'Elektronik'
  // Tambah kategori baru di sini
  | 'Kategori Baru';
```

### Mengubah Data Produk

Edit file `src/data.ts`:
```typescript
const productNames: Record<string, string[]> = {
  'Elektronik': ['Produk 1', 'Produk 2', ...],
  // Tambah/edit produk di sini
};
```

---

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 License

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.

---

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk Indonesian Sellers

**Features:**
- ✅ Real-time data updates
- ✅ AI-powered predictions
- ✅ Smart recommendations
- ✅ Error margin transparency
- ✅ Responsive design
- ✅ Sales page with copywriting framework

---

## 📞 Support

Jika ada pertanyaan atau masalah:
- Buka issue di GitHub
- Hubungi developer

---

## 🙏 Acknowledgments

- React Team
- Vite Team
- Tailwind CSS Team
- Recharts Team
- Lucide Icons
- Semua contributor

---

**Selamat menggunakan TrendScope! 🚀**
