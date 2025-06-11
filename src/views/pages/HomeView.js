import Layout from '../components/Layout.js';
import HomePresenter from '../../presenters/HomePresenter.js';

const HomeView = {
  async render() {
    const { isLoggedIn, user, features, testimonials } = await HomePresenter.init();

    const contentHtml = `
      <section class="py-4 text-center" style="background: #fce7f3;">
        <div class="container px-4 px-lg-5" style="max-width: 2200px;">
          <h1 class="display-4 fw-bold text-danger mb-2">
            Temukan Undertone<br> Kulitmu dengan AI
          </h1>
          <p class="lead mb-4">${
            isLoggedIn
              ? `Selamat datang kembali, <strong>${user.name}</strong>!`
              : 'Platform AI untuk menganalisis undertone kulit & menemukan produk kecantikan perfect untukmu.'
          }</p>

          ${
            isLoggedIn && user.undertoneResult
              ? `
            <div class="alert alert-info w-75 mx-auto mt-4">
              <strong>Undertone kamu:</strong> ${user.undertoneResult.type} 
              <br/>Confidence: ${user.undertoneResult.confidence}%
            </div>`
              : ''
          }

          <div class="d-flex justify-content-center gap-3 mt-4">
            <a href="/classification" class="btn btn-pink rounded-5 d-flex align-items-center gap-2 px-4 py-2 fw-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 20v-6M12 14l-3 3m3-3l3 3M4 7V4h16v3M4 7v13h16V7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Mulai Analisis Gratis
            </a>
            <a href="/products" class="btn btn-outline-pink rounded-5 d-flex align-items-center gap-2 px-4 py-2 fw-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-13z" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="21" r="1" fill="#ec4899"/><circle cx="18" cy="21" r="1" fill="#ec4899"/></svg>
              Lihat Produk
            </a>
          </div>
        </div>
      </section>

      <section class="py-5 bg-white border-top">
        <div class="container">
          <h2 class="text-center mb-4">Kenapa Memilih <span class="text-danger">Tonalytics?</span></h2>
          <div class="row">
            ${features
              .map(
                (f) => `
              <div class="col-md-6 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body text-center">
                    <div class="mb-3">
                      <i class="${f.icon || 'bi bi-stars'} fs-1 text-danger"></i>
                    </div>
                    <h5 class="card-title">${f.title}</h5>
                    <p class="card-text">${f.description}</p>
                  </div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="py-5 mb-5" style="background: #fce7f3;">
        <div class="container">
          <div class="text-center mb-4">
            <h2 class="fw-bold mb-3">
              Cara Kerja <span class="text-danger">Tonalytics</span>
            </h2>
            <p class="lead text-muted">
              Hanya 3 langkah mudah untuk menemukan undertone kulitmu
            </p>
          </div>

          <div class="row g-4">
            <!-- Step 1 -->
            <div class="col-md-4">
              <div class="card border-0 shadow text-center h-100 position-relative">
                <div class="mx-auto mt-4 bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                  <i class="bi bi-camera-fill text-white fs-4"></i>
                </div>
                <div class="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger">
                  1
                </div>
                <div class="card-body">
                  <h5 class="card-title fw-semibold">Upload Foto</h5>
                  <p class="card-text text-muted">Ambil foto wajah dengan pencahayaan natural yang baik</p>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="col-md-4">
              <div class="card border-0 shadow text-center h-100 position-relative">
                <div class="mx-auto mt-4 bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                  <i class="bi bi-stars text-white fs-4"></i>
                </div>
                <div class="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger">
                  2
                </div>
                <div class="card-body">
                  <h5 class="card-title fw-semibold">Analisis AI</h5>
                  <p class="card-text text-muted">AI kami akan menganalisis undertone kulit kamu secara akurat</p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="col-md-4">
              <div class="card border-0 shadow text-center h-100 position-relative">
                <div class="mx-auto mt-4 bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                  <i class="bi bi-heart-fill text-white fs-4"></i>
                </div>
                <div class="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger">
                  3
                </div>
                <div class="card-body">
                  <h5 class="card-title fw-semibold">Rekomendasi</h5>
                  <p class="card-text text-muted">Dapatkan rekomendasi produk dan color palette yang perfect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-4">Apa Kata Mereka?</h2>
          <div class="row">
            ${testimonials
              .map(
                (t) => `
              <div class="col-md-4 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <div class="text-warning mb-2">${'★'.repeat(t.rating)}</div>
                    <blockquote class="blockquote fst-italic">"${t.comment}"</blockquote>
                    <footer class="blockquote-footer mt-3">${t.name}, ${t.location}</footer>
                  </div>
                  <div class="card-footer text-end">
                    <span class="badge bg-${
                      t.undertone === 'warm'
                        ? 'warning'
                        : t.undertone === 'cool'
                        ? 'primary'
                        : 'success'
                    }">${t.undertone}</span>
                  </div>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </section>
      <!-- CTA Section -->
      <section class="py-5" style="background: linear-gradient(to right, #f43f5e, #ec4899);">
        <div class="container text-center text-white">
          <h2 class="fw-bold mb-4 fs-2">
            Siap Menemukan Undertone Kulitmu?
          </h2>
          <p class="lead text-light mb-4">
            Bergabung dengan ribuan wanita Indonesia yang sudah menemukan produk kecantikan perfect untuk mereka
          </p>
          <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <a href="/classification" class="btn btn-light text-danger fw-medium px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
              <i class="bi bi-camera-fill"></i>
              <span>Mulai Sekarang - Gratis!</span>
            </a>
          </div>
        </div>
      </section>
    `;

    return await Layout.wrap(contentHtml);
  },

  async afterRender() {
    await Layout.afterRender?.();
  },
};

export default HomeView;
