import { api } from "../apiClient";

export type PostNewGroupRequest = {
  title: string;
  description: string;
};

export type DeleteGroupRequest = {
  groupId: string;
};

export async function postNewGroup({
  title,
  description,
}: PostNewGroupRequest) {
  await api.post("groups", {
    title,
    description,
  });
}

export async function deleteGroup({ groupId }: DeleteGroupRequest) {
  await api.delete(`groups/${groupId}`);
}
