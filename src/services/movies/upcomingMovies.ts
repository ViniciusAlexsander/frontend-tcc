import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type movie = {
  poster_path: string | null;
  title: string;
  genre_ids: number[];
  id: number;
  release_date: Date;
  original_title: string;
  vote_average: number;
  overview: string;
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
    };
  });

  return { upComingMovies, totalResults: data.total_results };
}
