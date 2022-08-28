import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export type nowPlayingMovie = {
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

export type GetNowPlayingMoviesResponse = {
  nowPlayingMovies: nowPlayingMovie[];
  totalResults: number;
};

export async function getNowPlayingMovies(
  page: number
): Promise<GetNowPlayingMoviesResponse> {
  const { data } = await axiosMovies.get("/movie/now_playing", {
    params: { page },
  });

  const nowPlayingMovies = data.results.map((movie) => {
    return {
      ...movie,
      release_date: new Date(movie.release_date),
      poster_path: `${axiosMoviesUrl.small}${movie.poster_path}`,
    };
  });

  return { nowPlayingMovies, totalResults: data.total_results };
}
