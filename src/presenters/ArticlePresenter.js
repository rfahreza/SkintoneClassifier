import ArticleView from '../views/pages/ArticleView.js';

const ArticlePresenter = {
  init() {
    this.artikelData = [
      {
        id: '1',
        title: 'Cara Menentukan Skintone Kulit dengan Mudah',
        excerpt: 'Pelajari trik sederhana untuk mengetahui apakah kulitmu memiliki skintone warm, cool, atau neutral tanpa perlu ribet.',
        content: 'Lorem ipsum content...',
        category: 'skincare',
        author: 'Dr. Sari Beauty',
        publishDate: '2024-01-20',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
        tags: ['skintone', 'skincare', 'tips'],
        featured: true
      },
      {
        id: '2',
        title: '10 Lipstik Terbaik untuk Skintone Warm',
        excerpt: 'Rekomendasi lipstik dengan shade yang perfect untuk kamu yang memiliki skintone warm. Dari drugstore hingga high-end!',
        content: 'Lorem ipsum content...',
        category: 'makeup',
        author: 'Rina Makeup Artist',
        publishDate: '2024-01-18',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
        tags: ['lipstik', 'warm skintone', 'makeup'],
        featured: true
      },
      {
        id: '3',
        title: 'Tutorial Makeup Natural untuk Sehari-hari',
        excerpt: 'Step by step tutorial makeup natural yang cocok untuk aktivitas sehari-hari. Simple tapi tetap terlihat fresh!',
        content: 'Lorem ipsum content...',
        category: 'tutorial',
        author: 'Maya Beauty Guru',
        publishDate: '2024-01-15',
        readTime: '10 min',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
        tags: ['tutorial', 'natural makeup', 'daily'],
        featured: false
      },
      {
        id: '4',
        title: 'Skincare Routine untuk Kulit Berjerawat',
        excerpt: 'Panduan lengkap merawat kulit berjerawat dengan produk yang tepat dan routine yang benar.',
        content: 'Lorem ipsum content...',
        category: 'skincare',
        author: 'Dr. Indah Dermato',
        publishDate: '2024-01-12',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
        tags: ['skincare', 'acne', 'routine'],
        featured: false
      },
      {
        id: '5',
        title: 'Fashion Tips: Warna Outfit untuk Cool Skintone',
        excerpt: 'Pelajari warna-warna yang paling flattering untuk kamu yang memiliki cool skintone. Mix and match yang perfect!',
        content: 'Lorem ipsum content...',
        category: 'fashion',
        author: 'Lina Stylist',
        publishDate: '2024-01-10',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
        tags: ['fashion', 'cool skintone', 'outfit'],
        featured: false
      },
      {
        id: '6',
        title: 'Review: Foundation Drugstore vs High-End',
        excerpt: 'Perbandingan detail foundation drugstore dan high-end. Mana yang lebih worth it untuk budget kamu?',
        content: 'Lorem ipsum content...',
        category: 'review',
        author: 'Tika Reviewer',
        publishDate: '2024-01-08',
        readTime: '12 min',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
        tags: ['review', 'foundation', 'drugstore', 'high-end'],
        featured: false
      }
    ];

    this.filteredArticles = this.artikelData;
    this.selectedCategory = 'all';
    this.searchQuery = '';

    ArticleView.showArticles(this.filteredArticles);

    this.setupEventListeners();
  },

  setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('category-select');

    if (searchInput && categorySelect) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterArticles();
      });

      categorySelect.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.filterArticles();
      });
    }
  },

  filterArticles() {
    const filtered = this.artikelData.filter((article) => {
      const matchesCategory =
        this.selectedCategory === 'all' ||
        article.category === this.selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(this.searchQuery) ||
        article.excerpt.toLowerCase().includes(this.searchQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(this.searchQuery));
      return matchesCategory && matchesSearch;
    });

    this.filteredArticles = filtered;
    ArticleView.render(this.filteredArticles);
  },
};

export default ArticlePresenter;
