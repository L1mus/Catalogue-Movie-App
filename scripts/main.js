import { getSession, clearSession } from "./storage.js";

const navLogin = document.querySelector("[data-js='nav-login']");
const navWatchlist = document.querySelector("[data-js='nav-watchlist']");
const navAvatar = document.querySelector("[data-js='nav-avatar']");

const session = getSession();

if (session) {
  navLogin.classList.add("hidden");
  navWatchlist.classList.remove("hidden");
  navAvatar.classList.remove("hidden");
  navAvatar.textContent = session.initials;
} else {
  navLogin.classList.remove("hidden");
  navWatchlist.classList.add("hidden");
  navAvatar.classList.add("hidden");
}

navAvatar.addEventListener("click", () => {
  clearSession();
  window.location.href = "/index.html";
});
