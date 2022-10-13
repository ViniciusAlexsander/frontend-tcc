import { IMovie } from "../../shared/models/movies/IMovie";
import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type GetSearchMoviesResponse = {
  searchMovies: IMovie[];
  totalResults: number;
  totalPages: number;
};

export type GetSearchMoviesRequest = {
  page: number;
  search: string;
};

export async function getSearchMovies({
  page,
  search,
}: GetSearchMoviesRequest): Promise<GetSearchMoviesResponse> {
  let query = search;

  const { data } = await axiosMovies.get("/search/movie", {
    params: {
      page,
      watch_region: "BR",
      query,
    },
  });

  const searchMovies = data.results.map((movie) => {
    return {
      ...movie,
      release_date: new Date(movie.release_date),
      poster_path: `${axiosMoviesUrl.small}${movie.poster_path}`,
      backdrop_path: `${axiosMoviesUrl.large}${movie.backdrop_path}`,
    };
  });

  return {
    searchMovies,
    totalResults: data.total_results,
    totalPages: data.total_pages,
  };
}
