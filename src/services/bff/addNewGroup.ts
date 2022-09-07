import { api } from "../api";

export type PostNewGroupRequest = {
  title: string;
  description: string;
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
