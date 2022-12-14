import { Dayjs } from "dayjs";
import { api } from "../apiClient";
import { getMovieDetails, IMovieDetails } from "../movies/movieDetails";

export type ICreateGroupSessionRequest = {
  groupId: string;
  movieId: string;
  assistedInId: string;
  sessionDay: Dayjs;
};

export type IDeleteGroupSessionRequest = {
  sessionId: string;
};

export type IFindGroupSessionsRequest = {
  groupId: string;
};

export type IJoinSessionRequest = {
  sessionId: string;
};

export type ILeaveSessionRequest = {
  sessionId: string;
};

export type IFindGroupSessionsResponse = {
  id: string;
  movieId: string;
  groupId: string;
  assistedInId: string;
  sessionDay: Date;
  users: IUser[];
  createdAt: Date;
};

export type IUser = {
  id: string;
  username: string;
};

export interface ISession {
  id: string;
  groupId: string;
  assistedInId: string;
  createdAt: Date;
  sessionDay: Date;
  users: IUser[];
  movie: IMovieDetails;
}

export async function createGroupSession({
  groupId,
  movieId,
  assistedInId,
  sessionDay,
}: ICreateGroupSessionRequest) {
  const { data } = await api.post("/sessions", {
    groupId,
    movieId,
    assistedInId,
    sessionDay,
  });
  return data;
}

export async function deleteGroupSession({
  sessionId,
}: IDeleteGroupSessionRequest) {
  return await api.delete(`/sessions/${sessionId}`);
}

export async function findGroupSessions({
  groupId,
}: IFindGroupSessionsRequest): Promise<ISession[]> {
  const { data } = await api.get<IFindGroupSessionsResponse[]>("/sessions", {
    params: { groupId },
  });

  let sessions: ISession[] = [];

  if (data.length > 0) {
    await Promise.all(
      data.map((session: IFindGroupSessionsResponse) => {
        return getMovieDetails(session.movieId)
          .then((res) =>
            sessions.push({
              id: session.id,
              assistedInId: session.assistedInId,
              sessionDay: session.sessionDay,
              createdAt: session.createdAt,
              groupId: session.groupId,
              users: session.users,
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
                tagline: res.movieDetails.tagline,
              },
            })
          )
          .catch((error) => {
            console.log(error);
          });
      })
    );
  }

  return sessions;
}

export async function joinSession({ sessionId }: IJoinSessionRequest) {
  await api.post("/sessions-users", {
    sessionId,
  });
}

export async function leaveSession({ sessionId }: ILeaveSessionRequest) {
  return await api.delete(`/sessions-users/${sessionId}`);
}
