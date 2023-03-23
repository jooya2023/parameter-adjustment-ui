"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { autoCompleteOption } from "../Types";

export type gateStatusType = {
  // TODO: change this to select type.
  gate: {
    id?: number | string;
    label?: string;
  };
  time: Date;
  duration: number;
};

const gates: autoCompleteOption[] = [
  {
    id: 1,
    label: "دریچه ۱",
  },
  {
    id: 2,
    label: "دریچه ۲",
  },
  {
    id: 3,
    label: "دریچه ۳",
  },
];

function GateStatus({ duration, time, gate }: gateStatusType) {
  return (
    <div className="flex flex-row gap-1 pt-4">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={gates}
        className="flex-1"
        renderInput={(params) => (
          <TextField {...params} label="دریچه" size="small" />
        )}
      />
      <TextField label="مدت (دقیقه)" size="small" className="w-[120px]" />
      <TextField
        label="ساعت"
        size="small"
        className="w-[70px]"
        value={`${time.getHours()}:${time.getMinutes()}`}
      />
    </div>
  );
}

export default GateStatus;
