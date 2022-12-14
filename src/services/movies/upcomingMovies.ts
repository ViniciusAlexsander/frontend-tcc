import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type movie = {
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

export type GetTopRatedMoviesResponse = {
  upComingMovies: movie[];
  totalResults: number;
};

export async function getUpcomingMovies(
  page: number
): Promise<GetTopRatedMoviesResponse> {
  const { data } = await axiosMovies.get(`/movie/upcoming`, {
    params: { page, region: "BR" },
  });

  const upComingMovies = data.results.map((movie) => {
    return {
      ...movie,
      release_date: new Date(movie.release_date),
      poster_path: `${axiosMoviesUrl.small}${movie.poster_path}`,
      backdrop_path: `${axiosMoviesUrl.large}${movie.backdrop_path}`,
    };
  });

  return { upComingMovies, totalResults: data.total_results };
}
