import Layout from "../components/Layout.js";
import Auth from "../../utils/auth";
import ProductPresenter from "../../presenters/ProductPresenter.js";

const ProductView = {
  async render() {
    const user = Auth.getUser();

    const products = [
  // CUSHION
  {
    id: "1",
    name: "Colorfit Cushion 11C Pink Fair",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/11c-pink-fair.jpg",
    category: "chusion",
    skintoneMatch: "fair",
    platform: "shopee"
  },
  {
    id: "2",
    name: "Colorfit Cushion 22N Light Ivory",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/22n-light-ivory.jpg",
    category: "chusion",
    skintoneMatch: "fair",
    platform: "shopee"
  },
  {
    id: "4",
    name: "Colorfit Cushion 32N Neutral Beige",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/32n-neutral-beige.jpg",
    category: "chusion",
    skintoneMatch: "medium",
    platform: "shopee"
  },
  {
    id: "5",
    name: "Colorfit Cushion 33W Olive Beige",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/33w-olive-beige.jpg",
    category: "chusion",
    skintoneMatch: "medium",
    platform: "shopee"
  },
  {
    id: "6",
    name: "Colorfit Cushion 42N Neutral Sand",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/42n-neutral-sand.jpg",
    category: "chusion",
    skintoneMatch: "medium",
    platform: "shopee"
  },
  {
    id: "7",
    name: "Colorfit Cushion 43W Golden Sand",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/43w-golden-sand.jpg",
    category: "chusion",
    skintoneMatch: "dark",
    platform: "shopee"
  },
  {
    id: "8",
    name: "Colorfit Cushion 52N Almond",
    brand: "Wardah",
    price: 122550,
    image: "/img/chusion/52n-almond.jpg",
    category: "chusion",
    skintoneMatch: "dark",
    platform: "shopee"
  },

  // CREAM BLUSH
  {
    id: "9",
    name: "Colorfit Cream Blush 01 Sand Coral",
    brand: "Wardah",
    price: 47520,
    image: "/img/cream-blush/01-sand-coral.jpg",
    category: "cream-blush",
    skintoneMatch: "fair",
    platform: "shopee"
  },
  {
    id: "10",
    name: "Colorfit Cream Blush 02 Merry Mauve",
    brand: "Wardah",
    price: 47520,
    image: "/img/cream-blush/02-merry-mauve.jpg",
    category: "cream-blush",
    skintoneMatch: "medium",
    platform: "shopee"
  },
  {
    id: "11",
    name: "Colorfit Cream Blush 03 Summer Peach",
    brand: "Wardah",
    price: 47520,
    image: "/img/cream-blush/03-summer-peach.jpg",
    category: "cream-blush",
    skintoneMatch: "fair",
    platform: "shopee"
  },
  {
    id: "13",
    name: "Colorfit Cream Blush 05 Peachful Plum",
    brand: "Wardah",
    price: 47520,
    image: "/img/cream-blush/05-peachful-plum.jpg",
    category: "cream-blush",
    skintoneMatch: "medium",
    platform: "shopee"
  },

  // LIP GLASTING
  {
    id: "15",
    name: "Liquid Lip Glasting 01 Caramel Coat",
    brand: "Wardah",
    price: 90210,
    image: "/img/lip-glasting/01-caramel-coat.jpg",
    category: "lip-glasting",
    skintoneMatch: "fair",
    platform: "shopee"
  },


    ];

    this._platforms = {
      shopee: { name: "Shopee", color: "bg-warning text-dark" },
      sociolla: { name: "Sociolla", color: "bg-pink text-white" },
      zalora: { name: "Zalora", color: "bg-dark text-white" },
    };

    if (!user) {
    return await Layout.wrap(`
      <section class="py-5" style="background: #fce7f3;">
        <div class="container d-flex justify-content-center align-items-center" style="min-height:60vh;padding-top:80px;">
          <div class="card rounded-4 text-center shadow-sm p-4" style="max-width: 440px;">
            <div class="mb-3">
              <i class="bi bi-box-arrow-in-right fs-1 text-pink"></i>
            </div>
            <h5 class="card-title mb-3">Akses <span class="text-danger">Terbatas</span></h5>
            <p class="card-text">
              Silakan login terlebih dahulu untuk melihat rekomendasi produk kecantikan yang sesuai dengan skintone kulitmu.
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

  // if (!user.skintoneResult) {
  //   return await Layout.wrap(`
  //     <section class="py-5" style="background: #fce7f3;">
  //       <div class="container d-flex justify-content-center align-items-center" style="min-height:60vh;padding-top:80px;">
  //         <div class="card rounded-4 text-center shadow-sm p-4" style="max-width: 440px;">
  //           <div class="mb-3">
  //             <i class="bi bi-stars fs-1 text-pink"></i>
  //           </div>
  //           <h5 class="card-title mb-3">Analisis Skintone Diperlukan</h5>
  //           <p class="card-text">
  //             Lakukan analisis skintone terlebih dahulu untuk mendapatkan rekomendasi produk yang sesuai dengan kulitmu.
  //           </p>
  //           <div class="d-grid gap-2 mt-4">
  //             <a href="/classification" class="btn btn-pink rounded-5 d-flex justify-content-center align-items-center gap-2 px-4 py-2 fw-semibold">Analisis Skintone</a>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   `);
  // }

    // Filter produk berdasarkan skintone user jika ada
    let filteredProducts = products;
    if (user.skintoneResult) {
      filteredProducts = products.filter(
        (p) =>
          p.skintoneMatch === user.skintoneResult.type ||
          p.skintoneMatch === "all"
      );
    }

    // Section utama
    const view = await Layout.wrap(`
      <section class="py-5" style="margin-top:50px;background: #fce7f3;">
        <div class="container">
          <div class="text-center mb-5">
            <h1 class="display-5 fw-bold">Rekomendasi Produk <span class="text-danger">Kecantikan</span></h1>
            <p class="lead mb-3">Temukan produk makeup terbaik yang cocok dengan skintone kulitmu</p>
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
        </div>
      </section>
    `);

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
          <img src="${product.image}" alt="${product.name}" class="card-img-top rounded-3" style="height:220px;object-fit:cover;">
          <span class="position-absolute bottom-0 start-0 mb-2 ms-2 px-2 py-1 rounded-pill small ${
            platforms[product.platform]?.color || "bg-secondary"
          }">
            ${platforms[product.platform]?.name || product.platform}
          </span>
        </div>
        <div class="card-body d-flex flex-column">
          <div>
            <div class="text-muted small mb-1">${product.brand}</div>
            <h5 class="card-title fw-semibold mb-2">${product.name}</h5>
            <div class="mb-2">
              <span class="fw-bold text-danger fs-5">Rp ${product.price.toLocaleString("id-ID")}</span>
            </div>
            <span class="badge rounded-pill mb-2 ${
              product.skintoneMatch === "fair"
                ? "bg-light text-dark border"
                : product.skintoneMatch === "medium"
                ? "bg-warning text-dark"
                : product.skintoneMatch === "dark"
                ? "bg-dark text-white"
                : "bg-secondary"
            }">
              ${product.skintoneMatch}
            </span>
          </div>
          <div class="mt-auto d-flex gap-2">
            <a href="#" class="btn btn-pink flex-grow-1 d-flex align-items-center justify-content-center gap-2 disabled">
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
      if (user.skintoneResult) {
        filtered = filtered.filter(
          (p) =>
            p.skintoneMatch === user.skintoneResult.type ||
            p.skintoneMatch === "all"
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
