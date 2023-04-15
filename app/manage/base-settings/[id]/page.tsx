"use client";

import {
  GetFurnaceSettingById,
  PatchFurnaceSetting,
  UploadFileInFurnaceSetting,
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
import { pagesLayoutData } from "@/components/Types";
import { toast } from "react-hot-toast";

type BaseSettingsType = {
  furnaces: BaseSettingFurnaceItemType[];
  chargeRate: BaseSettingChargeRateType;
  name: string;
};

function BaseSettingsPage({ params, searchParams }: pagesLayoutData) {
  const { data, isLoading, refetch } = GetFurnaceSettingById(`${params.id}`);
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
      id: 0,
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

  function handleChangeFurnace(
    data: BaseSettingFurnaceItemType,
    index: number
  ) {
    const temp = [...furnaces];
    temp[index] = data;
    setFurnaces(temp);
  }

  const { mutate } = PatchFurnaceSetting();
  const {
    mutate: mutateUpload,
    isLoading: uploadLoading,
    isSuccess: uploadSuccess,
  } = UploadFileInFurnaceSetting();
  function handleUpdate() {
    mutate({
      id: params.id,
      is_active: data?.result.is_active || false,
      name: name,
      data: {
        furnaces: furnaces,
        chargeRate: chargeRate,
      },
    });
    router.push("/manage/base-settings");
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    mutateUpload({
      id: params.id,
      file: e.target?.files ? e.target?.files[0] : null,
    });
    refetch();
  }

  useEffect(() => {
    if (uploadSuccess) {
      toast.success("فایل با موفقیت بارگذاری شد.");
    }
  }, [uploadSuccess]);

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

        <Button variant="contained" component="label" disabled={uploadLoading}>
          آپلود اکسل
          <input hidden type="file" onChange={(e) => handleUpload(e)} />
        </Button>
        <Button
          color="success"
          variant="contained"
          startIcon={<AiOutlineCheck />}
          onClick={() => handleUpdate()}
          className="mr-2"
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
