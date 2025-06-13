class ProductPresenter {
  constructor() {
    this.products = [];
    this.filtered = [];
    this.container = [];
  }

static async getProducts() {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();

      // Cek jika data adalah array
      if (!Array.isArray(data)) {
        console.error('❌ Data produk bukan array:', data);
        return [];
      }

      return data;
    } catch (error) {
      console.error('❌ Gagal mengambil data produk:', error);
      return [];
    }
  }


  async init() {
    this.container = document.querySelector('#produk-list-view');
    if (!this.container) {
      console.error('❌ #produk-list-view tidak ditemukan di DOM');
      return;
    }

    await this.fetchProducts();
    this.filtered = this.products;
    this.render();
    this.setupFilter();
  }

  async fetchProducts() {
    try {
      const response = await fetch(`http://localhost:3000/products`);
      const data = await response.json();
      this.products = data;
    } catch (error) {
      console.error('Gagal memuat produk:', error);
      this.container.innerHTML = `
        <div class="alert alert-danger mt-4 text-center">
          <strong>Oops!</strong> Gagal memuat data produk. Silakan coba lagi nanti.
        </div>
      `;
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        ${this.filtered.map(product => `
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">${product.shade}</p>
                <p class="card-text fw-bold">Rp ${product.price.toLocaleString()}</p>
                <a href="${product.link}" target="_blank" class="btn btn-sm btn-outline-primary">Beli Sekarang</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  setupFilter() {
    const filterSelect = document.querySelector('#filter-kategori');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', () => {
      const value = filterSelect.value;
      this.filtered = value === 'all'
        ? this.products
        : this.products.filter(p => p.category === value);

      this.render();
    });
  }
}

export default ProductPresenter;
