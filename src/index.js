import router from './routes/router.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Panggil saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', router);
// Panggil juga saat back/forward browser
window.addEventListener('popstate', router);
