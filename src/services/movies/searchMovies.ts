import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type searchMovie = {
  poster_path: string | null;
  banner_path: string | null;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type GetSearchMoviesResponse = {
  searchMovies: searchMovie[];
  totalResults: number;
};

export async function getSearchMovies(
  page: number,
  search: string,
): Promise<GetSearchMoviesResponse> {
  let query = search;
  const { data } = await axiosMovies.get("/discover/movie", {
    params: { page, query, sort_by: "popularity.asc" },
  });

  const searchMovies = data.results.map((movie) => {
    return {
      ...movie,
      release_date: new Date(movie.release_date),
      poster_path: `${axiosMoviesUrl.small}${movie.poster_path}`,
      banner_path: `${axiosMoviesUrl.large}${movie.poster_path}`,
    };
  });

  return { searchMovies, totalResults: data.total_results };
}
