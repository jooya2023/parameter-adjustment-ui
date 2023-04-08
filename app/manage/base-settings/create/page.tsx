"use client";

import {
  CreateFurnaceSetting,
  GetFurnaceSettingById,
} from "@/app/apiManager/FurnaceSetting";
import BaseSettingFurnaceItem, {
  BaseSettingFurnaceItemType,
} from "@/components/BaseSettingFurnace/BaseSettingFurnaceItem";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import BaseSettingChargeRate, {
  BaseSettingChargeRateType,
} from "@/components/BaseSettingFurnace/BaseSettingChargeRate";
import { useRouter } from "next/navigation";

type BaseSettingsType = {
  furnaces: BaseSettingFurnaceItemType[];
  chargeRate: BaseSettingChargeRateType;
  name: string;
};

function BaseSettingsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [name, setName] = useState("");
  const [furnaces, setFurnaces] = useState<BaseSettingFurnaceItemType[]>([
    {
      id: 1,
      name: "کوره ۱",
      baseSettings: {
        tabToTab: "",
        powerOn: "",
      },
      usage: {
        lime: "",
        dolomite: "",
      },
      maxCapacity: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      minCapacity: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      arrivalDelay: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      emptyingDelay: {
        iron: "",
        lime: "",
        dolomite: "",
      },
    },
    {
      id: 2,
      name: "کوره ۲",
      baseSettings: {
        tabToTab: "",
        powerOn: "",
      },
      usage: {
        lime: "",
        dolomite: "",
      },
      maxCapacity: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      minCapacity: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      arrivalDelay: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      emptyingDelay: {
        iron: "",
        lime: "",
        dolomite: "",
      },
    },
    {
      id: 3,
      name: "کوره ۳",
      baseSettings: {
        tabToTab: "",
        powerOn: "",
      },
      usage: {
        lime: "",
        dolomite: "",
      },
      maxCapacity: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      minCapacity: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      arrivalDelay: {
        iron: "",
        lime: "",
        dolomite: "",
      },
      emptyingDelay: {
        iron: "",
        lime: "",
        dolomite: "",
      },
    },
  ]);
  const [chargeRate, setChargeRate] = useState<BaseSettingChargeRateType>({
    iron: "",
    lime: "",
    dolomite: "",
  });

  const router = useRouter();

  const { mutate, isLoading } = CreateFurnaceSetting();

  function handleChangeFurnace(
    data: BaseSettingFurnaceItemType,
    index: number
  ) {
    const temp = [...furnaces];
    temp[index] = data;
    setFurnaces(temp);
  }

  function handleCreate() {
    mutate({
      name: name,
      is_active: true,
      data: {
        furnaces,
        chargeRate,
      },
    });
    router.push("/manage/base-settings");
  }

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className="flex flex-row">
        <Typography variant="subtitle1" className="flex-1">
          تنظیمات پایه
        </Typography>

        <Button
          color="success"
          variant="contained"
          startIcon={<AiOutlineCheck />}
          onClick={() => handleCreate()}
          disabled={isLoading}
        >
          ثبت
        </Button>
      </div>
      <Card className="rounded-lg" elevation={4}>
        <CardContent>
          <div className="flex">
            <TextField
              label="نام تنظیمات"
              size="small"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <BaseSettingChargeRate
        data={chargeRate}
        onChangeData={(data) => setChargeRate(data)}
      />
      {furnaces.map((BaseSettingFurnaceDataItem, index) => {
        return (
          <BaseSettingFurnaceItem
            data={BaseSettingFurnaceDataItem}
            key={BaseSettingFurnaceDataItem.name}
            onChangeData={(data) => handleChangeFurnace(data, index)}
          />
        );
      })}
    </div>
  );
}

export default BaseSettingsPage;
