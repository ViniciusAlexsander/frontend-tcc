import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type popularMovie = {
  poster_path: string | null;
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

export type GetPopularMoviesResponse = {
  popularMovies: popularMovie[];
  totalResults: number;
};

export async function getPopularMovies(
  page: number
): Promise<GetPopularMoviesResponse> {
  const { data } = await axiosMovies.get("/movie/popular", {
    params: { page },
  });

  const popularMovies = data.results.map((movie) => {
    return {
      ...movie,
      release_date: new Date(movie.release_date),
      poster_path: `${axiosMoviesUrl.small}${movie.poster_path}`,
    };
  });

  return { popularMovies, totalResults: data.total_results };
}
