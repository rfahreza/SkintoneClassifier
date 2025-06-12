class RegisterView {
  constructor() {}

  init() {
    this.form = document.getElementById('register-form');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.confirmPasswordInput = document.getElementById('confirmPassword');
    this.passwordToggle = document.getElementById('togglePassword');
    this.confirmPasswordToggle = document.getElementById('toggleConfirmPassword');
    this.submitBtn = document.getElementById('register-btn');
    this.alertBox = document.getElementById('alert-box');
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
                    <button class="btn btn-outline-pink" type="button" id="togglePassword"><i class="bi bi-eye-slash"></i></button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                    <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" placeholder="Ulangi password" required>
                    <button class="btn btn-outline-pink" type="button" id="toggleConfirmPassword"><i class="bi bi-eye-slash"></i></button>
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
      </style>
    `;
  }

async afterRender() {
  const form = document.getElementById('register-form');

  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  const iconPassword = togglePassword.querySelector('i');
  const iconConfirm = toggleConfirmPassword.querySelector('i');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // handler form (bisa kamu isi sendiri atau sambungkan ke Presenter)
  });

  // Atur icon awal
  iconPassword.className = passwordInput.type === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';
  iconConfirm.className = confirmPasswordInput.type === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';

  // Event toggle untuk password
  togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    iconPassword.className = isHidden ? 'bi bi-eye' : 'bi bi-eye-slash';
  });

  // Event toggle untuk confirm password
  toggleConfirmPassword.addEventListener('click', () => {
    const isHidden = confirmPasswordInput.type === 'password';
    confirmPasswordInput.type = isHidden ? 'text' : 'password';
    iconConfirm.className = isHidden ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
}

  bindFormSubmit(handler) {
    this.form.addEventListener('submit', (e) => {
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
    if (!this.passwordToggle || !this.confirmPasswordToggle) return;

    const togglePassword = (input, toggleButton) => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      const icon = toggleButton.querySelector('i');
      icon.classList.toggle('bi-eye-slash', !isPassword);
      icon.classList.toggle('bi-eye', isPassword);
    };

    this.passwordToggle.addEventListener('click', () => {
      togglePassword(this.passwordInput, this.passwordToggle);
    });

    this.confirmPasswordToggle.addEventListener('click', () => {
      togglePassword(this.confirmPasswordInput, this.confirmPasswordToggle);
    });
  }

  showAlert(message, variant = 'danger') {
    this.alertBox.innerHTML = `
      <div class="alert alert-${variant} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }

  clearAlert() {
    this.alertBox.innerHTML = '';
  }

  setLoading(isLoading) {
    this.submitBtn.disabled = isLoading;
    this.submitBtn.innerHTML = isLoading
      ? `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mendaftar...`
      : 'Buat Akun';
  }
}

export default RegisterView;
