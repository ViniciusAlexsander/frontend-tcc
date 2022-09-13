import { api } from "../api";

export type IFindUserResponse = {
  id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: Date;
};

export async function findUsers(): Promise<IFindUserResponse[]> {
  const { data } = await api.get<IFindUserResponse[]>("/users");
  return data;
}
