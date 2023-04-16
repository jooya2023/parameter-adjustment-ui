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
    label: "بین ۵ کوره ۱",
  },
  {
    id: 1,
    label: "بین ۷ کوره ۱",
  },
  {
    id: 1,
    label: "بین ۹ کوره ۱",
  },
  {
    id: 1,
    label: "بین ۱۰ کوره ۱",
  },
  {
    id: 1,
    label: "بین ۵ کوره ۲",
  },
  {
    id: 1,
    label: "بین ۷ کوره ۲",
  },
  {
    id: 1,
    label: "بین ۹ کوره ۲",
  },
  {
    id: 1,
    label: "بین ۱۰ کوره ۲",
  },
  {
    id: 1,
    label: "بین ۱۳ کوره ۳",
  },
  {
    id: 1,
    label: "بین ۱۴ کوره ۳",
  },
  {
    id: 1,
    label: "بین ۱۵ کوره ۳",
  },
  {
    id: 1,
    label: "بین ۱۶ کوره ۳",
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
        sx={{
          maxWidth: "100px",
        }}
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
        sx={{
          maxWidth: "150px",
        }}
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
