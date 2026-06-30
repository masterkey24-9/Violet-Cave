# Violet Cave — Warung Makan

Website pemesanan makanan untuk warung "Violet Cave". Dibangun dengan React + Vite, tanpa backend server — semua data (akun, stok, pesanan) disimpan di browser (`localStorage`). Checkout dilakukan via WhatsApp.

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Login Admin

- Nomor HP: `admin`
- Kata sandi: `admin123`

Akun pelanggan dibuat sendiri lewat halaman Daftar.

## Cara Deploy ke Vercel (gratis)

1. Push folder ini ke repository GitHub (lihat langkah di bawah jika belum punya).
2. Buka https://vercel.com, login/daftar pakai akun GitHub.
3. Klik **Add New Project**, pilih repo project ini.
4. Vercel otomatis mendeteksi ini project Vite — biarkan setting default (`npm run build`, output folder `dist`).
5. Klik **Deploy**. Tunggu sampai selesai, lalu situs sudah online.

## Cara Deploy ke Netlify (alternatif)

1. Push ke GitHub seperti di atas.
2. Buka https://app.netlify.com, login, klik **Add new site → Import an existing project**.
3. Pilih repo-nya. Build command: `npm run build`, publish directory: `dist`.
4. Klik **Deploy site**.

## Cara push ke GitHub (kalau belum)

```bash
git init
git add .
git commit -m "Initial commit - Violet Cave"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Mengganti nomor WhatsApp tujuan pesanan

Buka `src/pages/OrderConfirmationPage.jsx`, ubah nilai `WHATSAPP_NUMBER` (format: kode negara tanpa tanda + atau 0, contoh `6281234567890`).

## Mengubah menu & harga

Edit file `src/data/menuData.js`.

## Catatan penting

Karena tidak memakai server/database, data pengguna dan pesanan tersimpan **per browser/perangkat** (localStorage). Jika dibuka dari HP atau browser berbeda, datanya tidak akan sama. Untuk skala bisnis yang lebih besar dan data yang konsisten di semua perangkat, project ini bisa dikembangkan lagi memakai backend seperti Supabase atau Firebase.
