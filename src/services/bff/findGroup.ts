import { api } from "../api";

export type IFindGroupUsersResponse = {
  id: string;
  name: string;
  user_name: string;
  email: string;
  description: null;
  created_at: string;
};

export type IFindGroupRequest = {
  groupId: string | undefined;
  name: string | undefined;
};

export type IFindGroupResponse = {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  users: IFindGroupUsersResponse[];
};

export async function findGroup(
  groupId: string | undefined,
  name: string | undefined
): Promise<IFindGroupResponse[]> {
  const { data } = await api.get<IFindGroupResponse[]>("/groups", {
    params: { groupId, name },
  });
  return data;
}
