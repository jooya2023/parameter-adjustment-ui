import {
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import React from "react";
import BaseSettingsInfoChart from "../Charts/BaseSettingsInfoChart/BaseSettingsInfoChart";

export type BaseSettingFurnaceItemType = {
  id: number;
  name: string;
  baseSettings: {
    tabToTab: number;
    powerOn: number;
  };
  usage: {
    lime: number;
    dolomite: number;
  };
  maxCapacity: {
    iron: number;
    lime: number;
    dolomite: number;
  };
  minCapacity: {
    iron: number;
    lime: number;
    dolomite: number;
  };
  arrivalDelay: {
    iron: number;
    lime: number;
    dolomite: number;
  };
  emptyingDelay: {
    iron: number;
    lime: number;
    dolomite: number;
  };
};

function BaseSettingFurnaceItem({
  data,
}: {
  data: BaseSettingFurnaceItemType;
}) {
  return (
    <Card className="rounded-lg border-slate-900 border-2" elevation={4}>
      <CardContent>
        <Typography variant="subtitle1" className="flex-1 text-center">
          {data.name}
        </Typography>
        <div className="flex">
          <div className="flex flex-1 flex-col gap-2">
            <Typography variant="subtitle1" className="flex-1">
              تنظیمات پایه
            </Typography>
            <div className="flex gap-2">
              <TextField label="Tab To Tab" size="small" fullWidth />
              <TextField label="Power On" size="small" fullWidth />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              میزان مصرف در ذوب
            </Typography>
            <div className="flex gap-2">
              <TextField label="میزان مصرف آهک" size="small" fullWidth />
              <TextField label="میزان مصرف دولومیت" size="small" fullWidth />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              حداکثر ضرفیت
            </Typography>
            <div className="flex gap-2">
              <TextField label="آهن" size="small" fullWidth />
              <TextField label="آهک" size="small" fullWidth />
              <TextField label="دولومیت" size="small" fullWidth />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              حداقل ضرفیت
            </Typography>
            <div className="flex gap-2">
              <TextField label="آهن" size="small" fullWidth />
              <TextField label="آهک" size="small" fullWidth />
              <TextField label="دولومیت" size="small" fullWidth />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              تاخیر رسیدن
            </Typography>
            <div className="flex gap-2">
              <TextField label="آهن" size="small" fullWidth />
              <TextField label="آهک" size="small" fullWidth />
              <TextField label="دولومیت" size="small" fullWidth />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              تاخیر خالی شدن
            </Typography>
            <div className="flex gap-2">
              <TextField label="آهن" size="small" fullWidth />
              <TextField label="آهک" size="small" fullWidth />
              <TextField label="دولومیت" size="small" fullWidth />
            </div>
          </div>
          <Divider orientation="vertical" flexItem className="px-2" />
          <div className="w-[350px] text-center flex justify-center flex-col items-center">
            <span>نمودار ها</span>
            <BaseSettingsInfoChart />
            <BaseSettingsInfoChart />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BaseSettingFurnaceItem;
