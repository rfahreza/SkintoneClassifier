import RegisterView from '../views/RegisterView.js';
import { register } from '../auth/index.js';

class RegisterPresenter {
  constructor() {
    this.view = new RegisterView();
    this.view.bindFormSubmit(this.handleRegister.bind(this));
    this.view.bindTogglePasswordVisibility();
  }

  async handleRegister({ name, email, password, confirmPassword }) {
    this.view.clearAlert();

    if (password !== confirmPassword) {
      this.view.showAlert('Password tidak cocok.');
      return;
    }

    if (password.length < 6) {
      this.view.showAlert('Password minimal 6 karakter.');
      return;
    }

    this.view.setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        this.view.showAlert('Registrasi berhasil! Silakan login.', 'success');
        setTimeout(() => {
          window.history.pushState({}, '', '/login');
          if (window.dispatchEvent) {
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }, 1500);
      } else {
        this.view.showAlert('Registrasi gagal. Silakan coba lagi.');
      }
    } catch (error) {
      this.view.showAlert('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      this.view.setLoading(false);
    }
  }
}

export default RegisterPresenter;
