import Layout from '../components/Layout.js';
import Auth from '../../utils/auth';

const WishlistView = {
  async render() {
    const user = Auth.getUser();
    let wishlist = [];
    try {
      wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch {
      wishlist = [];
    }
    // Guest (belum login)
    if (!user) {
      return await Layout.wrap(`
        <section class="py-5" style="min-height:80vh; background: #fce7f3;">
          <div class="container d-flex justify-content-center align-items-center" style="min-height:60vh;">
            <div class="card beauty-card p-5 text-center shadow-sm" style="max-width: 440px;">
              <div class="mb-4">
                <i class="bi bi-heart fs-1 text-muted"></i>
              </div>
              <h2 class="fw-bold mb-3">Akses Wishlist</h2>
              <p class="text-muted mb-4">Silakan login terlebih dahulu untuk melihat produk-produk favorit kamu</p>
              <div class="d-grid gap-2">
                <a href="/login" class="btn btn-pink rounded-5">Masuk</a>
                <a href="/register" class="btn btn-outline-pink rounded-5">Daftar</a>
              </div>
            </div>
          </div>
        </section>
      `);
    }

    // User login
    return await Layout.wrap(`
      <section class="py-5" style="min-height:80vh; margin-top:50px; background: #fce7f3;">
        <div class="container">
          <div class="text-center">
            <h1 class="display-5 fw-bold">Wishlist <span class="text-danger">Saya</span></h1>
            <p class="lead text-muted">Kumpulan produk kecantikan favorit kamu</p>
          </div>

          ${
            wishlist.length > 0
              ? `
            <div class="card beauty-card p-4 mb-4 d-flex flex-row justify-content-between align-items-center">
              <div><span class="fw-semibold">${wishlist.length}</span> produk di wishlist</div>
              <button id="clear-wishlist-btn" class="btn btn-link text-danger p-0"><i class="bi bi-trash"></i> Kosongkan Wishlist</button>
            </div>
            <div class="row g-4">
              ${wishlist
                .map(
                  (product) => `
                <div class="col-md-6 col-lg-4">
                  <div class="card beauty-card p-3 h-100 position-relative">
                    <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle remove-wishlist-btn" data-id="${
                      product.id
                    }" title="Hapus dari wishlist"><i class="bi bi-trash"></i></button>
                    <img src="${product.image}" alt="${
                    product.name
                  }" class="card-img-top rounded-3 mb-3" style="height:220px;object-fit:cover;">
                    <span class="position-absolute bottom-0 start-0 mb-3 ms-3 px-2 py-1 rounded-pill small ${
                      product.platform === 'shopee'
                        ? 'bg-warning text-dark'
                        : product.platform === 'sociolla'
                        ? 'bg-pink text-white'
                        : 'bg-dark text-white'
                    }">
                      ${
                        product.platform === 'shopee'
                          ? 'Shopee'
                          : product.platform === 'sociolla'
                          ? 'Sociolla'
                          : 'Zalora'
                      }
                    </span>
                    <div class="card-body p-0">
                      <div class="text-muted small mb-1">${product.brand}</div>
                      <h5 class="card-title fw-semibold mb-2">${product.name}</h5>
                      <div class="mb-2 d-flex align-items-center justify-content-between">
                        <span class="fw-bold text-danger fs-5">Rp ${product.price.toLocaleString(
                          'id-ID',
                        )}</span>
                        <span class="badge rounded-pill ${
                          product.skintoneMatch === 'warm'
                            ? 'bg-warning text-dark'
                            : product.skintoneMatch === 'cool'
                            ? 'bg-primary'
                            : product.skintoneMatch === 'neutral'
                            ? 'bg-success'
                            : 'bg-secondary'
                        }">
                          ${product.skintoneMatch === 'all' ? 'All' : product.skintoneMatch}
                        </span>
                      </div>
                      <p class="card-text small mb-2">${product.description}</p>
                      <a href="${
                        product.shopLink
                      }" target="_blank" rel="noopener" class="btn btn-pink w-100 mt-2 d-flex align-items-center justify-content-center gap-2">
                        <i class="bi bi-bag-heart"></i> Beli Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
            <div class="mt-5 card beauty-card p-4 text-center">
              <h5 class="fw-semibold mb-2">Total Nilai Wishlist</h5>
              <div class="fs-2 fw-bold text-danger mb-2">Rp ${wishlist
                .reduce((total, p) => total + (p.price || 0), 0)
                .toLocaleString('id-ID')}</div>
              <div class="text-muted">${wishlist.length} produk dalam wishlist kamu</div>
            </div>
          `
              : `
            <div class="text-center py-5">
              <div class="card beauty-card p-5 mx-auto" style="max-width: 440px;">
                <div class="mb-4">
                  <i class="bi bi-heart fs-1 text-muted"></i>
                </div>
                <h2 class="fw-bold mb-3">Wishlist Masih Kosong</h2>
                <p class="text-muted mb-4">Mulai tambahkan produk kecantikan favorit kamu ke wishlist untuk mudah diakses nanti</p>
                <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <a href="/classification" class="btn btn-outline-pink d-flex align-items-center gap-2"><i class="bi bi-stars"></i> Cek Skintone Dulu</a>
                  <a href="/products" class="btn btn-pink d-flex align-items-center gap-2"><i class="bi bi-bag-heart"></i> Jelajahi Produk</a>
                </div>
              </div>
            </div>
          `
          }
        </div>
      </section>
    `);
  },
  async afterRender() {
    const user = Auth.getUser();
    if (!user) return;
    let wishlist = [];
    try {
      wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch {
      wishlist = [];
    }
    // Hapus produk dari wishlist
    document.querySelectorAll('.remove-wishlist-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        wishlist = wishlist.filter((p) => p.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        location.reload();
      });
    });
    // Kosongkan wishlist
    const clearBtn = document.getElementById('clear-wishlist-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Apakah kamu yakin ingin menghapus semua produk dari wishlist?')) {
          localStorage.setItem('wishlist', '[]');
          location.reload();
        }
      });
    }
  },
};

export default WishlistView;
