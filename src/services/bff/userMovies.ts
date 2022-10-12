import { api } from "../apiClient";

interface IFindOneUserMovieRequest {
  movieId: number;
}

interface IFindOneUserMovieResponse {
  userId: string;
  movie: {
    movieId: number;
    watched: boolean;
    favorite: boolean;
    rating: number;
  };
}

interface IAddMovieToUserListRequest {
  movieId: number;
}

interface IAddMovieToUserListResponse {
  watched: boolean;
}

interface IUpdateMovieInUserListRequest {
  movieId?: number;
  watched?: boolean;
  favorite?: boolean;
  rating?: number;
}

interface IUpdateMovieInUserListResponse {
  movieId: number;
  watched: boolean;
  favorite: boolean;
  rating: number;
}

export async function findOneUserMovie({
  movieId,
}: IFindOneUserMovieRequest): Promise<IFindOneUserMovieResponse> {
  const { data } = await api.get<IFindOneUserMovieResponse>(
    `/users-movies/${movieId}`
  );
  return data;
}

export async function addMovieToUserList({
  movieId,
}: IAddMovieToUserListRequest): Promise<IAddMovieToUserListResponse> {
  const { data } = await api.post<IAddMovieToUserListResponse>(
    `/users-movies/${movieId}`, 
  );

  return data;
}

export async function updateMovieInUserList({
  movieId,
  watched,
  favorite,
  rating,
}: IUpdateMovieInUserListRequest): Promise<IUpdateMovieInUserListResponse> {
  const { data } = await api.put<IUpdateMovieInUserListResponse>(
    `/users-movies/${movieId}`, { watched, favorite, rating }
  );

  return data;
}