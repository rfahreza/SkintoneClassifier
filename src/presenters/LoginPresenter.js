import Auth from "../utils/auth.js";

const LoginPresenter = {
  handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Email dan password wajib diisi!");
      return;
    }

    // Simulasi login: cocokkan dengan data dummy atau pakai API login
    if (email === "demo@tonalytics.com" && password === "123456") {
      // Simpan token dan user info ke localStorage
      Auth.setToken("dummy_token");
      Auth.setUser({
        name: "Demo User",
        email: email,
        undertoneResult: {
          type: "neutral",
          confidence: 92,
        },
      });

      alert("Login berhasil!");
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      alert("Login gagal. Cek kembali email dan password.");
    }
  },
};

export default LoginPresenter;
