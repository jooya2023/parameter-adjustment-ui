"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { IoMdLogOut } from "react-icons/io";

/**
 * ApplicationBar that shows on top of every page of manage section and use to navigate between pages.
 * @returns ApplicationBar jsx component.
 */
function ApplicationBar() {
  const router = useRouter();

  function handleLogout() {
    router.push("/auth/login");
  }
  return (
    <AppBar
      position="static"
      elevation={0}
      color="secondary"
      //   className="bg-gray-200"
    >
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
          <Button
            color="primary"
            onClick={() => router.push("/manage/parameter-settings")}
          >
            تنظیم پارامتر
          </Button>
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
