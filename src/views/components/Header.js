const Header = {
  async render(isLoggedIn = true, userName = 'Fadil', currentPath = window.location.pathname) {
    const isActive = (href) => href === currentPath ? 'active text-pink' : '';

    return `
      <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top">
        <div class="container justify-content-center">
          <a class="navbar-brand fw-bold d-flex align-items-center mx-auto" href="/">
            <span class="fs-4" style="background: linear-gradient(to right, #fb7185, #f472b6); -webkit-background-clip: text; color: transparent;">Tonalytics</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-4 gap-lg-5">
              <li class="nav-item"><a class="nav-link ${isActive('/')}" href="/">Home</a></li>
              <li class="nav-item"><a class="nav-link ${isActive('/classification')}" href="/classification">Klasifikasi</a></li>
              <li class="nav-item"><a class="nav-link ${isActive('/products')}" href="/products">Produk</a></li>
              ${isLoggedIn ? `<li class="nav-item"><a class="nav-link ${isActive('/wishlist')}" href="/wishlist">Wishlist</a></li>` : ''}
              <li class="nav-item"><a class="nav-link ${isActive('/articles')}" href="/articles">Artikel</a></li>
              <li class="nav-item"><a class="nav-link ${isActive('/profile')}" href="/profile">Profile</a></li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3 gap-lg-4">
              ${isLoggedIn ? `
                <li class="nav-item d-flex align-items-center">
                  <span class="nav-link">Hi, <strong>${userName}</strong></span>
                </li>
                <li class="nav-item">
                  <a class="btn btn-pink" href="/logout">Logout</a>
                </li>
              ` : `
                <li class="nav-item">
                  <a class="btn btn-outline-pink rounded-5 me-2 px-4 py-2 fw-semibold" href="/login">Masuk</a>
                </li>
                <li class="nav-item">
                  <a class="btn btn-pink" href="/register">Daftar</a>
                </li>
              `}
            </ul>
          </div>
        </div>
      </nav>
      <style>
        .btn-pink,
        .btn-outline-pink {
          min-width: 120px;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem !important;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.5;
        }

        .btn-pink {
          background: #ec4899;
          color: #fff !important;
          border: 2.5px solid #ec4899;
        }

        .btn-pink:hover {
          background: #be185d;
          border-color: #be185d;
          color: #fff !important;
        }

        .btn-outline-pink {
          background: #fff;
          color: #ec4899 !important;
          border: 2.5px solid #ec4899;
        }

        .btn-outline-pink:hover {
          background: #fbcfe8;
          color: #ec4899 !important;
        }

        .nav-link.text-pink,
        .nav-link.active {
          color: #ec4899 !important;
          font-weight: 600;
        }

        .nav-link:hover {
          color: #ec4899 !important;
        }

        .nav-link.active::after {
          content: '';
          display: block;
          margin: 0 auto;
          width: 40%;
          height: 2px;
          background: linear-gradient(to right, #fb7185, #f472b6);
          border-radius: 2px;
          margin-top: 2px;
        }
      </style>
    `;
  }
};

export default Header;
