"use client";
import {
  CreateParameterSetting,
  GetParameterSettingById,
  PatchParameterSetting,
} from "@/app/apiManager/ParameterSetting";
import ParameterFurnaceItem, {
  ParameterFurnaceItemType,
} from "@/components/ParameterFurnace/ParameterFurnaceItem";
import { pagesLayoutData } from "@/components/Types";
import GateStatus, { gateStatusType } from "@/components/gateStatus/gateStatus";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload, AiOutlineCheck } from "react-icons/ai";

function ParameterSettingsItemPage({ params, searchParams }: pagesLayoutData) {
  const [furnaces, setFurnaces] = useState<ParameterFurnaceItemType[]>([]);
  const [gatesStatus, setGatesStatus] = useState<gateStatusType[]>([]);
  const { data, isLoading } = GetParameterSettingById(`${params.id}`);

  const [name, setName] = useState("");

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

  useEffect(() => {
    setFurnaces(data?.result.data?.furnaces || []);
    setGatesStatus(data?.result.data?.gatesStatus || []);
    setName(data?.result.name || "");
  }, [data]);

  const {
    mutate,
    isLoading: patchLoading,
    isSuccess,
  } = PatchParameterSetting();

  function handleUpdate() {
    mutate({
      id: params.id,
      is_active: data?.result.is_active || false,
      name: name,
      data: {
        furnaces,
        gatesStatus,
      },
    });
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/manage/parameter-settings");
      toast.success("عملیات با موفقیت انجام شد.");
    }
  }, [isSuccess]);

  if (isLoading) {
    return <CircularProgress />;
  }

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
          disabled={patchLoading}
        >
          دریافت مجدد اطلاعات
        </Button>
        <Button
          onClick={handleUpdate}
          color="success"
          variant="contained"
          startIcon={<AiOutlineCheck />}
          disabled={patchLoading}
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

export default ParameterSettingsItemPage;
