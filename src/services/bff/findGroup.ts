import { api } from "../apiClient";
import { setupAPIClient } from "../api";

export type IFindGroupUsersResponse = {
  id: string;
  name: string;
  joinedAt: Date;
};

export type IFindGroupRequest = {
  id?: string | null;
  title?: string | null;
};

export type IFindGroupResponse = {
  id: string;
  title: string;
  description: string;
  users: IFindGroupUsersResponse[];
};

export async function findGroups({
  id,
  title,
}: IFindGroupRequest): Promise<IFindGroupResponse[]> {
  const { data } = await api.get<IFindGroupResponse[]>("/groups", {
    params: { id, title },
  });
  return data;
}

export async function findGroupsServerSide(
  { id, title }: IFindGroupRequest,
  ctx
): Promise<IFindGroupResponse[]> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<IFindGroupResponse[]>("/groups", {
    params: { id, title },
  });
  return data;
}
