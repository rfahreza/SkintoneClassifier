import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Auth from '../../utils/auth.js';

const Layout = {
  async wrap(contentHtml) {
    const isLoggedIn = Auth.isLoggedIn();
    const user = isLoggedIn ? Auth.getUser() : null;
    const currentPath = window.location.pathname;

    const headerHtml = await Header.render(isLoggedIn, user?.name || '', currentPath);
    const footerHtml = await Footer.render();

    return `
      ${headerHtml}
      <main>${contentHtml}</main>
      ${footerHtml}
    `;
  },

  async afterRender() {
    if (typeof Header.afterRender === 'function') await Header.afterRender();
    if (typeof Footer.afterRender === 'function') await Footer.afterRender();
  },
};

export default Layout;
