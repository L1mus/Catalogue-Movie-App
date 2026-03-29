import { configAPI } from "../env.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${configAPI.accessToken}`,
  },
};

export const fetchFilms = async (page = 1) => {
  try {
    const response = await fetch(
      `${configAPI.baseUrl}/movie/now_playing?language=en-US&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(`Failed fetch data: ${response.status}`);
    }

    const data = await response.json();

    return {
      films: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error("fetchMovies error:", error.message);
    throw error;
  }
};

export const buildImgUrl = (posterPath) => {
  return `${configAPI.imgBaseUrl}${posterPath}`;
};

export const fetchFilmsSortByImbd = async (page = 1) => {
  try {
    const response = await fetch(
      `${configAPI.baseUrl}/movie/top_rated?language=en-US&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(`Failed fetch data: ${response.status}`);
    }

    const data = await response.json();

    return {
      films: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error("fetchMovies error:", error.message);
    throw error;
  }
};

export const fetchDetailFilm = async (movie_id) => {
  try {
    const responseDetailFilm = await fetch(
      `${configAPI.baseUrl}/movie/${movie_id}`,
      options,
    );

    if (!responseDetailFilm.ok) {
      throw new Error(`Failed fetch data film: ${responseDetailFilm.status}`);
    }

    const dataDetailFilm = await responseDetailFilm.json();

    const responseCredits = await fetch(
      `${configAPI.baseUrl}/movie/${movie_id}/credits`,
      options,
    );

    if (!responseCredits.ok) {
      throw new Error(`Failed fetch data film: ${responseCredits.status}`);
    }

    const dataCredits = await responseCredits.json();

    return {
      id: dataDetailFilm.id,
      title: dataDetailFilm.original_title,
      poster: dataDetailFilm.poster_path,
      genres: dataDetailFilm.genres,
      release: dataDetailFilm.release_date,
      imdb_rating: dataDetailFilm.vote_average,
      cast: dataCredits.cast,
      crew: dataCredits.crew,
      description: dataDetailFilm.overview,
    };
  } catch (error) {
    console.error("fetchMovies error:", error.message);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${configAPI.baseUrl}/genre/movie/list?language=en-US`,
      options,
    );

    if (!response.ok) {
      throw new Error(`Failed fetch genres: ${response.status}`);
    }

    const data = await response.json();

    return data.genres;
  } catch (error) {
    console.error("fetchGenres error:", error.message);
    throw error;
  }
};

export const fetchFilmsByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetch(
      `${configAPI.baseUrl}/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(`Failed fetch films by genre: ${response.status}`);
    }

    const data = await response.json();

    return {
      films: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error("fetchFilmsByGenre error:", error.message);
    throw error;
  }
};
