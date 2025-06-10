import LoginPresenter from "../../presenters/LoginPresenter.js";

const LoginView = {
  async render() {
    return `
      <div class="container-fluid py-5" style="min-height: 100vh; background: #fce7f3;">
        <div class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center">
            <div class="card shadow p-4 border-0 rounded-4" style="max-width: 440px; width: 100%; border: 2px solid #f9a8d4;">
              <div class="text-center mb-4">
                <div class="rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 64px; height: 64px; background: #ec4899; color: #fff;">
                  <i class="bi bi-stars fs-3"></i>
                </div>
                <h2 class="mt-3 fw-bold" style="color: #ec4899;">Selamat Datang di Tonalytics</h2>
                <p class="text-muted">Masuk ke akun Tonalytics kamu untuk memulai perjalanan kecantikan</p>
              </div>
              <form id="loginForm">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Masukkan email kamu" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Masukkan password kamu" required>
                    <button class="btn btn-outline-pink" type="button" id="togglePassword"><i class="bi bi-eye"></i></button>
                  </div>
                </div>
                <button type="submit" class="btn btn-pink w-100 rounded-4 d-flex align-items-center justify-content-center" id="loginButton" style="height: 48px; font-size: 1.1rem; font-weight: 600;">Masuk</button>
              </form>
              <div class="text-center mt-4">
                <p class="text-muted">
                  Belum punya akun? <a href="/register" class="text-pink text-decoration-none">Daftar sekarang</a>
                </p>
                <a href="/" class="text-secondary small">← Kembali ke Beranda</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .btn-pink {
          background: #ec4899;
          color: #fff !important;
          border: none;
          min-width: 120px;
          border-radius: 1.5rem !important;
        }
        .btn-pink:hover {
          background: #be185d;
          color: #fff !important;
        }
        .btn-outline-pink {
          border: 2px solid #ec4899;
          color: #ec4899 !important;
          background: #fff;
        }
        .btn-outline-pink:hover {
          background: #fbcfe8;
          color: #ec4899 !important;
        }
        .text-pink {
          color: #ec4899 !important;
        }
      </style>
    `;
  },

  afterRender() {
    const form = document.getElementById("loginForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const icon = togglePassword.querySelector("i");

    form.addEventListener("submit", LoginPresenter.handleSubmit);

    togglePassword.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      icon.className = type === "password" ? "bi bi-eye" : "bi bi-eye-slash";
    });
  },
};

export default LoginView;
