import { DjangoResponseByIdBody, DjangoResponseListBody } from "./Types";
import axiosClient from "../utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ParameterFurnaceItemType } from "@/components/ParameterFurnace/ParameterFurnaceItem";
import { gateStatusType } from "@/components/gateStatus/gateStatus";

type ParameterSetting = {
  id?: number | string;
  name: string;
  is_active: boolean;
  data?: {
    furnaces: ParameterFurnaceItemType[];
    gatesStatus: gateStatusType[];
  };
};

export function GetParameterSettingList() {
  async function fetchData(): Promise<
    DjangoResponseListBody<ParameterSetting>
  > {
    const { data } = await axiosClient.get("/parameter");
    return data;
  }
  return useQuery(["GetFurnaceSettingList"], fetchData);
}
export function GetParameterSettingById(itemId: string) {
  async function fetchData(): Promise<
    DjangoResponseByIdBody<ParameterSetting>
  > {
    const { data } = await axiosClient.get(`/parameter/${itemId}`);
    return data;
  }
  return useQuery(["GetParameterSettingById", itemId], fetchData);
}

export function CreateParameterSetting() {
  async function createParameterSetting(newData: ParameterSetting) {
    const { data } = await axiosClient.post("/parameter/", newData);
    return data;
  }

  return useMutation((changedData: ParameterSetting) =>
    createParameterSetting(changedData)
  );
}

export function PatchParameterSetting() {
  async function updateParameterSetting(updatedData: ParameterSetting) {
    const { data } = await axiosClient.patch(
      `/parameter/${updatedData.id}/`,
      updatedData
    );
    return data;
  }

  return useMutation((changedData: ParameterSetting) =>
    updateParameterSetting(changedData)
  );
}
