"use client";
import React from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  return (
    <div className=" flex justify-center items-center h-screen bg-[url('/img/bg.jpg')] bg-no-repeat bg-cover">
      <Card className="w-[350px] rounded-lg">
        <CardContent className="text-center flex flex-col p-4">
          <span className="text-lg mb-8">ورود به سامانه</span>
          <TextField
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
            fullWidth
            size="small"
            className="mb-4"
          />
          <TextField
            id="outlined-basic"
            label="کلمه عبور"
            variant="outlined"
            fullWidth
            type="password"
            size="small"
            className="mb-6"
          />
          <Button
            variant="contained"
            onClick={() => router.push("/manage/dashboard")}
          >
            ورود
          </Button>

          <div className="mt-4 text-sm flex flex-col gap-1">
            <span>شرکت توسعه فولادآلیاژی ایرانیان </span>
            <span>دانشگاه یزد - دانشکده مهندسی کامپیوتر</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
