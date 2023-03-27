"use client";

import { autoCompleteOption } from "@/components/Types";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const userTypes: autoCompleteOption[] = [
  {
    id: 1,
    label: "سوپروایزر",
  },
  {
    id: 2,
    label: "اپراتور",
  },
  {
    id: 3,
    label: "مانیتورینگ",
  },
];
function EditUserPage() {
  return (
    <div className="p-2">
      <div className="flex flex-row mb-2">
        <Typography variant="subtitle1" className="flex-1">
          مدیریت کاربران
        </Typography>
      </div>
      <div className="flex justify-center ">
        <Card className="w-[500px]" elevation={4}>
          <CardContent className="gap-4 flex flex-col">
            <Typography>ویرایش کاربر</Typography>
            <TextField label="نام و نام خانوادگی" size="small" fullWidth />
            <TextField label="نام کاربری" size="small" fullWidth />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userTypes}
              className="flex-1"
              renderInput={(params) => (
                <TextField {...params} label="نوع کاربری" size="small" />
              )}
            />
            <Button variant="contained">ثبت تغییرات</Button>

            <Divider />
            <Typography>ویرایش کلمه عبور</Typography>
            <TextField label="کلمه عبور جدید" size="small" fullWidth />
            <Button variant="contained">ویرایش کلمه عبور</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EditUserPage;
