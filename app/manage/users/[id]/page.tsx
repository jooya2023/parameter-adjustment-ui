"use client";

import {
  ChangeUserPassword,
  GetUserById,
  PatchUser,
} from "@/app/apiManager/Users";
import { autoCompleteOption, pagesLayoutData } from "@/components/Types";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";

const userTypes: autoCompleteOption[] = [
  { id: -1, label: "نامشخص" },
  {
    id: 1,
    label: "SysAdmin",
  },
  { id: 2, label: "Supervisor" },
  {
    id: 3,
    label: "Operation",
  },
  {
    id: 4,
    label: "Monitoring",
  },
];
function EditUserPage({ params, searchParams }: pagesLayoutData) {
  const router = useRouter();

  const { data, isLoading: getLoading } = GetUserById(`${params.id}`);
  const {
    mutate,
    isLoading: patchLoading,
    isSuccess: isPatchSuccess,
  } = PatchUser();

  const {
    mutate: mutateChangePass,
    isLoading: changePassLoading,
    isSuccess: changePassSuccess,
  } = ChangeUserPassword();

  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [userType, setUserType] = useState<autoCompleteOption>({
    id: -1,
    label: "نامشخص",
  });
  const [newPassword, setNewPassword] = useState(" ");

  useEffect(() => {
    setFirstName(data?.result.first_name || "");
    setLastName(data?.result.last_name || "");
    setUsername(data?.result.username || "");
    if (data?.result.user_type) {
      setUserType({
        id: data?.result.user_type?.id,
        label: data?.result.user_type?.name,
      });
    }
  }, [data]);

  function handleUpdate() {
    mutate({
      id: params.id,
      first_name: firstName,
      last_name: lastName,
      username,
      user_type: { id: userType.id || -1, name: userType.label || "نامشخص" },
    });
  }

  function handleChangePassword() {
    mutateChangePass({
      id: params.id,
      newPassword: newPassword,
    });
  }

  useEffect(() => {
    if (isPatchSuccess || changePassSuccess) {
      router.push("/manage/users");
      toast.success("عملیات با موفقیت انجام شد.");
    }
  }, [isPatchSuccess, changePassSuccess, router]);

  if (getLoading) {
    return <CircularProgress />;
  }
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
            <TextField
              label="نام"
              size="small"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="نام خانوادگی"
              size="small"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="نام کاربری"
              size="small"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userTypes}
              className="flex-1"
              onChange={(e, newVal) => setUserType(newVal || {})}
              defaultValue={userType}
              value={userType}
              renderInput={(params) => (
                <TextField {...params} label="نوع کاربری" size="small" />
              )}
            />
            <Button
              variant="contained"
              disabled={patchLoading}
              onClick={handleUpdate}
            >
              ثبت تغییرات
            </Button>

            <Divider />
            <Typography>ویرایش کلمه عبور</Typography>
            <TextField
              label="کلمه عبور جدید"
              size="small"
              fullWidth
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleChangePassword}
              disabled={changePassLoading}
            >
              ویرایش کلمه عبور
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EditUserPage;
