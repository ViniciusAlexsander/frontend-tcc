import { red } from "@mui/material/colors";
import { api } from "../apiClient";
import { getMovieDetails, IMovieDetails } from "../movies/movieDetails";

export type ICreateGroupSessionRequest = {
  groupId: string;
  movieId: string;
  assistedInId: string;
};

export type IFindGroupSessionsRequest = {
  groupId: string;
};

export type IFindGroupSessionsResponse = {
  id: string;
  movieId: string;
  groupId: string;
  assistedInId: string;
  createdAt: Date;
};

export interface ISession {
  id: string;
  groupId: string;
  assistedInId: string;
  createdAt: Date;
  movie: IMovieDetails;
}

export async function createGroupSession({
  groupId,
  movieId,
  assistedInId,
}: ICreateGroupSessionRequest) {
  const { data } = await api.post("/sessions", {
    groupId,
    movieId,
    assistedInId,
  });
  return data;
}

export async function findGroupSessions({
  groupId,
}: IFindGroupSessionsRequest): Promise<ISession[]> {
  console.log("findGroupSessions", groupId);

  const { data } = await api.get<IFindGroupSessionsResponse[]>("/sessions", {
    params: { id: groupId },
  });

  console.log("findGroupSessions", data);

  let sessions: ISession[] = [];

  await Promise.all(
    data.map((session: IFindGroupSessionsResponse) => {
      return getMovieDetails(session.movieId)
        .then((res) =>
          sessions.push({
            id: session.id,
            assistedInId: session.assistedInId,
            createdAt: session.createdAt,
            groupId: session.groupId,
            movie: {
              adult: res.movieDetails.adult,
              backdrop_path: res.movieDetails.backdrop_path,
              belongs_to_collection: res.movieDetails.belongs_to_collection,
              budget: res.movieDetails.budget,
              genres: res.movieDetails.genres,
              homepage: res.movieDetails.homepage,
              id: res.movieDetails.id,
              imdb_id: res.movieDetails.imdb_id,
              original_language: res.movieDetails.original_language,
              original_title: res.movieDetails.original_title,
              overview: res.movieDetails.overview,
              popularity: res.movieDetails.popularity,
              poster_path: res.movieDetails.poster_path,
              release_date: res.movieDetails.release_date,
              runtime: res.movieDetails.runtime,
              title: res.movieDetails.title,
              video: res.movieDetails.video,
              vote_average: res.movieDetails.vote_average,
              vote_count: res.movieDetails.vote_count,
            },
          })
        )
        .catch((error) => {
          console.log(error);
        });
    })
  );

  return sessions;
}
