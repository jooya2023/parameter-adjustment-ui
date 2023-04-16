"use client";
import { CreateParameterSetting } from "@/app/apiManager/ParameterSetting";
import ParameterFurnaceItem, {
  ParameterFurnaceItemType,
} from "@/components/ParameterFurnace/ParameterFurnaceItem";
import GateStatus, { gateStatusType } from "@/components/gateStatus/gateStatus";
import { useGetFormatDateMinusMins } from "@/hooks/useGetFormatDateMinusMins";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload, AiOutlineCheck } from "react-icons/ai";

function calculateStartTime(selector: number) {
  const now = new Date();
  const nowMinus4 = new Date().setMinutes(now.getMinutes() - 4);
  const nowMinus8 = new Date().setMinutes(now.getMinutes() - 8);
  const nowMinus12 = new Date().setMinutes(now.getMinutes() - 12);
}

function ParameterSettingsPage() {
  const [furnaces, setFurnaces] = useState<ParameterFurnaceItemType[]>([
    {
      id: 1,
      name: "کوره ۱",
      ironUsage: {
        withoutSeed: 0,
        withSeed: 0,
      },
      tanks: [
        {
          id: 1,
          material: "آهن اسفنجی",
          name: "مخزن ۹",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 2,
          material: "آهن اسفنجی",
          name: "مخزن ۱۰",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 3,
          material: "لایم",
          name: "مخزن ۵",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 4,
          material: "دولومیت",
          name: "مخزن ۷",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 5,
          material: "پین کمکی",
          name: "مخزن ۱۰",
          amount: 0,
          inActiveDuration: 0,
        },
      ],
    },
    {
      id: 2,
      name: "کوره ۲",
      ironUsage: {
        withoutSeed: 0,
        withSeed: 0,
      },
      tanks: [
        {
          id: 1,
          material: "آهن اسفنجی",
          name: "مخزن ۹",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 2,
          material: "آهن اسفنجی",
          name: "مخزن ۱۰",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 3,
          material: "لایم",
          name: "مخزن ۵",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 4,
          material: "دولومیت",
          name: "مخزن ۷",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 5,
          material: "پین کمکی",
          name: "مخزن ۱۰",
          amount: 0,
          inActiveDuration: 0,
        },
      ],
    },
    {
      id: 3,
      name: "کوره ۳",
      ironUsage: {
        withoutSeed: 0,
        withSeed: 0,
      },
      tanks: [
        {
          id: 1,
          material: "آهن اسفنجی",
          name: "مخزن ۹",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 2,
          material: "آهن اسفنجی",
          name: "مخزن ۱۰",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 3,
          material: "لایم",
          name: "مخزن ۵",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 4,
          material: "دولومیت",
          name: "مخزن ۷",
          amount: 0,
          inActiveDuration: 0,
        },
        {
          id: 5,
          material: "پین کمکی",
          name: "مخزن ۱۰",
          amount: 0,
          inActiveDuration: 0,
        },
      ],
    },
  ]);
  const [gatesStatus, setGatesStatus] = useState<gateStatusType[]>([
    {
      gate: null,
      time: useGetFormatDateMinusMins(4, "HH:mm"),
      duration: "4",
    },
    {
      gate: null,
      time: useGetFormatDateMinusMins(8, "HH:mm"),
      duration: "4",
    },
    {
      gate: null,
      time: useGetFormatDateMinusMins(12, "HH:mm"),
      duration: "4",
    },
  ]);

  const {
    mutate,
    isLoading: createLoading,
    isSuccess,
  } = CreateParameterSetting();
  const router = useRouter();

  function handleFurnacesChange(index: number, data: ParameterFurnaceItemType) {
    const temp = [...furnaces];
    temp[index] = data;
    setFurnaces(temp);
  }
  function handleGateStatusChange(index: number, data: gateStatusType) {
    const temp = [...gatesStatus];
    temp[index] = data;
    setGatesStatus(temp);
  }

  const [name, setName] = useState("");

  function handleCreate() {
    mutate({
      is_active: true,
      data: {
        furnaces,
        gatesStatus,
      },
      name,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/manage/parameter-settings");
      toast.success("عملیات با موفقیت انجام شد.");
    }
  }, [isSuccess]);

  return (
    <div className="p-2">
      <div className="flex flex-row">
        <Typography variant="subtitle1" className="flex-1">
          تنظیم پارامتر
        </Typography>

        <Button
          className="mx-2"
          color="primary"
          variant="contained"
          startIcon={<AiOutlineReload />}
        >
          دریافت مجدد اطلاعات
        </Button>
        <Button
          onClick={handleCreate}
          color="success"
          variant="contained"
          startIcon={<AiOutlineCheck />}
          disabled={createLoading}
        >
          ثبت
        </Button>
      </div>
      <Card className="rounded-lg mt-2" elevation={4}>
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
      <div className="flex flex-row pt-2 gap-2">
        <div className="flex-1 gap-4 flex flex-col">
          {furnaces.map((ParameterFurnace, index) => {
            return (
              <ParameterFurnaceItem
                data={ParameterFurnace}
                key={ParameterFurnace.name}
                onChangeData={(value) => handleFurnacesChange(index, value)}
              />
            );
          })}
        </div>
        <Card
          className="w-[500px] h-[250px] text-center rounded-lg"
          elevation={4}
        >
          <CardContent className="flex flex-col gap-3">
            <Typography variant="subtitle2">
              وضعیت دریچه ها در ۱۲ دقیقه قبل
            </Typography>
            {gatesStatus.map((gateStatus, index) => {
              return (
                <GateStatus
                  key={`gate status ${index}`}
                  data={gateStatus}
                  onChangeData={(data) => handleGateStatusChange(index, data)}
                />
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ParameterSettingsPage;
