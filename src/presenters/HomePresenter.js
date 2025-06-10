const HomePresenter = {
  async init() {
    // Simulasi: ambil data user dari localStorage/session atau dummy
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const isLoggedIn = !!user;

    const features = [
      {
        icon: "bi bi-camera",
        title: "Analisis Undertone AI",
        description: "Upload foto wajah dan dapatkan analisis undertone kulit yang akurat dengan teknologi AI"
      },
      {
        icon: "bi bi-palette",
        title: "Color Palette Personal",
        description: "Rekomendasi warna yang sesuai dengan undertone kulit kamu"
      },
      {
        icon: "bi bi-bag-heart",
        title: "Rekomendasi Produk",
        description: "Temukan produk dari brand ternama yang cocok untuk kamu"
      },
      {
        icon: "bi bi-lightbulb",
        title: "Tips & Artikel",
        description: "Pelajari tips kecantikan dari para ahli beauty"
      }
    ];

    const testimonials = [
      {
        name: "Dewi Sartika",
        location: "Jakarta",
        rating: 5,
        comment: "Akhirnya aku tau undertone kulitku! Rekomendasi lipstiknya cocok banget.",
        undertone: "warm"
      },
      {
        name: "Putri Maharani", 
        location: "Bandung",
        rating: 5,
        comment: "Sekarang aku lebih percaya diri memilih warna outfit dan makeup.",
        undertone: "cool"
      },
      {
        name: "Sari Indah",
        location: "Surabaya", 
        rating: 5,
        comment: "Hasilnya akurat banget! Produk yang direkomendasikan semuanya cocok.",
        undertone: "neutral"
      }
    ];

    return { isLoggedIn, user, features, testimonials };
  }
};

export default HomePresenter;
