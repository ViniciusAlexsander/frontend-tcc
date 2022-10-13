import { api } from "../apiClient";
import { setupAPIClient } from "../api";

export type ICheckAdminGroupRequest = {
  groupId: string;
};

export type ICheckAdminGroupResponse = {
  isAdmin: boolean;
};

export async function checkAdminGroup({
  groupId,
}: ICheckAdminGroupRequest): Promise<ICheckAdminGroupResponse> {
  const { data } = await api.get<ICheckAdminGroupResponse>(
    "/groups-users/check-admin",
    {
      params: { groupId },
    }
  );
  return data;
}

export async function checkAdminGroupServerSide(
  { groupId }: ICheckAdminGroupRequest,
  ctx
): Promise<ICheckAdminGroupResponse> {
  const apiClient = setupAPIClient(ctx);
  const { data } = await apiClient.get<ICheckAdminGroupResponse>(
    "/groups-users/check-admin",
    {
      params: { groupId },
    }
  );
  return data;
}
