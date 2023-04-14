"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { IoMdLogOut } from "react-icons/io";
import { GetMy, LogOutUser, UserItem } from "@/app/apiManager/Users";
import { toast } from "react-hot-toast";

/**
 * ApplicationBar that shows on top of every page of manage section and use to navigate between pages.
 * @returns ApplicationBar jsx component.
 */
function ApplicationBar() {
  const router = useRouter();
  const { data: myData, isLoading: MyLoading, isError } = GetMy();
  const { mutate, isSuccess } = LogOutUser();

  const [userType, setUserType] = useState<
    | {
        id: number | string;
        name: string;
      }
    | null
    | undefined
  >(null);

  useEffect(() => {
    if (myData) {
      setUserType(myData.result.user_type);
    }
  }, [myData]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      toast.success("با موفقیت از سیستم خارج شدید.");
      router.push("/auth/login");
    }
  }, [isSuccess]);

  function handleLogout() {
    mutate();
  }

  function checkPermission(
    permissionId: "dashboard" | "parameter" | "base" | "users"
  ) {
    if (userType === undefined || userType === null) {
      return true;
    }

    switch (userType?.id) {
      // SysAdmin
      case 1:
        return true;
      // Supervisor
      case 2:
        return true;
      // Operation
      case 3:
        if (permissionId === "dashboard" || permissionId === "parameter") {
          return true;
        }
        return false;
      // Monitoring
      case 4:
        if (permissionId === "dashboard") {
          return true;
        }
        return false;

      default:
        break;
    }
  }

  if (MyLoading) {
    return (
      <Typography align="center" className="mt-6">
        در حال دریافت اطلاعات...
      </Typography>
    );
  }
  return (
    <AppBar position="static" elevation={0} color="secondary">
      <Toolbar>
        <Typography
          variant="subtitle1"
          component="div"
          className="text-gray-800"
        >
          توسعه فولادآلیاژی ایرانیان
        </Typography>
        <div className="flex-1 text-center">
          {checkPermission("dashboard") && (
            <Button
              color="primary"
              onClick={() => router.push("/manage/dashboard")}
            >
              خانه
            </Button>
          )}
          {checkPermission("parameter") && (
            <Button
              color="primary"
              onClick={() => router.push("/manage/parameter-settings")}
            >
              تنظیم پارامتر
            </Button>
          )}
          {checkPermission("base") && (
            <Button
              color="primary"
              onClick={() => router.push("/manage/base-settings")}
            >
              تنظیمات پایه
            </Button>
          )}
          {checkPermission("users") && (
            <Button
              color="primary"
              onClick={() => router.push("/manage/users")}
            >
              کاربران
            </Button>
          )}
        </div>

        <IconButton color="error" onClick={handleLogout}>
          <IoMdLogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;
