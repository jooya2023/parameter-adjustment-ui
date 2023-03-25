"use client";

import BaseSettingFurnaceItem, {
  BaseSettingFurnaceItemType,
} from "@/components/BaseSettingFurnace/BaseSettingFurnaceItem";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
} from "@mui/material";
import React from "react";
import { AiOutlineReload, AiOutlineCheck } from "react-icons/ai";

const BaseSettingFurnaceData: BaseSettingFurnaceItemType[] = [
  {
    name: "کوره ۱",
    baseSettings: {
      tabToTab: 5,
      powerOn: 5,
    },
    usage: {
      lime: 5,
      dolomite: 5,
    },
    maxCapacity: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
    minCapacity: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
    arrivalDelay: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
    emptyingDelay: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
  },
  {
    name: "کوره ۲",
    baseSettings: {
      tabToTab: 5,
      powerOn: 5,
    },
    usage: {
      lime: 5,
      dolomite: 5,
    },
    maxCapacity: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
    minCapacity: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
    arrivalDelay: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
    emptyingDelay: {
      iron: 5,
      lime: 5,
      dolomite: 5,
    },
  },
];

function BaseSettingsPage() {
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
        >
          ثبت
        </Button>
      </div>
      <Card className="rounded-lg" elevation={4}>
        <CardContent>
          <Typography variant="subtitle1" className="flex-1">
            نرخ شارژ
          </Typography>
          <Divider className="mb-3 mt-1" />
          <div className="flex gap-2">
            <TextField label="نرخ شارژ آهن" size="small" fullWidth />
            <TextField label="نرخ شارژ آهک" size="small" fullWidth />
            <TextField label="نرخ شارژ دولومیت" size="small" fullWidth />
          </div>
        </CardContent>
      </Card>
      {BaseSettingFurnaceData.map((BaseSettingFurnaceDataItem) => {
        return (
          <BaseSettingFurnaceItem
            data={BaseSettingFurnaceDataItem}
            key={BaseSettingFurnaceDataItem.name}
          />
        );
      })}
    </div>
  );
}

export default BaseSettingsPage;
