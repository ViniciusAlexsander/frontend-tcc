import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export interface IMovieCast {
  adult: boolean;
  gender: number | null;
  id: number;
  original_name: string;
  character: string;
  profile_path: string | null;
}

export type GetMovieCreditsResponse = {
  cast: IMovieCast[];
};

export async function getMovieCredits(
  movieId: string
): Promise<GetMovieCreditsResponse> {
  const { data } = await axiosMovies.get<GetMovieCreditsResponse>(
    `/movie/${movieId}/credits`
  );

  const response = {
    cast: data.cast.map((cast) => {
      return {
        ...cast,
        profile_path: `${axiosMoviesUrl.small}${cast.profile_path}`,
      };
    }),
  };

  return response;
}
