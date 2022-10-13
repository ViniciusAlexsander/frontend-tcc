import { IGenre } from "../../shared/utils/movieGenres";
import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export interface IMovieDetails {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection: any | null;
  budget: number;
  genres: IGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: Date;
  runtime: number | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string | null;
}

export type GetMovieDetailsResponse = {
  movieDetails: IMovieDetails;
};

export async function getMovieDetails(
  movieId: string
): Promise<GetMovieDetailsResponse> {
  const { data } = await axiosMovies.get(`/movie/${movieId}`);

  const movieDetails = {
    ...data,
    release_date: new Date(data.release_date),
    poster_path: `${axiosMoviesUrl.small}${data.poster_path}`,
    backdrop_path: `${axiosMoviesUrl.large}${data.backdrop_path}`,
  };

  return { movieDetails };
}
