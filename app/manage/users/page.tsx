"use client";

import React, { useMemo } from "react";
import { Typography, Button, IconButton, useRadioGroup } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AiFillPlusCircle } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";

const rows = [
  { id: 1, name: "Snow", username: "Jon", userType: 35 },
  { id: 2, name: "Lannister", username: "Cersei", userType: 42 },
  { id: 3, name: "Lannister", username: "Jaime", userType: 45 },
  { id: 4, name: "Stark", username: "Arya", userType: 16 },
  { id: 5, name: "Targaryen", username: "Daenerys", userType: null },
  { id: 6, name: "Melisandre", username: null, userType: 150 },
];

function UsersPage() {
  const router = useRouter();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "نام و نام خانوادگی",
        flex: 1,
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
          autoHeight
          rowSelection={false}
          rows={rows}
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
