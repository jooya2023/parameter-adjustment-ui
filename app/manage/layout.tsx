"use client";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

function ManageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col gap-2">
      <AppBar position="static" className="bg-gray-100" elevation={0}>
        <Toolbar>
          <Typography
            variant="subtitle1"
            component="div"
            className="text-gray-800"
          >
            توسعه فولادآلیاژی ایرانیان
          </Typography>
          <div className="flex-1 text-center">
            <Button color="primary">خانه</Button>
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
            <Button color="primary">کاربران</Button>
          </div>
          <Avatar>H</Avatar>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}
export default ManageLayout;
