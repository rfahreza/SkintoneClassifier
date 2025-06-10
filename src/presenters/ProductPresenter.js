class ProductPresenter {
  constructor({ user }) {
    this.user = user;

    // Data produk langsung didefinisikan di sini
    this.products = [
      {
        id: '1',
        name: 'Perfect Match Foundation',
        brand: 'Maybelline',
        price: 129000,
        originalPrice: 159000,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
        category: 'foundation',
        undertoneMatch: 'warm',
        shopLink: 'https://shopee.co.id',
        platform: 'shopee',
        rating: 4.8,
        reviewCount: 2341,
        description: 'Foundation dengan coverage penuh yang tahan hingga 24 jam',
        features: ['SPF 20', 'Oil-free', 'Non-comedogenic', 'Buildable coverage']
      },
      {
        id: '2',
        name: 'Glow Skin Cushion',
        brand: 'Wardah',
        price: 98000,
        originalPrice: 109000,
        image: 'https://images.unsplash.com/photo-1617225884285-2e75c8f3b9d9?w=400',
        category: 'cushion',
        undertoneMatch: 'neutral',
        shopLink: 'https://tokopedia.com',
        platform: 'tokopedia',
        rating: 4.6,
        reviewCount: 1432,
        description: 'Cushion ringan dengan efek glowing dan perlindungan UV',
        features: ['SPF 30', 'Dewy finish', 'Vitamin E']
      },
      {
        id: '3',
        name: 'Matte Velvet Lip Cream',
        brand: 'Make Over',
        price: 75000,
        originalPrice: 89000,
        image: 'https://images.unsplash.com/photo-1602524209775-dbe3c4bb2173?w=400',
        category: 'lipstick',
        undertoneMatch: 'cool',
        shopLink: 'https://shopee.co.id',
        platform: 'shopee',
        rating: 4.9,
        reviewCount: 3120,
        description: 'Lip cream matte dengan warna intens dan tahan lama',
        features: ['Transferproof', 'Longwear', 'Vitamin C']
      },
      // Tambahkan produk lainnya jika perlu
    ];

    this.filtered = [];
    this.container = document.querySelector('#produk-list-view');
  }

  async init() {
    if (!this.user) {
      this.renderRestrictedView();
      return;
    }

    this.filtered = this.products;
    this.render();
    this.setupFilter();
  }

  renderRestrictedView() {
    this.container.innerHTML = `
      <div class="alert alert-warning text-center mt-4" role="alert">
        <h4 class="alert-heading">Akses Terbatas</h4>
        <p>Silakan login terlebih dahulu untuk melihat daftar produk rekomendasi.</p>
        <hr>
        <a href="#/login" class="btn btn-primary">Login Sekarang</a>
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        ${this.filtered.map(product => `
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">${product.brand}</p>
                <p class="card-text fw-bold">Rp ${product.price.toLocaleString()}</p>
                <a href="${product.shopLink}" target="_blank" class="btn btn-sm btn-outline-primary">Beli di ${product.platform}</a>
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
