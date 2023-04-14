"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { IoMdLogOut } from "react-icons/io";
import { GetMy, UserItem } from "@/app/apiManager/Users";

/**
 * ApplicationBar that shows on top of every page of manage section and use to navigate between pages.
 * @returns ApplicationBar jsx component.
 */
function ApplicationBar() {
  const router = useRouter();
  const { data, isLoading: MyLoading, isError } = GetMy();
  const [userType, setUserType] = useState<
    | {
        id: number;
        name: string;
      }
    | null
    | undefined
  >(null);

  useEffect(() => {
    if (data) {
      setUserType(data.result.user_type);
    }
  }, [data]);

  function handleLogout() {
    router.push("/users/login");
  }

  function checkPermission(permissionId: number) {
    if (!userType) {
      return true;
    } else {
      if (userType.id > permissionId) {
        return true;
      } else {
        return false;
      }
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
          <Button
            color="primary"
            onClick={() => router.push("/manage/dashboard")}
          >
            خانه
          </Button>
          {checkPermission(1) && (
            <Button
              color="primary"
              onClick={() => router.push("/manage/parameter-settings")}
            >
              تنظیم پارامتر
            </Button>
          )}
          <Button
            color="primary"
            onClick={() => router.push("/manage/base-settings")}
          >
            تنظیمات پایه
          </Button>
          <Button color="primary" onClick={() => router.push("/manage/users")}>
            کاربران
          </Button>
        </div>

        <IconButton color="error" onClick={handleLogout}>
          <IoMdLogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;
