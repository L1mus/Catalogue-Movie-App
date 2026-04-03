import { fetchDetailFilm, buildImgUrl } from "../api.js";

const breadcrumbTitle = document.querySelector("[data-js='breadcrumb-title']");
const detailFilm = document.querySelector("[data-js='detail-film']");

const getDetailId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

const id = getDetailId();

const renderGenre = async (genres, container) => {
  genres.forEach((element) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<span class="badge">${element.name}</span>`,
    );
  });
};

const renderDetail = async (id) => {
  const data = await fetchDetailFilm(id);
  console.log(data);
  breadcrumbTitle.textContent = data.title;
  detailFilm.insertAdjacentHTML(
    "beforeend",
    `      
        <div class="detail-poster">
          <img
            src="${buildImgUrl(data.poster)}"
            alt="Poster film ${data.title}"
            width="225"
            height="338"
            data-js="detail-poster"
          />
        </div>

        <div class="detail-info">
          <div class="badge-group" data-js="detail-genres">
          </div>

          <h1 class="detail-title" data-js="detail-title">${data.title}</h1>

          <div class="imdb-rating">
            <img
              class="imdb-badge"
              src="../assets/images/IMDB_Logo.png"
              alt="IMDb"
            />
            <span class="imdb-score" data-js="detail-score">${data.imdb_rating.toFixed(1)}</span>
            <img
              class="imdb-star"
              src="../assets/icons/star-icon.svg"
              alt=""
              aria-hidden="true"
            />
          </div>

          <p class="detail-desc" data-js="detail-desc">
            ${data.description}
          </p>

          <p class="detail-meta" data-js="detail-director">
            Director : <span >${data.crew
              .filter((i) => i.job === "Director")
              .map((c) => c.name)
              .join(", ")}</span>
          </p>

          <p class="detail-meta" data-js="detail-cast">
            Cast : <span>${data.cast
              .slice(0, 4)
              .map((c) => c.name)
              .join(", ")}</span>
          </p>

          <div class="detail-actions">
            <a
              href="#"
              class="btn btn-outline hidden"
              data-js="btn-trailer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </a>

            <button
              class="btn btn-outline"
              type="button"
              data-js="btn-watchlist"
              data-film-id="1"
              data-in-watchlist="false"
            >
              Add to Watchlist
            </button>
          </div>
        </div>`,
  );
  const genreFilm = document.querySelector("[data-js='detail-genres']");
  renderGenre(data.genres, genreFilm);
};

renderDetail(id);
