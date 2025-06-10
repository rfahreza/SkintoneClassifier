const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const WISHLIST_KEY = 'wishlist';

const Auth = {
  /**
   * Simpan token login ke localStorage
   * @param {string} token
   */
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Ambil token login dari localStorage
   * @returns {string|null}
   */
  getToken() {
    // return localStorage.getItem(TOKEN_KEY);
    return 'dummy_token_123';
  },

  /**
   * Simpan data user
   * @param {object} userData
   */
  setUser(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  },

  /**
   * Ambil data user
   * @returns {object|null}
   */
  getUser() {
    // const userJson = localStorage.getItem(USER_KEY);
    // return userJson ? JSON.parse(userJson) : null;
  return {
    name: 'Fadil',
    email: 'fadil@example.com',
    undertoneResult: { type: 'Warm', confidence: 85 }
  };
  },

  /**
   * Periksa apakah pengguna sudah login
   * @returns {boolean}
   */
  isLoggedIn() {
    // return !!this.getToken();
    return true;
  },

  /**
   * Hapus data saat logout
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Ambil wishlist pengguna
   * @returns {Array}
   */
  getWishlist() {
    const wishlistJson = localStorage.getItem(WISHLIST_KEY);
    return wishlistJson ? JSON.parse(wishlistJson) : [];
  },

  /**
   * Simpan wishlist pengguna
   * @param {Array} wishlist
   */
  setWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  },
};

export default Auth;
