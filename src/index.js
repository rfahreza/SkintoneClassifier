import router from "./routes/router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/main.css';
import Modal from "bootstrap/js/dist/modal";

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("popstate", router);

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

