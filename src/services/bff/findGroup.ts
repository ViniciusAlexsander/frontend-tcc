import { api } from "../api";

export type IFindGroupUsersResponse = {
  id: string;
  name: string;
  joinedAt: Date;
};

export type IFindGroupRequest = {
  groupId: string | undefined;
  name: string | undefined;
};

export type IFindGroupResponse = {
  id: string;
  title: string;
  description: string;
  users: IFindGroupUsersResponse[];
};

export async function findGroups(
  id: string | null,
  title: string | null
): Promise<IFindGroupResponse[]> {
  const { data } = await api.get<IFindGroupResponse[]>("/groups", {
    params: { id, title },
  });
  return data;
}
