import { Dayjs } from "dayjs";
import { findMovieGenresByName } from "../../shared/utils/movieGenres";
import { findByName } from "../../shared/utils/movieProviders";
import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type IDiscoverMovie = {
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

export type GetDiscoverMoviesResponse = {
  discoverMovies: IDiscoverMovie[];
  totalResults: number;
};

export type GetDiscoverMoviesRequest = {
  page: number;
  search: string;
  sortBy: string | null;
  providers: string[];
  genders: string[];
  releaseYear: number | null;
};

export async function getDiscoverMovies({
  page,
  search,
  sortBy,
  providers,
  genders,
  releaseYear,
}: GetDiscoverMoviesRequest): Promise<GetDiscoverMoviesResponse> {
  let query = search;
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
      query,
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
      banner_path: `${axiosMoviesUrl.large}${movie.poster_path}`,
    };
  });

  return { discoverMovies, totalResults: data.total_results };
}
