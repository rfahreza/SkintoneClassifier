export function renderProductCard(product) {
  const discount = product.originalPrice
    ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>`
    : '';

  const platformBadge = {
    shopee: 'bg-warning text-dark',
    sociolla: 'bg-pink text-white',
    zalora: 'bg-dark text-white'
  };

  const undertoneBadge = {
    warm: 'bg-warning text-dark',
    cool: 'bg-primary',
    neutral: 'bg-success',
    all: 'bg-secondary'
  };

  return `
    <div class="col">
      <div class="card h-100 position-relative">
        ${discount}
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h6 class="card-subtitle text-muted mb-1">${product.brand}</h6>
          <h5 class="card-title">${product.name}</h5>
          <div class="mb-2 text-warning">${'★'.repeat(Math.floor(product.rating))} <small class="text-muted">(${product.reviewCount})</small></div>
          <p class="card-text text-danger fw-bold">Rp ${product.price.toLocaleString('id-ID')} ${product.originalPrice ? `<span class="text-muted text-decoration-line-through fw-normal ms-2">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>` : ''}</p>
          <span class="badge ${undertoneBadge[product.undertoneMatch]} text-uppercase">${product.undertoneMatch}</span>
          <p class="mt-2 text-muted small">${product.description}</p>
          ${product.features.slice(0, 2).map(f => `<span class="badge bg-light text-dark me-1">${f}</span>`).join('')}
        </div>
        <div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
          <a href="${product.shopLink}" target="_blank" class="btn btn-sm btn-outline-danger w-100">Beli Sekarang</a>
        </div>
        <span class="position-absolute top-0 end-0 m-2 badge ${platformBadge[product.platform]}">${product.platform}</span>
      </div>
    </div>
  `;
}
