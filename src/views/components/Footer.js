const Footer = {
  async render() {
    return `
      <footer class="bg-white text-dark pt-5 border-top">
        <div class="container">
          <div class="row">
            <!-- Brand Column -->
            <div class="col-lg-4 mb-4">
              <div class="d-flex align-items-center mb-3">
                <div class="bg-gradient-pink text-white d-flex align-items-center justify-content-center rounded-circle me-2" style="width: 40px; height: 40px;">
                  <i class="bi bi-heart-fill"></i>
                </div>
                <h5 class="fw-bold mb-0">Tonalytics</h5>
              </div>
              <p class="text-muted">Platform AI terdepan untuk analisis undertone kulit dan rekomendasi produk kecantikan yang tepat untuk setiap wanita Indonesia.</p>
              <p class="fst-italic text-muted small">"Discover your perfect beauty match with intelligent skin analysis"</p>
            </div>

            <!-- Links Column -->
            <div class="col-lg-4 mb-4">
              <h6 class="fw-bold mb-3">Fitur Utama</h6>
              <ul class="list-unstyled">
                <li><a href="/classification" class="text-decoration-none text-dark">Analisis Undertone</a></li>
                <li><a href="/products" class="text-decoration-none text-dark">Rekomendasi Produk</a></li>
                <li><a href="/articles" class="text-decoration-none text-dark">Tips Kecantikan</a></li>
              </ul>
            </div>

            <!-- Social Column -->
            <div class="col-lg-4 mb-4">
              <h6 class="fw-bold mb-3">Sosial Media</h6>
              <ul class="list-unstyled">
                <li class="mb-2 d-flex align-items-center gap-2">
                  <i class="bi bi-instagram text-pink"></i>
                  <a href="#" class="text-decoration-none text-dark">tonalytics</a>
                </li>
                <li class="mb-2 d-flex align-items-center gap-2">
                  <i class="bi bi-youtube text-danger"></i>
                  <a href="#" class="text-decoration-none text-dark">tonalytics</a>
                </li>
                <li class="mb-2 d-flex align-items-center gap-2">
                  <i class="bi bi-envelope text-secondary"></i>
                  <a href="#" class="text-decoration-none text-dark">tonalytics@mail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="text-center border-top pt-3 pb-2">
            <small class="text-muted">© 2025 Tonalytics. Made with ♥ for beautiful Indonesian women.</small>
          </div>
        </div>
      </footer>
    `;
  }
};

export default Footer;
