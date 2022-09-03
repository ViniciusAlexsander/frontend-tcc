import axios from "axios";

export const axiosMovies = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_MOVIES_API,
  params: {
    api_key: process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY,
    language: "pt-BR",
    region: "BR",
  },
});

export const axiosMoviesUrl = {
  small: "https://image.tmdb.org/t/p/w185",
  medium: "https://image.tmdb.org/t/p/w300",
  large: "https://image.tmdb.org/t/p/w1280",
  original: "https://image.tmdb.org/t/p/original",
};
