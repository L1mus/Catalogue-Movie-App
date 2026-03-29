import { fetchFilms, fetchFilmsSortByImbd, buildImgUrl } from "../api.js";

const filmList = document.querySelector("[data-js='film-list']");
const filmCount = document.querySelector("[data-js='film-count']");
const btnSortImdb = document.querySelector("[data-js='btn-sort-imdb']");
const paginationRange = document.querySelector("[data-js='pagination-range']");
const btnPrev = document.querySelector("[data-js='btn-prev']");
const btnNext = document.querySelector("[data-js='btn-next']");

let currentPage = 1;

const renderFilms = async (page) => {
  filmList.innerHTML = "";

  const { films, totalPages, totalResults } = await fetchFilms(page);

  films.forEach((film) => {
    filmList.insertAdjacentHTML(
      "beforeend",
      `<li>
        <article class="movie-card" data-film-id="${film.id}">
          <img
            class="movie-card-poster"
            src="${buildImgUrl(film.poster_path)}"
            alt="Poster film ${film.title}"
          />
          <div class="movie-card-body">
            <h2 class="movie-card-title">${film.title}</h2>
            <div class="imdb-rating">
              <img class="imdb-badge" src="assets/images/IMDB_Logo.png" alt="IMDb" />
              <span class="imdb-score">${film.vote_average.toFixed(1)}</span>
              <img class="imdb-star" src="assets/icons/star-icon.svg" alt="" aria-hidden="true" />
            </div>
            <p class="movie-card-desc">${film.overview}</p>
            <div class="movie-card-actions">
              <a href="pages/movie-details.html?id=${film.id}" class="btn btn-outline" >
                View Details
              </a>
              <button class="btn btn-outline" type="button">
                Add to Watchlists
              </button>
            </div>
          </div>
        </article>
      </li>`,
    );
  });

  updatePagination(page, totalPages, totalResults);
};

const renderFilmsByImdb = async (page) => {
  filmList.innerHTML = "";

  const { films, totalPages, totalResults } = await fetchFilmsSortByImbd(page);

  films.forEach((film) => {
    filmList.insertAdjacentHTML(
      "beforeend",
      `<li>
        <article class="movie-card" data-film-id="${film.id}">
          <img
            class="movie-card-poster"
            src="${buildImgUrl(film.poster_path)}"
            alt="Poster film ${film.title}"
          />
          <div class="movie-card-body">
            <h2 class="movie-card-title">${film.title}</h2>
            <div class="imdb-rating">
              <img class="imdb-badge" src="assets/images/IMDB_Logo.png" alt="IMDb" />
              <span class="imdb-score">${film.vote_average.toFixed(1)}</span>
              <img class="imdb-star" src="assets/icons/star-icon.svg" alt="" aria-hidden="true" />
            </div>
            <p class="movie-card-desc">${film.overview}</p>
            <div class="movie-card-actions">
              <a href="pages/movie-details.html?id=${film.id}" class="btn btn-outline" >
                View Details
              </a>
              <button class="btn btn-outline" type="button">
                Add to Watchlists
              </button>
            </div>
          </div>
        </article>
      </li>`,
    );
  });

  updatePagination(page, totalPages, totalResults);
};

const updatePagination = (page, totalPages, totalResults) => {
  const from = (page - 1) * page + 1;
  const to = Math.min(page * page, totalResults);

  filmCount.textContent = `${totalResults}`;
  paginationRange.textContent = `${from} - ${to} of ${totalResults}`;

  btnPrev.disabled = page === 1;
  btnNext.disabled = page === totalPages;
};

btnSortImdb.addEventListener("click", () => {
  const isPressed = btnSortImdb.getAttribute("aria-pressed") === "true";
  const state = !isPressed;
  btnSortImdb.setAttribute("aria-pressed", state);

  if (state) {
    renderFilmsByImdb(currentPage);
    btnSortImdb.classList.add("active");
  } else {
    renderFilms(currentPage);
    btnSortImdb.classList.remove("active");
  }
});

btnPrev.addEventListener("click", () => {
  const isPressed = btnSortImdb.getAttribute("aria-pressed") === "true";
  currentPage--;
  if (isPressed) {
    renderFilmsByImdb(currentPage);
  } else {
    renderFilms(currentPage);
  }
});

btnNext.addEventListener("click", () => {
  const isPressed = btnSortImdb.getAttribute("aria-pressed") === "true";
  currentPage++;
  if (isPressed) {
    renderFilmsByImdb(currentPage);
  } else {
    renderFilms(currentPage);
  }
});

renderFilms(currentPage);
