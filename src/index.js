import router from "./routes/router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/main.css';
import Modal from "bootstrap/js/dist/modal";

// Panggil saat halaman pertama kali dimuat
window.addEventListener("DOMContentLoaded", router);
// Panggil juga saat back/forward browser
window.addEventListener("popstate", router);

// Tambahkan: intercept semua klik <a> internal agar SPA router jalan
// dan tidak reload halaman

document.addEventListener("click", function (e) {
  const anchor = e.target.closest("a");

  if (
    anchor &&
    anchor.getAttribute("href") &&
    anchor.getAttribute("href").startsWith("/") &&
    !anchor.hasAttribute("target")
  ) {
    e.preventDefault();
    const href = anchor.getAttribute("href");
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
});

