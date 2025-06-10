import Layout from "../components/Layout.js";
import Auth from '../../utils/auth';

const ProductView = {
  async render() {
  const user = Auth.getUser(); // ambil dari localStorage

  const view = await Layout.wrap(`
    <section class="py-5">
      <div class="container">
        ${!user ? this.renderGuestAccess() : '<div id="produk-list-view"></div>'}
      </div>
    </section>
  `);

  return view;
  },

  renderGuestAccess() {
    return `
      <div class="py-4 d-flex justify-content-center">
        <div class="card rounded-4 text-center shadow-sm" style="max-width: 440px;">
          <div class="card-body mt-4 mb-4">
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
      </div>
    `;

  },

  async afterRender() {
    const user = Auth.getUser();
    if (!user) return;

    // Jika user login, panggil presenter
    const presenter = new ProductPresenter({ user });
    presenter.init();
  }
};

export default ProductView;
