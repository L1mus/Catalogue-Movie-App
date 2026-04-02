export const fetchFilms = async (page = 1) => {
  try {
    const response = await fetch(
      `/api/tmdb?endpoint=/discover/movie?language=en-US&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`Failed fetch data: ${response.status}`);
    }

    const data = await response.json();

    return {
      films: data.results,
      totalPages: 10,
      totalResults: 200,
    };
  } catch (error) {
    console.error("fetchMovies error:", error.message);
    throw error;
  }
};

export const buildImgUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

export const fetchFilmsSortByImbd = async (page = 1) => {
  try {
    const response = await fetch(
      `/api/tmdb?endpoint=/movie/top_rated?language=en-US&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`Failed fetch data: ${response.status}`);
    }

    const data = await response.json();

    return {
      films: data.results,
      totalPages: 10,
      totalResults: 200,
    };
  } catch (error) {
    console.error("fetchMovies error:", error.message);
    throw error;
  }
};

export const fetchDetailFilm = async (movie_id) => {
  try {
    const responseDetailFilm = await fetch(
      `/api/tmdb?endpoint=/movie/${movie_id}`,
    );

    if (!responseDetailFilm.ok) {
      throw new Error(`Failed fetch data film: ${responseDetailFilm.status}`);
    }

    const dataDetailFilm = await responseDetailFilm.json();

    const responseCredits = await fetch(
      `/api/tmdb?endpoint=/movie/${movie_id}/credits`,
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
      `/api/tmdb?endpoint=/genre/movie/list?language=en-US`,
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
      `/api/tmdb?endpoint=/discover/movie?genres=${genreId}&language=en-US&page=${page}`,
    );

    console.log(response.status);

    if (!response.ok) {
      throw new Error(`Failed fetch films by genre: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return {
      films: data.results,
      totalPages: 10,
      totalResults: 200,
    };
  } catch (error) {
    console.error("fetchFilmsByGenre error:", error.message);
    throw error;
  }
};
