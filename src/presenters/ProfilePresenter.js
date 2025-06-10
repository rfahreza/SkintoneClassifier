import Auth from '../utils/auth.js';

const ProfilePresenter = {
  init({ renderProfile, renderWishlist }) {
    if (!Auth.isLoggedIn()) {
      window.location.hash = '/unauthorized';
      return;
    }

    const user = Auth.getUser();
    const wishlist = Auth.getWishlist();

    renderProfile(user);
    renderWishlist(wishlist);

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Yakin ingin keluar?')) {
          Auth.logout();
          window.location.hash = '/';
        }
      });
    }
  }
};

export default ProfilePresenter;
