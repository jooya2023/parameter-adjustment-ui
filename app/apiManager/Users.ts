import { useMutation, useQuery } from "@tanstack/react-query";
import { DjangoResponseByIdBody, DjangoResponseListBody } from "./Types";
import axiosClient from "../utils/axiosInstance";

type UserItem = {
  id?: number | string;
  username: string;
  user_type?: {
    id: number | string;
    name: string;
  };
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

export function GetUsersList() {
  async function fetchData(): Promise<DjangoResponseListBody<UserItem>> {
    const { data } = await axiosClient.get("/users");
    return data;
  }
  return useQuery(["GetUsersList"], fetchData);
}

export function GetUserById(itemId: string) {
  async function fetchData(): Promise<DjangoResponseByIdBody<UserItem>> {
    const { data } = await axiosClient.get(`/users/${itemId}`);
    return data;
  }
  return useQuery(["GetUserById", itemId], fetchData);
}

export function PatchUser() {
  async function updateUser(updatedData: UserItem) {
    const { data } = await axiosClient.patch(`/users/${updatedData.id}/`, {
      ...updatedData,
      user_type:
        updatedData.user_type?.id === -1 ? null : updatedData.user_type?.id,
    });
    return data;
  }

  return useMutation((changedData: UserItem) => updateUser(changedData));
}

export function CreateUser() {
  async function createFurnaceSetting(newData: UserItem) {
    const { data } = await axiosClient.post("/users/register/", {
      ...newData,
      user_type: newData.user_type?.id === -1 ? null : newData.user_type?.id,
    });
    return data;
  }

  return useMutation((changedData: UserItem) =>
    createFurnaceSetting(changedData)
  );
}
