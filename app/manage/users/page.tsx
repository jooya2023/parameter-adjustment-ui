"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Typography, Button, IconButton, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AiFillPlusCircle } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { GetUsersList } from "@/app/apiManager/Users";
import toast from "react-hot-toast";

function UsersPage() {
  const router = useRouter();
  const { data, isLoading: isGetLoading, isError } = GetUsersList();
  const [tableRows, setTableRows] = useState<any[]>([]);
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "first_name",
        headerName: "نام و نام خانوادگی",
        flex: 1,
        renderCell: (params) => (
          <Typography variant="body2">
            {`${params.row.first_name} ${params.row.last_name}`}
          </Typography>
        ),
      },
      {
        field: "username",
        headerName: "نام کاربری",
        flex: 1,
      },
      {
        field: "userType",
        headerName: "نوع کاربر",
        flex: 1,
        renderCell: (params) => (
          <Chip
            label={params.row.user_type?.name || "نامشخص"}
            color="secondary"
          />
        ),
      },
      {
        field: "actions",
        headerName: "عملیات",
        width: 200,
        renderCell: (params) => (
          <IconButton
            className="text-center"
            color="primary"
            onClick={() => router.push(`/manage/users/${params.row.id}`)}
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
          مدیریت کاربران
        </Typography>
        <Button
          color="success"
          variant="contained"
          startIcon={<AiFillPlusCircle />}
          onClick={() => router.push("/manage/users/create")}
        >
          ایجاد کاربر جدید
        </Button>
      </div>
      <div className="h-[400px] w-full">
        <DataGrid
          loading={isGetLoading}
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

export default UsersPage;
