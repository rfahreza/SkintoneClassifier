import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HomePresenter from '../../presenters/HomePresenter.js';

const HomeView = {
  async render() {
    const { isLoggedIn, user, features, testimonials } = await HomePresenter.init();

    return `
      ${await Header.render(isLoggedIn, user)}
      <section class="py-5 text-center" style="background: #fce7f3;">
        <div class="container px-4 px-lg-5" style="max-width: 2200px;">
          <h1 class="display-4 fw-bold text-danger mb-2">
            Temukan Undertone<br> Kulitmu dengan AI
          </h1>
          <p class="lead mb-4">${isLoggedIn ? `Selamat datang kembali, <strong>${user.name}</strong>!` : 'Platform AI untuk menganalisis undertone kulit & menemukan produk kecantikan perfect untukmu.'}</p>

          ${isLoggedIn && user.undertoneResult ? `
            <div class="alert alert-info w-75 mx-auto mt-4">
              <strong>Undertone kamu:</strong> ${user.undertoneResult.type} 
              <br/>Confidence: ${user.undertoneResult.confidence}%
            </div>` : ''}

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
            ${features.map(f => `
              <div class="col-md-6 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body text-center">
                    <div class="mb-3"><i class="bi bi-stars fs-1 text-danger"></i></div>
                    <h5 class="card-title">${f.title}</h5>
                    <p class="card-text">${f.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-4">Apa Kata Mereka?</h2>
          <div class="row">
            ${testimonials.map(t => `
              <div class="col-md-4 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <div class="text-warning mb-2">${'★'.repeat(t.rating)}</div>
                    <blockquote class="blockquote fst-italic">"${t.comment}"</blockquote>
                    <footer class="blockquote-footer mt-3">${t.name}, ${t.location}</footer>
                  </div>
                  <div class="card-footer text-end">
                    <span class="badge bg-${t.undertone === 'warm' ? 'warning' : t.undertone === 'cool' ? 'primary' : 'success'}">${t.undertone}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      ${await Footer.render()}
      <style>
        .btn-pink {
          background: #ec4899;
          color: #fff !important;
          border: none;
          min-width: 120px;
        }
        .btn-outline-pink {
          border: 2.5px solid #ec4899;
          color: #ec4899 !important;
          background: #fff;
          min-width: 120px;
        }
        .btn-outline-pink:hover {
          background: #fbcfe8;
          color: #ec4899 !important;
        }
        .btn-pink:hover {
          background: #be185d;
          color: #fff !important;
        }
        .rounded-5 {
          border-radius: 2rem !important;
        }
      </style>
    `;
  }
};

export default HomeView;
