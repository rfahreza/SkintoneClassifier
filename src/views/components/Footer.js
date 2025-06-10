const Footer = {
  async render() {
    return `
      <footer class="bg-white text-dark pt-5 border-top">
        <div class="container">
          <div class="row gy-4">
            <!-- Brand Column -->
            <div class="col-lg-4">
              <div class="d-flex align-items-center mb-3">
                <div class="bg-gradient-pink text-white d-flex align-items-center justify-content-center rounded-circle me-2" style="width: 40px; height: 40px;">
                  <i class="bi bi-heart-fill"></i>
                </div>
                <h5 class="fw-bold mb-0">Tonalytics</h5>
              </div>
              <p class="text-muted">
                Platform AI terdepan untuk analisis undertone kulit dan rekomendasi produk kecantikan yang tepat untuk setiap wanita Indonesia.
              </p>
              <p class="fst-italic text-muted small">
                "Discover your perfect beauty match with intelligent skin analysis"
              </p>
            </div>

            <!-- Links Column -->
            <div class="col-lg-4">
              <h6 class="fw-bold mb-3">Fitur Utama</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <a href="/classification" class="text-decoration-none text-dark d-block">Analisis Undertone</a>
                </li>
                <li class="mb-2">
                  <a href="/products" class="text-decoration-none text-dark d-block">Rekomendasi Produk</a>
                </li>
                <li class="mb-2">
                  <a href="/articles" class="text-decoration-none text-dark d-block">Tips Kecantikan</a>
                </li>
              </ul>
            </div>

            <!-- Social Column -->
            <div class="col-lg-4">
              <h6 class="fw-bold mb-3">Sosial Media</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <a href="#" class="text-decoration-none text-dark d-flex align-items-center gap-2">
                    <i class="bi bi-instagram fs-5 text-pink"></i>
                    <span>tonalytics</span>
                  </a>
                </li>
                <li class="mb-2">
                  <a href="#" class="text-decoration-none text-dark d-flex align-items-center gap-2">
                    <i class="bi bi-youtube fs-5 text-danger"></i>
                    <span>tonalytics</span>
                  </a>
                </li>
                <li class="mb-2">
                  <a href="mailto:tonalytics@mail.com" class="text-decoration-none text-dark d-flex align-items-center gap-2">
                    <i class="bi bi-envelope fs-5 text-secondary"></i>
                    <span>tonalytics@mail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center border-top pt-3 pb-2 mt-4">
            <small class="text-muted">© 2025 Tonalytics. Made with ♥ for beautiful Indonesian women.</small>
          </div>
        </div>
      </footer>
    `;
  }
};

export default Footer;
