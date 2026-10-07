# 📥 Cara Download File Project

## 🎯 Metode 1: Download ZIP (Paling Mudah)

### Jika Platform Mendukung Download:
1. Cari tombol **"Download"** atau **"Export"** di interface Qwen AI
2. Klik tombol tersebut
3. File ZIP akan terdownload otomatis
4. Extract file ZIP ke folder yang diinginkan
5. Lanjut ke panduan di `QUICKSTART.md`

---

## 📋 Metode 2: Copy-Paste Manual

### Langkah-langkah:

**1. Buat folder baru di komputer:**
```bash
mkdir trendscope
cd trendscope
```

**2. Copy file-file berikut satu per satu:**

### File Root:
- `index.html`
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `.gitignore`
- `README.md`
- `QUICKSTART.md`

### Folder `src/`:
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `src/types.ts`
- `src/data.ts`

### Folder `src/components/`:
- `src/components/FilterPanel.tsx`
- `src/components/ProductCard.tsx`
- `src/components/ProductDetail.tsx`
- `src/components/StatsOverview.tsx`
- `src/components/SmartRecommendations.tsx`
- `src/components/SalesPage.tsx`

**3. Cara copy setiap file:**
- Klik nama file di file explorer Qwen AI
- Copy semua isi file (Ctrl+A, Ctrl+C)
- Buat file baru di komputer dengan nama yang sama
- Paste isi file (Ctrl+V)
- Save

---

## 🚀 Metode 3: Gunakan Git (Recommended untuk Developer)

### Jika Project Sudah di GitHub:

**1. Clone repository:**
```bash
git clone <repository-url>
cd trendscope
```

**2. Install dependencies:**
```bash
npm install
```

**3. Jalankan:**
```bash
npm run dev
```

### Jika Belum di GitHub:

**1. Buat repository baru di GitHub:**
- Buka https://github.com/new
- Nama repository: `trendscope`
- Klik "Create repository"

**2. Push code dari Qwen AI ke GitHub:**
```bash
# Di folder project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/trendscope.git
git push -u origin main
```

**3. Clone di komputer lokal:**
```bash
git clone https://github.com/username/trendscope.git
cd trendscope
npm install
npm run dev
```

---

## 💾 Metode 4: Gunakan Terminal/Command Line

### Untuk Linux/Mac:

**1. Buat script download otomatis:**
```bash
#!/bin/bash

# Buat struktur folder
mkdir -p trendscope/src/components

# Download file-file (sesuaikan URL dengan platform)
# Contoh jika ada API endpoint:
# curl -o trendscope/package.json "URL_PACKAGE_JSON"
# curl -o trendscope/src/App.tsx "URL_APP_TSX"
# ... dst

echo "Download selesai!"
cd trendscope
npm install
npm run dev
```

### Untuk Windows (PowerShell):

```powershell
# Buat struktur folder
New-Item -ItemType Directory -Force -Path trendscope\src\components

# Download file (sesuaikan URL)
# Invoke-WebRequest -Uri "URL" -OutFile "trendscope\package.json"
# ... dst

Write-Host "Download selesai!"
cd trendscope
npm install
npm run dev
```

---

## 📦 Metode 5: Bundle Semua File ke Satu File

Saya sudah buatkan script untuk bundle semua file:

### Cara Menggunakan:

**1. Jalankan script bundle:**
```bash
# Di folder project Qwen AI
node bundle-project.js
```

**2. File `project-bundle.txt` akan terbuat**

**3. Copy isi file tersebut ke komputer lokal**

**4. Jalankan script unbundle:**
```bash
# Di komputer lokal
node unbundle.js
```

**5. Project akan ter-extract otomatis!**

---

## 🔍 Metode 6: Lihat Isi File di Browser

### Untuk Melihat Isi File:

1. Klik nama file di file explorer
2. Isi file akan tampil di panel kanan
3. Select all (Ctrl+A)
4. Copy (Ctrl+C)
5. Paste ke file baru di komputer

### File yang Perlu Di-copy (Total: 13 file):

**Root (7 files):**
1. `index.html`
2. `package.json`
3. `tsconfig.json`
4. `vite.config.ts`
5. `.gitignore`
6. `README.md`
7. `QUICKSTART.md`

**Source (6 files):**
8. `src/App.tsx`
9. `src/main.tsx`
10. `src/index.css`
11. `src/types.ts`
12. `src/data.ts`

**Components (6 files):**
13. `src/components/FilterPanel.tsx`
14. `src/components/ProductCard.tsx`
15. `src/components/ProductDetail.tsx`
16. `src/components/StatsOverview.tsx`
17. `src/components/SmartRecommendations.tsx`
18. `src/components/SalesPage.tsx`

---

## ⚡ Setelah Download

### Langkah Selanjutnya:

```bash
# 1. Masuk ke folder project
cd trendscope

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser
# http://localhost:5173
```

### Jika Ada Error:

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force

# Build ulang
npm run build
```

---

## 🆘 Butuh Bantuan?

### Cek Dokumentasi:
- `README.md` - Panduan lengkap
- `QUICKSTART.md` - Panduan cepat 5 menit

### Troubleshooting Umum:

**Error: "Cannot find module"**
```bash
npm install
```

**Error: "Port already in use"**
```bash
npm run dev -- --port 3000
```

**Error: "Build failed"**
```bash
rm -rf dist
npm run build
```

---

## 📊 Checklist Download

Centang setelah selesai copy:

- [ ] `index.html`
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `vite.config.ts`
- [ ] `.gitignore`
- [ ] `README.md`
- [ ] `QUICKSTART.md`
- [ ] `src/App.tsx`
- [ ] `src/main.tsx`
- [ ] `src/index.css`
- [ ] `src/types.ts`
- [ ] `src/data.ts`
- [ ] `src/components/FilterPanel.tsx`
- [ ] `src/components/ProductCard.tsx`
- [ ] `src/components/ProductDetail.tsx`
- [ ] `src/components/StatsOverview.tsx`
- [ ] `src/components/SmartRecommendations.tsx`
- [ ] `src/components/SalesPage.tsx`

**Total: 18 file**

---

## ✅ Verifikasi Download

Setelah semua file di-copy, cek:

```bash
# Lihat struktur folder
tree /F  # Windows
tree     # Linux/Mac

# Atau gunakan ls
ls -R
```

**Struktur yang benar:**
```
trendscope/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── README.md
├── QUICKSTART.md
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── types.ts
    ├── data.ts
    └── components/
        ├── FilterPanel.tsx
        ├── ProductCard.tsx
        ├── ProductDetail.tsx
        ├── StatsOverview.tsx
        ├── SmartRecommendations.tsx
        └── SalesPage.tsx
```

---

**Selamat! Project sudah siap dijalankan! 🚀**

Lanjut ke `QUICKSTART.md` untuk cara menjalankan.
