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

export type ParameterCalc = {
  data: {
    opt_actions_output: {
      end_time: string;
      start_time: string;
      furnace: string;
    }[];
    opt_w_in_time: {
      data: {
        dolomite: {
          data: number[];
          name: string;
        }[];
        iron: {
          data: number[];
          name: string;
        }[];
        lime: {
          data: number[];
          name: string;
        }[];
      };
      time: string[];
    };
    opt_shooting_list: {
      start_time: string;
      duration: number;
      data: {
        furnace_1: string;
        furnace_2: string;
        notification_time: string;
      }[];
    }[];
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

export function GetParametersResult() {
  async function fetchData(): Promise<DjangoResponseListBody<ParameterCalc>> {
    const { data } = await axiosClient.get("/parameter/calc-data");
    return data;
  }
  return useQuery(["GetParametersResult"], fetchData);
}

export function RebuildParametersResult() {
  async function rebuildParametersResult(): Promise<
    DjangoResponseListBody<ParameterCalc>
  > {
    const { data } = await axiosClient.post("/parameter/calc/");
    return data;
  }
  return useMutation(() => rebuildParametersResult());
}
