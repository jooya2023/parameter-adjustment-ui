"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

function ManageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
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
            <Button color="primary">تنظیم پارامتر</Button>
            <Button color="primary">تنظیمات پایه</Button>
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
