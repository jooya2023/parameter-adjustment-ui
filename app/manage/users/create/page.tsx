"use client";

import { CreateUser } from "@/app/apiManager/Users";
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
function CreateUserPage() {
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = CreateUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState<autoCompleteOption>({
    id: -1,
    label: "نامشخص",
  });
  const [password, setPassword] = useState("");

  function handleCreate() {
    mutate({
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      user_type: { id: userType.id || -1, name: userType.label || "نامشخص" },
    });
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("عملیات با موفقیت انجام شد.");
      router.push("/manage/users");
    }
  }, [isSuccess]);

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
            <Typography>ایجاد کاربر</Typography>
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
              value={userType}
              onChange={(e, newVal) => setUserType(newVal || {})}
              renderInput={(params) => (
                <TextField {...params} label="نوع کاربری" size="small" />
              )}
            />
            <TextField
              label="کلمه عبور"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleCreate}
            >
              ایجاد کاربر
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CreateUserPage;
