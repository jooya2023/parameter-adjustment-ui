"use client";

import {
  GetFurnaceSettingById,
  UpdateFurnaceSetting,
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

const BaseSetting: BaseSettingsType = {
  name: "",
  furnaces: [
    {
      id: 1,
      name: "کوره ۱",
      baseSettings: {
        tabToTab: "2",
        powerOn: "2",
      },
      usage: {
        lime: "2",
        dolomite: "2",
      },
      maxCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      minCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      arrivalDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      emptyingDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
    },
    {
      id: 2,
      name: "کوره ۲",
      baseSettings: {
        tabToTab: "2",
        powerOn: "2",
      },
      usage: {
        lime: "2",
        dolomite: "2",
      },
      maxCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      minCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      arrivalDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      emptyingDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
    },
    {
      id: 3,
      name: "کوره ۳",
      baseSettings: {
        tabToTab: "2",
        powerOn: "2",
      },
      usage: {
        lime: "2",
        dolomite: "2",
      },
      maxCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      minCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      arrivalDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      emptyingDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
    },
  ],
  chargeRate: {
    iron: "5",
    lime: "5",
    dolomite: "5",
  },
};

function BaseSettingsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data, isLoading } = GetFurnaceSettingById(`${params.id}`);
  const [name, setName] = useState("");
  const [furnaces, setFurnaces] = useState<BaseSettingFurnaceItemType[]>([
    {
      id: 1,
      name: "کوره ۱",
      baseSettings: {
        tabToTab: "2",
        powerOn: "2",
      },
      usage: {
        lime: "2",
        dolomite: "2",
      },
      maxCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      minCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      arrivalDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      emptyingDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
    },
    {
      id: 2,
      name: "کوره ۲",
      baseSettings: {
        tabToTab: "2",
        powerOn: "2",
      },
      usage: {
        lime: "2",
        dolomite: "2",
      },
      maxCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      minCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      arrivalDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      emptyingDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
    },
    {
      id: 3,
      name: "کوره ۳",
      baseSettings: {
        tabToTab: "2",
        powerOn: "2",
      },
      usage: {
        lime: "2",
        dolomite: "2",
      },
      maxCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      minCapacity: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      arrivalDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
      emptyingDelay: {
        iron: "2",
        lime: "2",
        dolomite: "2",
      },
    },
  ]);
  const [chargeRate, setChargeRate] = useState<BaseSettingChargeRateType>({
    iron: "",
    lime: "",
    dolomite: "",
  });

  const router = useRouter();

  function handleChangeFurnace(
    data: BaseSettingFurnaceItemType,
    index: number
  ) {
    const temp = [...furnaces];
    temp[index] = data;
    setFurnaces(temp);
  }

  const { mutate } = UpdateFurnaceSetting(params.id);
  function handleUpdate() {
    mutate({
      is_active: data?.result.is_active || false,
      name: name,
      data: {
        furnaces: furnaces,
        chargeRate: chargeRate,
      },
    });
    router.push("/manage/base-settings");
  }

  useEffect(() => {
    setName(data?.result.name || "");
    if (data?.result.data?.furnaces) {
      setFurnaces(data?.result.data?.furnaces);
    }
    if (data?.result.data?.chargeRate) {
      setChargeRate(data?.result.data?.chargeRate);
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress />;
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
          onClick={() => handleUpdate()}
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
