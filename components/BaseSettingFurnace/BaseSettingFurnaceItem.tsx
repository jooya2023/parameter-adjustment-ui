"use client";

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
  DRI_usage?: {
    s: number[];
    sb: number[];
  };
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
  onChangeData,
}: {
  data: BaseSettingFurnaceItemType;
  onChangeData: (data: BaseSettingFurnaceItemType) => void;
}) {
  function handleChange(
    value: string,
    type:
      | "BASE_TAB_TO_TAB"
      | "BASE_POWER_ON"
      | "USAGE_LIME"
      | "USAGE_DOLOMITE"
      | "MAX_CAPACITY_IRON"
      | "MAX_CAPACITY_LIME"
      | "MAX_CAPACITY_DOLOMITE"
      | "MIN_CAPACITY_IRON"
      | "MIN_CAPACITY_LIME"
      | "MIN_CAPACITY_DOLOMITE"
      | "ARRIVAL_DELAY_IRON"
      | "ARRIVAL_DELAY_LIME"
      | "ARRIVAL_DELAY_DOLOMITE"
      | "EMPTYING_DELAY_IRON"
      | "EMPTYING_DELAY_LIME"
      | "EMPTYING_DELAY_DOLOMITE"
  ) {
    switch (type) {
      //BASE
      case "BASE_TAB_TO_TAB":
        onChangeData({
          ...data,
          baseSettings: {
            tabToTab: parseFloat(value),
            powerOn: data.baseSettings.powerOn,
          },
        });
        break;
      case "BASE_POWER_ON":
        onChangeData({
          ...data,
          baseSettings: {
            tabToTab: data.baseSettings.tabToTab,
            powerOn: parseFloat(value),
          },
        });
        break;
      //USAGE
      case "USAGE_LIME":
        onChangeData({
          ...data,
          usage: {
            lime: parseFloat(value),
            dolomite: data.usage.dolomite,
          },
        });
        break;
      case "USAGE_DOLOMITE":
        onChangeData({
          ...data,
          usage: {
            lime: data.usage.lime,
            dolomite: parseFloat(value),
          },
        });
        break;

      // MAX CAPACITY
      case "MAX_CAPACITY_IRON":
        onChangeData({
          ...data,
          maxCapacity: {
            iron: parseFloat(value),
            lime: data.maxCapacity.lime,
            dolomite: data.maxCapacity.dolomite,
          },
        });
        break;
      case "MAX_CAPACITY_LIME":
        onChangeData({
          ...data,
          maxCapacity: {
            iron: data.maxCapacity.iron,
            lime: parseFloat(value),
            dolomite: data.maxCapacity.dolomite,
          },
        });
        break;
      case "MAX_CAPACITY_DOLOMITE":
        onChangeData({
          ...data,
          maxCapacity: {
            iron: data.maxCapacity.iron,
            lime: data.maxCapacity.lime,
            dolomite: parseFloat(value),
          },
        });
        break;
      // MIN CAPACITY
      case "MIN_CAPACITY_IRON":
        onChangeData({
          ...data,
          minCapacity: {
            iron: parseFloat(value),
            lime: data.minCapacity.lime,
            dolomite: data.minCapacity.dolomite,
          },
        });
        break;
      case "MIN_CAPACITY_LIME":
        onChangeData({
          ...data,
          minCapacity: {
            iron: data.minCapacity.iron,
            lime: parseFloat(value),
            dolomite: data.minCapacity.dolomite,
          },
        });
        break;
      case "MIN_CAPACITY_DOLOMITE":
        onChangeData({
          ...data,
          minCapacity: {
            iron: data.minCapacity.iron,
            lime: data.minCapacity.lime,
            dolomite: parseFloat(value),
          },
        });
        break;

      // ARRIVAL Delay
      case "ARRIVAL_DELAY_IRON":
        onChangeData({
          ...data,
          arrivalDelay: {
            iron: parseFloat(value),
            lime: data.arrivalDelay.lime,
            dolomite: data.arrivalDelay.dolomite,
          },
        });
        break;
      case "ARRIVAL_DELAY_LIME":
        onChangeData({
          ...data,
          arrivalDelay: {
            iron: data.arrivalDelay.iron,
            lime: parseFloat(value),
            dolomite: data.arrivalDelay.dolomite,
          },
        });
        break;
      case "ARRIVAL_DELAY_DOLOMITE":
        onChangeData({
          ...data,
          arrivalDelay: {
            iron: data.arrivalDelay.iron,
            lime: data.arrivalDelay.lime,
            dolomite: parseFloat(value),
          },
        });
        break;

      // emptyingDelay
      case "EMPTYING_DELAY_IRON":
        onChangeData({
          ...data,
          emptyingDelay: {
            iron: parseFloat(value),
            lime: data.emptyingDelay.lime,
            dolomite: data.emptyingDelay.dolomite,
          },
        });
        break;
      case "EMPTYING_DELAY_LIME":
        onChangeData({
          ...data,
          emptyingDelay: {
            iron: data.emptyingDelay.iron,
            lime: parseFloat(value),
            dolomite: data.emptyingDelay.dolomite,
          },
        });
        break;
      case "EMPTYING_DELAY_DOLOMITE":
        onChangeData({
          ...data,
          emptyingDelay: {
            iron: data.emptyingDelay.iron,
            lime: data.emptyingDelay.lime,
            dolomite: parseFloat(value),
          },
        });
        break;

      default:
        break;
    }
  }
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
              <TextField
                label="Tab To Tab"
                size="small"
                fullWidth
                type="number"
                value={data.baseSettings.tabToTab}
                onChange={(e) =>
                  handleChange(e.target.value, "BASE_TAB_TO_TAB")
                }
              />
              <TextField
                label="Power On"
                size="small"
                fullWidth
                type="number"
                value={data.baseSettings.powerOn}
                onChange={(e) => handleChange(e.target.value, "BASE_POWER_ON")}
              />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              میزان مصرف در ذوب
            </Typography>
            <div className="flex gap-2">
              <TextField
                type="number"
                label="میزان مصرف آهک"
                size="small"
                fullWidth
                value={data.usage.lime}
                onChange={(e) => handleChange(e.target.value, "USAGE_LIME")}
              />
              <TextField
                type="number"
                label="میزان مصرف دولومیت"
                size="small"
                fullWidth
                value={data.usage.dolomite}
                onChange={(e) => handleChange(e.target.value, "USAGE_DOLOMITE")}
              />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              حداکثر ضرفیت
            </Typography>
            <div className="flex gap-2">
              <TextField
                type="number"
                label="آهن"
                size="small"
                fullWidth
                value={data.maxCapacity.iron}
                onChange={(e) =>
                  handleChange(e.target.value, "MAX_CAPACITY_IRON")
                }
              />
              <TextField
                type="number"
                label="آهک"
                size="small"
                fullWidth
                value={data.maxCapacity.lime}
                onChange={(e) =>
                  handleChange(e.target.value, "MAX_CAPACITY_LIME")
                }
              />
              <TextField
                type="number"
                label="دولومیت"
                size="small"
                fullWidth
                value={data.maxCapacity.dolomite}
                onChange={(e) =>
                  handleChange(e.target.value, "MAX_CAPACITY_DOLOMITE")
                }
              />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              حداقل ضرفیت
            </Typography>
            <div className="flex gap-2">
              <TextField
                type="number"
                label="آهن"
                size="small"
                fullWidth
                value={data.minCapacity.iron}
                onChange={(e) =>
                  handleChange(e.target.value, "MIN_CAPACITY_IRON")
                }
              />
              <TextField
                type="number"
                label="آهک"
                size="small"
                fullWidth
                value={data.minCapacity.lime}
                onChange={(e) =>
                  handleChange(e.target.value, "MIN_CAPACITY_LIME")
                }
              />
              <TextField
                type="number"
                label="دولومیت"
                size="small"
                fullWidth
                value={data.minCapacity.dolomite}
                onChange={(e) =>
                  handleChange(e.target.value, "MIN_CAPACITY_DOLOMITE")
                }
              />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              تاخیر رسیدن
            </Typography>
            <div className="flex gap-2">
              <TextField
                type="number"
                label="آهن"
                size="small"
                fullWidth
                value={data.arrivalDelay.iron}
                onChange={(e) =>
                  handleChange(e.target.value, "ARRIVAL_DELAY_IRON")
                }
              />
              <TextField
                type="number"
                label="آهک"
                size="small"
                fullWidth
                value={data.arrivalDelay.lime}
                onChange={(e) =>
                  handleChange(e.target.value, "ARRIVAL_DELAY_LIME")
                }
              />
              <TextField
                type="number"
                label="دولومیت"
                size="small"
                fullWidth
                value={data.arrivalDelay.dolomite}
                onChange={(e) =>
                  handleChange(e.target.value, "ARRIVAL_DELAY_DOLOMITE")
                }
              />
            </div>
            <Typography variant="subtitle1" className="flex-1">
              تاخیر خالی شدن
            </Typography>
            <div className="flex gap-2">
              <TextField
                type="number"
                label="آهن"
                size="small"
                fullWidth
                value={data.emptyingDelay.iron}
                onChange={(e) =>
                  handleChange(e.target.value, "EMPTYING_DELAY_IRON")
                }
              />
              <TextField
                type="number"
                label="آهک"
                size="small"
                fullWidth
                value={data.emptyingDelay.lime}
                onChange={(e) =>
                  handleChange(e.target.value, "EMPTYING_DELAY_LIME")
                }
              />
              <TextField
                type="number"
                label="دولومیت"
                size="small"
                fullWidth
                value={data.emptyingDelay.dolomite}
                onChange={(e) =>
                  handleChange(e.target.value, "EMPTYING_DELAY_DOLOMITE")
                }
              />
            </div>
          </div>
          <Divider orientation="vertical" flexItem className="mx-2" />
          <div className="w-[350px] text-center flex justify-center flex-col items-center">
            <span>نمودار ها</span>
            {data.DRI_usage?.s ? (
              <BaseSettingsInfoChart
                title="بدون سبد زنی"
                series={[
                  {
                    data: data.DRI_usage.s,
                  },
                ]}
              />
            ) : (
              <Typography>برای این مورد نموداری وجود ندارد</Typography>
            )}

            {data.DRI_usage?.s ? (
              <BaseSettingsInfoChart
                title="با سبد زنی"
                series={[
                  {
                    data: data.DRI_usage.sb,
                  },
                ]}
              />
            ) : (
              <Typography>برای این مورد نموداری وجود ندارد</Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BaseSettingFurnaceItem;
