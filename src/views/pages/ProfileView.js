import Layout from '../components/Layout';
import Auth from '../../utils/auth';

const ProfileView = {
  async render() {
    const user = Auth.getUser();

    const contentHtml = `
      <main class="min-vh-100 py-5" style="background: #fce7f3;">
        <div class="container pt-5">
          ${
            !user
              ? `
            <div class="py-4 d-flex justify-content-center">
              <div class="card rounded-4 text-center shadow-sm" style="max-width: 440px;">
                <div class="card-body mt-4 mb-4">
                  <h2 class="card-title mb-3">Akses <span class="text-danger">Terbatas</span></h2>
                  <p class="card-text">
                    Silakan login untuk mengakses halaman profil Anda.
                  </p>
                  <div class="d-grid gap-2 mt-4">
                    <a href="/login" class="btn btn-outline-pink rounded-5 d-flex justify-content-center align-items-center gap-2 px-4 py-2 fw-semibold">Masuk</a>
                    <a href="/register" class="btn btn-pink rounded-5 d-flex justify-content-center align-items-center gap-2 px-4 py-2 fw-semibold">Daftar Akun Baru</a>
                  </div>
                </div>
              </div>
            </div>
          `
              : `
            <div class="container pt-5">
              <div class="card shadow-sm rounded-4 mx-auto" style="max-width: 440px;">
                <div class="card-body text-center">
                  <div class="mb-4">
                    <i class="bi bi-person-circle fs-1 text-pink"></i>
                  </div>
                  <h5 class="card-title mb-2">Profil Pengguna</h5>
                  <p class="text-muted mb-4">Berikut informasi akun Anda.</p>

                  <ul class="list-group list-group-flush text-start">
                    <li class="list-group-item"><strong>Nama:</strong> ${user.name || '-'}</li>
                    <li class="list-group-item"><strong>Email:</strong> ${user.email || '-'}</li>
                    <li class="list-group-item"><strong>Tipe Skintone:</strong> ${user.skintoneResult?.type || '-'}</li>
                  </ul>

                  <div class="d-grid gap-2 mt-4">
                    <a href="#/edit-profile" class="btn btn-outline-pink rounded-5">Edit Profil</a>
                    <a href="/logout" class="btn btn-pink rounded-5">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          `
          }
        </div>
      </main>
    `;
    return await Layout.wrap(contentHtml);
  },

  afterRender() {
    document.querySelectorAll('a[href="/logout"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.confirm('Yakin ingin logout?')) {
          import('../../utils/auth.js').then(({ default: Auth }) => {
            Auth.logout();
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          });
        }
      });
    });
  },
};

export default ProfileView;
