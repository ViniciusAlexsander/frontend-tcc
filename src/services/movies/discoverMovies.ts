import { IMovie } from "../../shared/models/movies/IMovie";
import { findMovieGenresByName } from "../../shared/utils/movieGenres";
import { findByName } from "../../shared/utils/movieProviders";
import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type GetDiscoverMoviesResponse = {
  discoverMovies: IMovie[];
  totalResults: number;
  totalPages: number;
};

export type GetDiscoverMoviesRequest = {
  page: number;
  sortBy: string | null;
  providers: string[];
  genders: string[];
  releaseYear: number | null;
};

export async function getDiscoverMovies({
  page,
  sortBy,
  providers,
  genders,
  releaseYear,
}: GetDiscoverMoviesRequest): Promise<GetDiscoverMoviesResponse> {
  let providersIds = findByName(providers)
    .map((provider) => provider.provider_id)
    .join("|");

  let gendersIds = findMovieGenresByName(genders)
    .map((gender) => gender.id)
    .join("|");

  const { data } = await axiosMovies.get("/discover/movie", {
    params: {
      page,
      watch_region: "BR",
      sort_by: sortBy,
      with_watch_providers: providersIds,
      with_genres: gendersIds,
      primary_release_year: releaseYear,
    },
  });

  const discoverMovies = data.results.map((movie) => {
    return {
      ...movie,
      release_date: new Date(movie.release_date),
      poster_path: `${axiosMoviesUrl.small}${movie.poster_path}`,
      backdrop_path: `${axiosMoviesUrl.large}${movie.backdrop_path}`,
    };
  });

  return {
    discoverMovies,
    totalResults: data.total_results,
    totalPages: data.total_pages,
  };
}
