import HomeView from '../views/pages/HomeView.js';
import ClassificationView from '../views/pages/ClassificationView.js';
import ProductsView from '../views/pages/ProductsView.js';
import WishlistView from '../views/pages/WishlistView.js';
import ArticlesView from '../views/pages/ArticlesView.js';

const routes = {
  '/': HomeView,
  '/classification': ClassificationView,
  '/products': ProductsView,
  '/wishlist': WishlistView,
  '/articles': ArticlesView,
};

const parseLocation = () => location.pathname.toLowerCase() || '/';

const router = async () => {
  const path = parseLocation();
  const page = routes[path] || HomeView;
  const view = await page.render();
  document.querySelector('#main-content').innerHTML = view;
  if (page.afterRender) await page.afterRender();
};

export default router;
