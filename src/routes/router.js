import HomeView from "../views/pages/HomeView.js";
import ClassificationView from "../views/pages/ClassificationView.js";
import ProductView from "../views/pages/ProductView.js";
import WishlistView from "../views/pages/WishlistView.js";
import ArticlesView from "../views/pages/ArticleView.js";
import LoginView from "../views/pages/LoginView.js";
import RegisterView from "../views/pages/RegisterView.js";
import ProfileView from "../views/pages/ProfileView.js";

const routes = {
  "/": HomeView,
  "/login": LoginView,
  "/register": RegisterView, // tambahkan ini agar SPA routing ke register
  "/classification": ClassificationView,
  "/products": ProductView,
  "/wishlist": WishlistView,
  "/articles": ArticlesView,
  "/profile": ProfileView,
};

const parseLocation = () => location.pathname.toLowerCase() || "/";

const router = async () => {
  const path = parseLocation();
  const page = routes[path] || HomeView;
  const view = await page.render();
  document.querySelector("#app").innerHTML = view;
  if (page.afterRender) {
    if (typeof page.afterRender === "function") {
      await page.afterRender();
    } else if (
      typeof page === "function" &&
      page.prototype &&
      page.prototype.afterRender
    ) {
      await new page().afterRender();
    }
  }
};

export default router;
