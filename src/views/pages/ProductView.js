import Layout from "../components/Layout.js";
import Auth from "../../utils/auth";
import ProductPresenter from "../../presenters/ProductPresenter.js";

const ProductView = {
  async render() {
    const user = Auth.getUser();

    // Data produk dummy (bisa ambil dari presenter jika sudah ada)
    const products = [
      {
        id: "1",
        name: "Perfect Match Foundation",
        brand: "Maybelline",
        price: 129000,
        originalPrice: 159000,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
        category: "foundation",
        undertoneMatch: "warm",
        shopLink: "https://shopee.co.id",
        platform: "shopee",
        rating: 4.8,
        reviewCount: 2341,
        description:
          "Foundation dengan coverage penuh yang tahan hingga 24 jam",
        features: [
          "SPF 20",
          "Oil-free",
          "Non-comedogenic",
          "Buildable coverage",
        ],
      },
      {
        id: "2",
        name: "Velvet Matte Lipstick",
        brand: "Wardah",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
        category: "lipstick",
        undertoneMatch: "cool",
        shopLink: "https://sociolla.com",
        platform: "sociolla",
        rating: 4.6,
        reviewCount: 1876,
        description: "Lipstik matte dengan formula lembut dan tahan lama",
        features: [
          "Long-lasting",
          "Vitamin E",
          "Halal certified",
          "Cruelty-free",
        ],
      },
      {
        id: "3",
        name: "Glow Blush Palette",
        brand: "Pixy",
        price: 89000,
        originalPrice: 110000,
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        category: "blush",
        undertoneMatch: "neutral",
        shopLink: "https://zalora.co.id",
        platform: "zalora",
        rating: 4.7,
        reviewCount: 954,
        description:
          "Palette blush dengan 4 shade yang cocok untuk berbagai undertone",
        features: ["4 shades", "Buildable", "Natural glow", "Travel-friendly"],
      },
      {
        id: "4",
        name: "Coral Sunset Lipstick",
        brand: "Emina",
        price: 35000,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
        category: "lipstick",
        undertoneMatch: "warm",
        shopLink: "https://shopee.co.id",
        platform: "shopee",
        rating: 4.5,
        reviewCount: 1234,
        description:
          "Lipstik dengan warna coral yang cocok untuk undertone warm",
        features: [
          "Moisturizing",
          "Natural finish",
          "Affordable",
          "Easy to apply",
        ],
      },
      {
        id: "5",
        name: "Rose Pink Blush",
        brand: "Make Over",
        price: 125000,
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        category: "blush",
        undertoneMatch: "cool",
        shopLink: "https://sociolla.com",
        platform: "sociolla",
        rating: 4.9,
        reviewCount: 567,
        description:
          "Blush dengan warna rose pink yang sempurna untuk cool undertone",
        features: [
          "Highly pigmented",
          "Blendable",
          "Long-wearing",
          "Professional quality",
        ],
      },
      {
        id: "6",
        name: "Natural Glow Foundation",
        brand: "Somethinc",
        price: 159000,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
        category: "foundation",
        undertoneMatch: "neutral",
        shopLink: "https://zalora.co.id",
        platform: "zalora",
        rating: 4.8,
        reviewCount: 890,
        description:
          "Foundation dengan hasil natural yang cocok untuk sehari-hari",
        features: [
          "Dewy finish",
          "Medium coverage",
          "Skincare benefits",
          "Eco-friendly",
        ],
      },
    ];

    this._platforms = {
      shopee: { name: "Shopee", color: "bg-warning text-dark" },
      sociolla: { name: "Sociolla", color: "bg-pink text-white" },
      zalora: { name: "Zalora", color: "bg-dark text-white" },
    };

    // Jika user belum login
    if (!user) {
      return await Layout.wrap(`
        <section class="py-5">
          <div class="container d-flex justify-content-center align-items-center" style="min-height:60vh;">
            <div class="card rounded-4 text-center shadow-sm p-4" style="max-width: 440px;">
              <div class="mb-3">
                <i class="bi bi-box-arrow-in-right fs-1 text-pink"></i>
              </div>
              <h5 class="card-title mb-3">Akses <span class="text-danger">Terbatas</span></h5>
              <p class="card-text">
                Silakan login terlebih dahulu untuk melihat rekomendasi produk kecantikan yang sesuai dengan undertone kulitmu.
              </p>
              <div class="d-grid gap-2 mt-4">
                <a href="/login" class="btn btn-outline-pink rounded-5 d-flex justify-content-center align-items-center gap-2 px-4 py-2 fw-semibold">Masuk</a>
                <a href="/register" class="btn btn-pink rounded-5 d-flex justify-content-center align-items-center gap-2 px-4 py-2 fw-semibold">Daftar Akun Baru</a>
              </div>
            </div>
          </div>
        </section>
      `);
    }

    // Filter produk berdasarkan undertone user jika ada
    let filteredProducts = products;
    if (user.undertoneResult) {
      filteredProducts = products.filter(
        (p) =>
          p.undertoneMatch === user.undertoneResult.type ||
          p.undertoneMatch === "all"
      );
    }

    // Section utama
    const view = await Layout.wrap(`
      <section class="py-5" style="margin-top:50px;background: #fce7f3;">
        <div class="container">
          <div class="text-center mb-5">
            <h1 class="display-5 fw-bold">Rekomendasi Produk <span class="text-danger">Kecantikan</span></h1>
            <p class="lead mb-3">Temukan produk makeup terbaik yang cocok dengan undertone kulitmu</p>
            ${
              user.undertoneResult
                ? `
              <div class="mt-3 d-inline-block bg-white rounded-pill px-4 py-2 border border-danger">
                <span class="small">Menampilkan produk untuk undertone: 
                  <span class="fw-semibold text-capitalize ${
                    user.undertoneResult.type === "warm"
                      ? "text-warning"
                      : user.undertoneResult.type === "cool"
                      ? "text-primary"
                      : "text-success"
                  }">
                    ${user.undertoneResult.type}
                  </span>
                </span>
              </div>
            `
                : ""
            }
          </div>
          <div class="card p-3 mb-4 shadow-sm" style="max-width: 480px; margin:0 auto;">
            <form id="search-form">
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-pink"></i></span>
                <input type="text" id="search-input" class="form-control border-start-0" placeholder="Cari produk atau brand...">
              </div>
            </form>
          </div>
          <div id="products-list" class="row g-4">
            <!-- Produk akan dirender di afterRender -->
          </div>
          ${
            user && !user.undertoneResult
              ? `
            <div class="mt-5 bg-gradient-pink rounded-4 p-5 text-center text-white">
              <h3 class="fw-bold mb-3">Dapatkan Rekomendasi yang Lebih Personal!</h3>
              <p class="mb-4">Lakukan analisis undertone terlebih dahulu untuk mendapatkan rekomendasi produk yang lebih tepat</p>
              <a href="/classification" class="btn btn-light text-danger fw-semibold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
                <i class="bi bi-stars"></i>
                Analisis Undertone Sekarang
              </a>
            </div>
          `
              : ""
          }
        </div>
      </section>
    `);

    // Simpan produk di instance untuk afterRender
    this._allProducts = products;
    this._filteredProducts = filteredProducts;

    return view;
  },

  async afterRender() {
    const user = Auth.getUser();
    if (!user) return;

    let products = this._filteredProducts;
    if (!products || products.length === 0) products = this._allProducts;
    const allProducts = this._allProducts || [];
    const platforms = this._platforms;

    const productsList = document.getElementById("products-list");
    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");

    function renderProducts(list) {
      if (!productsList) return;
      if (list.length === 0) {
        productsList.innerHTML = `
        <div class="col-12">
          <div class="text-center py-5">
            <div class="card p-4 mx-auto shadow-sm" style="max-width: 600px;">
              <i class="bi bi-search fs-1 text-muted mb-3"></i>
              <h5 class="fw-semibold mb-2">Produk Tidak Ditemukan</h5>
              <p class="text-muted mb-0">Coba ubah kata kunci pencarian untuk menemukan produk yang kamu cari</p>
            </div>
          </div>
        </div>
      `;
        return;
      }
      productsList.innerHTML = list
        .map(
          (product) => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm p-2">
          <div class="position-relative">
            <img src="${product.image}" alt="${
            product.name
          }" class="card-img-top rounded-3" style="height:220px;object-fit:cover;">
            ${
              product.originalPrice
                ? `
              <span class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 rounded-end small fw-semibold" style="font-size:0.85rem;">
                ${Math.round(
                  (1 - product.price / product.originalPrice) * 100
                )}% OFF
              </span>
            `
                : ""
            }
            <span class="position-absolute bottom-0 start-0 mb-2 ms-2 px-2 py-1 rounded-pill small ${
              platforms[product.platform].color
            }">
              ${platforms[product.platform].name}
            </span>
          </div>
          <div class="card-body d-flex flex-column">
            <div>
              <div class="text-muted small mb-1">${product.brand}</div>
              <h5 class="card-title fw-semibold mb-2">${product.name}</h5>
              <div class="mb-2">
                <span class="fw-bold text-danger fs-5">Rp ${product.price.toLocaleString(
                  "id-ID"
                )}</span>
                ${
                  product.originalPrice
                    ? `<span class="text-muted text-decoration-line-through ms-2">Rp ${product.originalPrice.toLocaleString(
                        "id-ID"
                      )}</span>`
                    : ""
                }
              </div>
              <span class="badge rounded-pill mb-2 ${
                product.undertoneMatch === "warm"
                  ? "bg-warning text-dark"
                  : product.undertoneMatch === "cool"
                  ? "bg-primary"
                  : product.undertoneMatch === "neutral"
                  ? "bg-success"
                  : "bg-secondary"
              }">
                ${product.undertoneMatch}
              </span>
              <div class="mb-2">
                <span class="text-warning">${"★".repeat(
                  Math.floor(product.rating)
                )}</span>
                <span class="text-muted small">(${product.reviewCount})</span>
              </div>
              <p class="card-text small mb-2">${product.description}</p>
              
            </div>
            <div class="mt-auto d-flex gap-2">
              <a href="${
                product.shopLink
              }" target="_blank" rel="noopener" class="btn btn-pink flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-bag-heart"></i> Beli Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    `
        )
        .join("");
    }

    renderProducts(products);

    // Search logic
    searchForm?.addEventListener("submit", (e) => e.preventDefault());
    searchInput?.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      let filtered = allProducts;
      if (user.undertoneResult) {
        filtered = filtered.filter(
          (p) =>
            p.undertoneMatch === user.undertoneResult.type ||
            p.undertoneMatch === "all"
        );
      }
      if (q) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
        );
      }
      renderProducts(filtered);
    });
  },
};

export default ProductView;
