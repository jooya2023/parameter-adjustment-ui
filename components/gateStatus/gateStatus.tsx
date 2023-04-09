"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { autoCompleteOption } from "../Types";

export type gateStatusType = {
  // TODO: change this to select type.
  gate: {
    id?: number | string;
    label?: string;
  } | null;
  time: string;
  duration: string;
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

function GateStatus({
  data,
  onChangeData,
}: {
  data: gateStatusType;
  onChangeData: (data: gateStatusType) => void;
}) {
  return (
    <div className="flex flex-row gap-1 pt-4">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={gates}
        className="flex-1"
        value={data.gate}
        onChange={(e, newVal) =>
          onChangeData({
            ...data,
            gate: newVal ? newVal : null,
          })
        }
        renderInput={(params) => (
          <TextField {...params} label="دریچه" size="small" />
        )}
      />
      <TextField
        label="مدت (دقیقه)"
        size="small"
        className="w-[120px]"
        value={data.duration}
        onChange={(e) => {
          onChangeData({
            ...data,
            duration: e.target.value,
          });
        }}
      />
      <TextField
        label="ساعت"
        size="small"
        className="w-[70px]"
        value={data.time}
        onChange={(e) => {
          onChangeData({
            ...data,
            time: e.target.value,
          });
        }}
      />
    </div>
  );
}

export default GateStatus;
