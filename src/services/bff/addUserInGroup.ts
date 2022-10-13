import { api } from "../apiClient";

export type IAddUserInGroupRequest = {
  groupId: string;
  userId: string;
};

export async function addUserInGroup({
  groupId,
  userId,
}: IAddUserInGroupRequest) {
  const { data } = await api.post("/groups-users", { userId, groupId });
  return data;
}
