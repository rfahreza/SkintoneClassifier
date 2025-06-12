import Auth from '../utils/auth.js';
import { login } from '../auth/index.js'; 
const LoginPresenter = {
  async handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Email dan password wajib diisi!');
      return;
    }

    const result = await login(email, password);

    if (result.token) {
      Auth.setToken(result.token);
      Auth.setUser({
        name: result.name || email,
        email: email,
      });

      alert('Login berhasil!');
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      alert(result.message || 'Login gagal. Cek kembali email dan password.');
    }
  },
};

export default LoginPresenter;
