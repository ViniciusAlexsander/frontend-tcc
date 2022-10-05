import { api } from "../apiClient";

export type IAddUserInGroupRequest = {
  groupId: string;
  movieId: string;
  assistedInId: string;
};

export async function createGroupSession({
  groupId,
  movieId,
  assistedInId,
}: IAddUserInGroupRequest) {
  const { data } = await api.post("/sessions", {
    groupId,
    movieId,
    assistedInId,
  });
  return data;
}
