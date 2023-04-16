"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  useRadioGroup,
  Switch,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AiFillPlusCircle, AiOutlineHistory } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { PatchFurnaceSetting } from "@/app/apiManager/FurnaceSetting";
import { toast } from "react-hot-toast";
import { FormatToPersianDate } from "@/hooks/useFormatToPersianDate";
import {
  GetParameterSettingList,
  RebuildParametersResult,
} from "@/app/apiManager/ParameterSetting";

function ParameterSettingsPage() {
  const router = useRouter();
  const [tableRows, setTableRows] = useState<any[]>([]);
  const {
    data,
    isLoading: isGetLoading,
    isError,
    refetch,
  } = GetParameterSettingList();
  const { mutate, isLoading: isUpdateLoading } = PatchFurnaceSetting();
  const { mutate: mutateRebuild, isLoading: loadingRebuild } =
    RebuildParametersResult();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "نام",
        flex: 1,
      },
      {
        field: "username",
        headerName: "تاریخ ایجاد",
        renderCell: (params) => {
          return (
            <Typography variant="caption">
              {FormatToPersianDate(
                params.row.created_at,
                "در تاریخ jYYYY/jM/jD ساعت HH:mm"
              )}
            </Typography>
          );
        },
        flex: 1,
      },
      {
        field: "userType",
        headerName: "وضعیت",
        flex: 1,
        renderCell: (params) => {
          return (
            <Switch
              checked={params.row.is_active}
              onClick={() => {
                mutate({
                  id: params.row.id,
                  is_active: !params.row.is_active,
                  name: params.row.name,
                });
                refetch();
              }}
            />
          );
        },
      },
      {
        field: "actions",
        headerName: "عملیات",
        width: 200,
        renderCell: (params) => (
          <IconButton
            className="text-center"
            color="primary"
            onClick={() => {
              router.push(`/manage/parameter-settings/${params.row.id}`);
            }}
          >
            <GrEdit size="15px" />
          </IconButton>
        ),
      },
    ],
    [router]
  );

  useEffect(() => {
    if (data?.result) {
      setTableRows(data?.result);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error("در دریافت اطلاعات مشکلی پیش آمده است.");
    }
  }, [isError]);

  return (
    <div className="p-2">
      <div className="flex flex-row mb-2">
        <Typography variant="subtitle1" className="flex-1">
          مدیریت تنظیمات پارامتر
        </Typography>
        <Button
          color="warning"
          variant="contained"
          startIcon={<AiOutlineHistory />}
          onClick={() => mutateRebuild()}
          className="mx-2"
          disabled={loadingRebuild}
        >
          محاسبه مجدد
        </Button>
        <Button
          color="success"
          variant="contained"
          startIcon={<AiFillPlusCircle />}
          onClick={() => router.push("/manage/parameter-settings/create")}
        >
          ایجاد تنظیمات جدید
        </Button>
      </div>
      <div className="h-[400px] w-full">
        <DataGrid
          loading={isGetLoading || isUpdateLoading}
          autoHeight
          rowSelection={false}
          rows={tableRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableColumnMenu
        />
      </div>
    </div>
  );
}

export default ParameterSettingsPage;
