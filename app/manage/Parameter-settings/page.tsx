"use client";
import ParameterFurnaceItem, {
  ParameterFurnaceItemType,
} from "@/components/ParameterFurnace/ParameterFurnaceItem";
import GateStatus, { gateStatusType } from "@/components/gateStatus/gateStatus";
import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { AiOutlineReload, AiOutlineCheck } from "react-icons/ai";

type parameterSettingsType = {
  furnaces: ParameterFurnaceItemType[];
  gatesStatus: gateStatusType[];
};

const dummyParameterSettings: parameterSettingsType = {
  furnaces: [
    {
      id: 1,
      name: "کوره ۱",
      ironUsage: {
        withoutSeed: 50,
        withSeed: 40,
      },
      tanks: [
        {
          material: "آهن اسفنجی",
          name: "مخزن ۹",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "آهن اسفنجی",
          name: "مخزن ۱۰",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "لایم",
          name: "مخزن ۵",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "دولومیت",
          name: "مخزن ۷",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "پین کمکی",
          name: "مخزن ۱۰",
          amount: 40,
          inActiveDuration: 0,
        },
      ],
    },
    {
      id: 2,
      name: "کوره ۲",
      ironUsage: {
        withoutSeed: 50,
        withSeed: 40,
      },
      tanks: [
        {
          material: "آهن اسفنجی",
          name: "مخزن ۹",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "آهن اسفنجی",
          name: "مخزن ۱۰",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "لایم",
          name: "مخزن ۵",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "دولومیت",
          name: "مخزن ۷",
          amount: 40,
          inActiveDuration: 0,
        },
        {
          material: "پین کمکی",
          name: "مخزن ۱۰",
          amount: 40,
          inActiveDuration: 0,
        },
      ],
    },
  ],
  gatesStatus: [
    {
      gate: {
        id: undefined,
        label: undefined,
      },
      time: new Date(new Date().setMinutes(new Date().getMinutes() - 4)),
      duration: 4,
    },
    {
      gate: {
        id: undefined,
        label: undefined,
      },
      time: new Date(new Date().setMinutes(new Date().getMinutes() - 8)),
      duration: 4,
    },
    {
      gate: {
        id: undefined,
        label: undefined,
      },
      time: new Date(new Date().setMinutes(new Date().getMinutes() - 12)),
      duration: 4,
    },
  ],
};

function ParameterSettingsPage() {
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
          color="success"
          variant="contained"
          startIcon={<AiOutlineCheck />}
        >
          ثبت و اجرا
        </Button>
      </div>
      <div className="flex flex-row pt-2 gap-2">
        <div className="flex-1 gap-4 flex flex-col">
          {dummyParameterSettings.furnaces.map((ParameterFurnace) => {
            return (
              <ParameterFurnaceItem
                data={ParameterFurnace}
                key={ParameterFurnace.name}
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
            {dummyParameterSettings.gatesStatus.map((gateStatus, index) => {
              return (
                <GateStatus
                  key={`gate status ${index}`}
                  duration={gateStatus.duration}
                  gate={gateStatus.gate}
                  time={gateStatus.time}
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
