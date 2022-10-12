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
  let favorite = moviesStatus.filter((status) => status === "Favoritos");
  let assistidos = moviesStatus.filter((status) => status === "Assistidos");
  let assistir = moviesStatus.filter((status) => status === "Á assistir");
  let watched = !!assistir && !!assistidos;
  watched = !watched && (assistir || assistidos) ? false : true;

  console.log("favorite", favorite);
  console.log("watched", watched);

  const { data } = await api.get<IGetUserMoviesResponse>("/users-movies", {
    params: {
      search,
      favorite: !!favorite,
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
