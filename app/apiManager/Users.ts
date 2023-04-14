import { useMutation, useQuery } from "@tanstack/react-query";
import { DjangoResponseByIdBody, DjangoResponseListBody } from "./Types";
import axiosClient from "../utils/axiosInstance";

export type UserItem = {
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

export function GetMy() {
  async function getMy(): Promise<DjangoResponseByIdBody<UserItem>> {
    const { data } = await axiosClient.get("/users/my");
    return data;
  }
  return useQuery(["GetMy"], getMy);
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

export function ChangeUserPassword() {
  async function changeUserPassword(updatedData: {
    id: number | string;
    newPassword: string;
  }) {
    const { data } = await axiosClient.patch(
      `/users/reset-password/${updatedData.id}/`,
      {
        password: updatedData.newPassword,
      }
    );
    return data;
  }

  return useMutation(
    (changedData: { id: number | string; newPassword: string }) =>
      changeUserPassword(changedData)
  );
}

export function LogOutUser() {
  async function logOutUser() {
    const { data } = await axiosClient.post("/users/logout/", {
      refresh: localStorage.getItem("refresh-token"),
    });
    return data;
  }

  return useMutation(() => logOutUser());
}
