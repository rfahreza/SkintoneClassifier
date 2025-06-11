import Layout from "../components/Layout.js";
import ArticlePresenter from "../../presenters/ArticlePresenter.js";

const ArticleView = {
  async render() {
    const contentHtml = `
      <section class="py-4" style="background: #fce7f3;">
        <div class="container">
          <div class="text-center mb-5">
            <h1 class="fw-bold">Artikel <span class="text-danger">Kecantikan & Fashion</span></h1>
            <p class="text-muted">Tips, tutorial, dan insight terbaru seputar dunia kecantikan dan fashion dari para ahli</p>
          </div>

          <div class="mb-4">
            <input type="text" id="searchInput" class="form-control form-control-lg rounded-pill shadow-sm" placeholder="🔍 Cari artikel...">
          </div>

          <div id="articlesContainer" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"></div>

          <div id="emptyState" class="text-center d-none mt-5">
            <div class="card p-5 border-0 shadow-sm">
              <div class="card-body">
                <div class="text-muted mb-3">
                  <i class="bi bi-search" style="font-size: 2rem;"></i>
                </div>
                <h5 class="card-title">Artikel Tidak Ditemukan</h5>
                <p class="card-text">Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    return await Layout.wrap(contentHtml);
  },

  async afterRender() {
    ArticlePresenter.init({
      searchInput: document.getElementById('searchInput'),
      categoryFilter: null, // Tidak ada dropdown kategori dalam desain ini
      articlesContainer: document.getElementById('articlesContainer'),
      emptyState: document.getElementById('emptyState'),
    });

    await Layout.afterRender?.();
  },

  showArticles(articles) {
    const container = document.getElementById('articlesContainer');
    const emptyState = document.getElementById('emptyState');

    if (!container || !emptyState) return;

    if (articles.length === 0) {
      container.innerHTML = '';
      emptyState.classList.remove('d-none');
      return;
    }

    emptyState.classList.add('d-none');
    container.innerHTML = articles.map(article => `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <img src="${article.image}" class="card-img-top" alt="${article.title}">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text text-muted">${article.excerpt}</p>
            <p class="card-text"><small class="text-muted">${article.author} • ${article.publishDate}</small></p>
          </div>
        </div>
      </div>
    `).join('');
  }
};

export default ArticleView;
