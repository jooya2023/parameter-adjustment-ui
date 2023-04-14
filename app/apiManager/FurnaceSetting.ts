import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosInstance";
import { DjangoResponseByIdBody, DjangoResponseListBody } from "./Types";
import { BaseSettingFurnaceItemType } from "@/components/BaseSettingFurnace/BaseSettingFurnaceItem";
import { BaseSettingChargeRateType } from "@/components/BaseSettingFurnace/BaseSettingChargeRate";

type FurnaceSettingItem = {
  id?: number | string;
  name: string;
  is_active: boolean;
  data?: {
    chargeRate: BaseSettingChargeRateType;
    furnaces: BaseSettingFurnaceItemType[];
  };
};

export function GetFurnaceSettingList() {
  async function fetchData(): Promise<
    DjangoResponseListBody<FurnaceSettingItem>
  > {
    const { data } = await axiosClient.get("/furnace-setting");
    return data;
  }
  return useQuery(["GetFurnaceSettingList"], fetchData);
}

export function GetFurnaceSettingById(itemId: string) {
  async function fetchData(): Promise<
    DjangoResponseByIdBody<FurnaceSettingItem>
  > {
    const { data } = await axiosClient.get(`/furnace-setting/${itemId}`);
    return data;
  }
  return useQuery(["GetFurnaceSettingById", itemId], fetchData);
}

export function CreateFurnaceSetting() {
  async function createFurnaceSetting(newData: FurnaceSettingItem) {
    const { data } = await axiosClient.post("/furnace-setting/", newData);
    return data;
  }

  return useMutation((changedData: FurnaceSettingItem) =>
    createFurnaceSetting(changedData)
  );
}

export function PatchFurnaceSetting() {
  async function updateFurnaceSetting(updatedData: FurnaceSettingItem) {
    const { data } = await axiosClient.patch(
      `/furnace-setting/${updatedData.id}/`,
      updatedData
    );
    return data;
  }

  return useMutation((changedData: FurnaceSettingItem) =>
    updateFurnaceSetting(changedData)
  );
}

export function UploadFileInFurnaceSetting() {
  async function uploadFileInFurnaceSetting(
    id: number | string,
    file: File | null
  ) {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    const { data } = await axiosClient.patch(
      `/furnace-setting/file/${id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }

  return useMutation(
    (changedData: { id: string | number; file: File | null }) =>
      uploadFileInFurnaceSetting(changedData.id, changedData.file)
  );
}
