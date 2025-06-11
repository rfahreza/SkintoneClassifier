# 🎨 SkintoneClassifier: Analisis Skintone Kulit Berbasis AI

**SkintoneClassifier** adalah aplikasi web berbasis AI yang menganalisis Skintone kulit pengguna dari foto wajah dan memberikan **rekomendasi palet warna serta tips makeup/fashion** yang sesuai.

## ✨ Fitur Utama

- 📷 **Analisis Skintone Kulit**  
  Unggah foto wajah Anda dan dapatkan klasifikasi Skintone (Fair, Medium, atau Dark) beserta tingkat kepercayaan.

- 🎨 **Rekomendasi Palet Warna**  
  Dapatkan palet warna primer, sekunder, dan aksen yang sesuai dengan Skintone Anda.

- 💄 **Tips Makeup & Fashion**  
  Saran personalisasi untuk memilih foundation, warna makeup, dan gaya fashion yang menonjolkan Skintone Anda.

- 📸 **Akses Kamera Instan**  
  Ambil foto langsung dari kamera browser Anda untuk analisis cepat.

- 📱 **Antarmuka Responsif**  
  Tampilan modern, responsif, dan ramah pengguna untuk semua ukuran layar.

## 💻 Persyaratan Sistem

- **Python** 3.8+
- **Node.js** 14+
- **pip**
- **npm** atau **Yarn**
- **Git**

## 🚀 Panduan Instalasi & Penggunaan

### 1. Kloning Repositori

git clone https://github.com/rfahreza/SkintoneClassifier.git cd SkintoneClassifier

### 2. Instalasi Backend

```bash
cd backend
python -m venv .venv         # Buat virtual environment

# Aktifkan environment:
# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
source ./.venv/bin/activate

pip install -r requirements.txt
cd ..
```

### 3. Instalasi Frontend

```bash
npm install
# atau
yarn install
```

### 4. Menjalankan Aplikasi

#### ▶ Menjalankan Backend (Flask)

```bash
# Aktifkan virtual environment:
# Windows:
.\backend\.venv\Scripts\activate
# macOS/Linux:
source ./backend/.venv/bin/activate

python ./backend/app.py
```

Backend berjalan di: [http://127.0.0.1:5050](http://127.0.0.1:5050)

#### ▶ Menjalankan Frontend

```bash
npm start
# atau
yarn start
```

Atau buka `public/index.html` menggunakan ekstensi **Live Server** di VS Code.

## 🧠 Tentang Model AI

Model `best_model.keras` adalah model klasifikasi gambar berbasis **TensorFlow/Keras** yang dirancang untuk mengenali karakteristik visual wajah terkait Skintone.

> ⚠️ Untuk hasil terbaik:

- Gunakan gambar dengan pencahayaan yang baik.
- Hindari makeup berlebihan.
- Ambil gambar dari depan (frontal).
