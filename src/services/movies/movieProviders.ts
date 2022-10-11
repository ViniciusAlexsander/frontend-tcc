import { IGenre } from "../../shared/utils/movieGenres";
import { axiosMovies, axiosMoviesUrl } from "../apiMovieDb";

export interface ICategoryDetails {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface IMovieProviders {
  link: string;
  rent?: ICategoryDetails[];
  flatrate?: ICategoryDetails[];
  buy?: ICategoryDetails[];
}

export type GetMovieProvidersResponse = {
  id: number;
  results: {
    BR: IMovieProviders;
  };
};

export async function getMovieProvidersDetails(
  movieId: string
): Promise<IMovieProviders> {
  const { data } = await axiosMovies.get<GetMovieProvidersResponse>(
    `/movie/${movieId}/watch/providers`
  );

  const movieProviders = {
    ...data.results.BR,
    rent: data.results.BR?.rent?.map((provider) => {
      return {
        ...provider,
        logo_path: `${axiosMoviesUrl.small}${provider.logo_path}`,
      };
    }),
    buy: data.results.BR?.buy?.map((provider) => {
      return {
        ...provider,
        logo_path: `${axiosMoviesUrl.small}${provider.logo_path}`,
      };
    }),
    flatrate: data.results.BR?.flatrate?.map((provider) => {
      return {
        ...provider,
        logo_path: `${axiosMoviesUrl.small}${provider.logo_path}`,
      };
    }),
  };

  return movieProviders;
}
