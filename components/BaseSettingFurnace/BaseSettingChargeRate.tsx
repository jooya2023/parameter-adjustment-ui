import {
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export type BaseSettingChargeRateType = {
  iron: number;
  lime: number;
  dolomite: number;
};

function BaseSettingChargeRate({
  data,
  onChangeData,
}: {
  data: BaseSettingChargeRateType;
  onChangeData: (data: BaseSettingChargeRateType) => void;
}) {
  const { iron, lime, dolomite } = data;

  function handleChangeData(value: string, type: "IRON" | "LIME" | "DOLOMITE") {
    switch (type) {
      case "IRON":
        onChangeData({ iron: parseFloat(value), lime, dolomite });
        break;
      case "LIME":
        onChangeData({ iron, lime: parseFloat(value), dolomite });
        break;
      case "DOLOMITE":
        onChangeData({ iron, lime, dolomite: parseFloat(value) });
        break;
    }
  }

  return (
    <Card className="rounded-lg" elevation={4}>
      <CardContent>
        <Typography variant="subtitle1" className="flex-1">
          نرخ شارژ
        </Typography>
        <Divider className="mb-3 mt-1" />
        <div className="flex gap-2">
          <TextField
            label="نرخ شارژ آهن"
            size="small"
            fullWidth
            value={iron}
            type="number"
            onChange={(e) => handleChangeData(e.target.value, "IRON")}
          />
          <TextField
            label="نرخ شارژ آهک"
            size="small"
            fullWidth
            value={lime}
            type="number"
            onChange={(e) => handleChangeData(e.target.value, "LIME")}
          />
          <TextField
            label="نرخ شارژ دولومیت"
            size="small"
            fullWidth
            value={dolomite}
            type="number"
            onChange={(e) => handleChangeData(e.target.value, "DOLOMITE")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default BaseSettingChargeRate;
