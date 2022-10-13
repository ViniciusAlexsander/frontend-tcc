import { api } from "../apiClient";
import { setupAPIClient } from "../api";
import { getMovieDetails, IMovieDetails } from "../movies/movieDetails";

export interface IMovieResponse {
  movieId: string;
  watched: boolean;
  favorite: boolean;
  rating: number | null;
}

export interface IGetUserMoviesRequest {
  search: string;
  moviesStatus: string[];
}

export interface IGetUserMoviesResponse {
  userId: string;
  movies: IMovieResponse[];
}

export interface IUserMovies extends IMovieDetails {
  movieId: string;
  watched: boolean;
  favorite: boolean;
  rating: number | null;
}

export async function getUserMovies({
  search,
  moviesStatus,
}: IGetUserMoviesRequest): Promise<IUserMovies[]> {
  let favorite =
    moviesStatus.find((status) => status === "Favoritos") !== undefined
      ? true
      : undefined;
  let assistidos = moviesStatus.find((status) => status === "Assistidos");
  let assistir = moviesStatus.find((status) => status === "Á assistir");
  let watched = null;
  if (assistidos && !assistir) watched = 1;
  if (!assistidos && assistir) watched = 2;
  if (assistidos && assistir) watched = 0;

  const { data } = await api.get<IGetUserMoviesResponse>("/users-movies", {
    params: {
      search,
      favorite: favorite,
      watched: watched,
    },
  });

  let userMovies: IUserMovies[] = [];

  if (data.movies.length > 0) {
    await Promise.all(
      data.movies.map((movie: IMovieResponse) => {
        return getMovieDetails(movie.movieId).then((res) =>
          userMovies.push({
            ...res.movieDetails,
            ...movie,
          })
        );
      })
    );
  }

  return userMovies;
}
