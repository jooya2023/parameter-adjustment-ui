"use client";

import { CreateFurnaceSetting } from "@/app/apiManager/FurnaceSetting";
import BaseSettingFurnaceItem, {
  BaseSettingFurnaceItemType,
} from "@/components/BaseSettingFurnace/BaseSettingFurnaceItem";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import BaseSettingChargeRate, {
  BaseSettingChargeRateType,
} from "@/components/BaseSettingFurnace/BaseSettingChargeRate";
import { useRouter } from "next/navigation";

function BaseSettingsPage() {
  const [name, setName] = useState("");
  const [furnaces, setFurnaces] = useState<BaseSettingFurnaceItemType[]>([
    {
      id: 1,
      name: "کوره ۱",
      baseSettings: {
        tabToTab: 0,
        powerOn: 0,
      },
      usage: {
        lime: 0,
        dolomite: 0,
      },
      maxCapacity: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      minCapacity: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      arrivalDelay: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      emptyingDelay: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
    },
    {
      id: 2,
      name: "کوره ۲",
      baseSettings: {
        tabToTab: 0,
        powerOn: 0,
      },
      usage: {
        lime: 0,
        dolomite: 0,
      },
      maxCapacity: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      minCapacity: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      arrivalDelay: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      emptyingDelay: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
    },
    {
      id: 3,
      name: "کوره ۳",
      baseSettings: {
        tabToTab: 0,
        powerOn: 0,
      },
      usage: {
        lime: 0,
        dolomite: 0,
      },
      maxCapacity: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      minCapacity: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      arrivalDelay: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
      emptyingDelay: {
        iron: 0,
        lime: 0,
        dolomite: 0,
      },
    },
  ]);
  const [chargeRate, setChargeRate] = useState<BaseSettingChargeRateType>({
    iron: 0,
    lime: 0,
    dolomite: 0,
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
