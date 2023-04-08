import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosInstance";
import { DjangoResponseByIdBody, DjangoResponseListBody } from "./Types";
import { BaseSettingFurnaceItemType } from "@/components/BaseSettingFurnace/BaseSettingFurnaceItem";
import { BaseSettingChargeRateType } from "@/components/BaseSettingFurnace/BaseSettingChargeRate";

type GetFurnaceSettingListItem = {
  id?: number;
  name: string;
  is_active: boolean;
  data?: {
    chargeRate: BaseSettingChargeRateType;
    furnaces: BaseSettingFurnaceItemType[];
  };
};

export function GetFurnaceSettingList() {
  async function fetchData(): Promise<
    DjangoResponseListBody<GetFurnaceSettingListItem>
  > {
    const { data } = await axiosClient.get("/furnace-setting");
    return data;
  }
  return useQuery(["GetFurnaceSettingList"], fetchData);
}

export function GetFurnaceSettingById(itemId: string) {
  async function fetchData(): Promise<
    DjangoResponseByIdBody<GetFurnaceSettingListItem>
  > {
    const { data } = await axiosClient.get(`/furnace-setting/${itemId}`);
    return data;
  }
  return useQuery(["GetFurnaceSettingById", itemId], fetchData);
}

export function CreateFurnaceSetting() {
  async function createFurnaceSetting(newData: GetFurnaceSettingListItem) {
    const { data } = await axiosClient.post("/furnace-setting/", newData);
    return data;
  }

  return useMutation((changedData: GetFurnaceSettingListItem) =>
    createFurnaceSetting(changedData)
  );
}

export function PatchFurnaceSetting() {
  async function updateFurnaceSetting(updatedData: GetFurnaceSettingListItem) {
    const { data } = await axiosClient.patch(
      `/furnace-setting/${updatedData.id}/`,
      updatedData
    );
    return data;
  }

  return useMutation((changedData: GetFurnaceSettingListItem) =>
    updateFurnaceSetting(changedData)
  );
}
