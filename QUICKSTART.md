# 🚀 Quick Start Guide - TrendScope

Panduan cepat untuk menjalankan TrendScope di komputer lokal.

---

## ⚡ 5 Menit Setup

### Step 1: Install Node.js
Download & install dari https://nodejs.org/ (pilih LTS version)

### Step 2: Download Project
```bash
# Clone atau download ZIP, lalu extract
```

### Step 3: Install Dependencies
```bash
cd trendscope
npm install
```

### Step 4: Run!
```bash
npm run dev
```

### Step 5: Open Browser
Buka **http://localhost:5173**

✅ **Done!** Aplikasi sudah berjalan.

---

## 🌐 Deploy Cepat

### Vercel (Paling Mudah)
```bash
npm install -g vercel
vercel
```
Ikuti instruksi di terminal, selesai!

### Netlify (Drag & Drop)
1. `npm run build`
2. Buka https://app.netlify.com/drop
3. Drag folder `dist/` ke browser
4. Done!

---

## 📱 Fitur yang Bisa Dicoba

| Fitur | Cara Akses |
|-------|-----------|
| Filter Kategori | Sidebar kiri → dropdown Kategori |
| Filter Marketplace | Sidebar kiri → tombol marketplace |
| Filter Harga | Sidebar kiri → dropdown Rentang Harga |
| Periode Prediksi | Sidebar kiri → tombol periode |
| Detail Produk | Klik kartu produk |
| Rekomendasi AI | Section "Rekomendasi Untuk Anda" |
| Sales Page | Tombol "📣 Kenalan Dulu" di header |
| Pause/Resume Live | Tombol "LIVE" di header |
| Refresh Data | Tombol "Refresh" di header |

---

## ❓ Masalah Umum

**Port sudah dipakai?**
```bash
npm run dev -- --port 3000
```

**Dependencies error?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build gagal?**
```bash
rm -rf dist
npm run build
```

---

## 📚 Dokumentasi Lengkap

Lihat [README.md](./README.md) untuk dokumentasi lengkap.

---

**Happy Coding! 🎉**
