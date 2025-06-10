class RegisterView {
  constructor() {
    this.form = document.getElementById("register-form");
    this.nameInput = document.getElementById("name");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.confirmPasswordInput = document.getElementById("confirmPassword");
    this.passwordToggle = document.getElementById("togglePassword");
    this.confirmPasswordToggle = document.getElementById(
      "toggleConfirmPassword"
    );
    this.submitBtn = document.getElementById("register-btn");
    this.alertBox = document.getElementById("alert-box");
  }

  static async render() {
    return `
      <div class="container-fluid py-5" style="min-height: 100vh; background: #fce7f3;">
        <div class="row justify-content-center">
          <div class="col-12 d-flex justify-content-center">
            <div class="card shadow p-4 border-0 rounded-4" style="max-width: 440px; width: 100%; border: 2px solid #f9a8d4;">
              <div class="text-center mb-4">
                <div class="rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 64px; height: 64px; background: #ec4899; color: #fff;">
                  <i class="bi bi-stars fs-3"></i>
                </div>
                <h2 class="mt-3 fw-bold" style="color: #ec4899;">Buat Akun Tonalytics</h2>
                <p class="text-muted">Daftar untuk mulai perjalanan kecantikanmu</p>
              </div>
              <div id="alert-box"></div>
              <form id="register-form">
                <div class="mb-3">
                  <label for="name" class="form-label">Nama Lengkap</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                    <input type="text" id="name" name="name" class="form-control" placeholder="Nama lengkap kamu" required>
                  </div>
                </div>
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
                    <input type="password" id="password" name="password" class="form-control" placeholder="Buat password" required>
                    <button class="btn btn-outline-pink" type="button" id="togglePassword"><i class="bi bi-eye"></i></button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                    <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" placeholder="Ulangi password" required>
                    <button class="btn btn-outline-pink" type="button" id="toggleConfirmPassword"><i class="bi bi-eye"></i></button>
                  </div>
                </div>
                <button type="submit" class="btn btn-pink w-100 rounded-4 d-flex align-items-center justify-content-center" id="register-btn" style="height: 48px; font-size: 1.1rem; font-weight: 600;">Buat Akun</button>
              </form>
              <div class="text-center mt-4">
                <p class="text-muted">
                  Sudah punya akun? <a href="/login" class="text-pink text-decoration-none">Masuk di sini</a>
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
        .card {
          border-radius: 1rem;
        }
        .input-pink {
          /* border: 2px solid #f9a8d4 !important; */
          border: none !important;
          border-radius: 0.5rem !important;
          background: #fff;
        }
        .input-pink:focus {
          border-color: #ec4899 !important;
          box-shadow: 0 0 0 0.15rem #fbcfe8;
        }
        
      </style>
    `;
  }

  static afterRender() {
    const view = new RegisterView();
    view.bindFormSubmit((data) => {
      // Anda bisa panggil presenter di sini jika perlu
      // Sementara, biarkan default (nanti presenter akan override)
    });
    view.bindTogglePasswordVisibility();
  }

  bindFormSubmit(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name: this.nameInput.value,
        email: this.emailInput.value,
        password: this.passwordInput.value,
        confirmPassword: this.confirmPasswordInput.value,
      };
      handler(data);
    });
  }

  bindTogglePasswordVisibility() {
    this.passwordToggle.addEventListener("click", () => {
      const type = this.passwordInput.type === "password" ? "text" : "password";
      this.passwordInput.type = type;
    });

    this.confirmPasswordToggle.addEventListener("click", () => {
      const type =
        this.confirmPasswordInput.type === "password" ? "text" : "password";
      this.confirmPasswordInput.type = type;
    });
  }

  showAlert(message, variant = "danger") {
    this.alertBox.innerHTML = `
      <div class="alert alert-${variant} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }

  clearAlert() {
    this.alertBox.innerHTML = "";
  }

  setLoading(isLoading) {
    this.submitBtn.disabled = isLoading;
    this.submitBtn.innerHTML = isLoading
      ? `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mendaftar...
    `
      : "Buat Akun";
  }
}

export default RegisterView;

// Tambahkan static afterRender agar SPA bisa binding event setelah render
RegisterView.afterRender = async function () {
  const view = new RegisterView();
  // Pastikan form dan tombol sudah ada di DOM
  view.bindFormSubmit((data) => {
    // Anda bisa panggil presenter di sini jika perlu
    // Sementara, biarkan default (nanti presenter akan override)
  });
  view.bindTogglePasswordVisibility();
};
