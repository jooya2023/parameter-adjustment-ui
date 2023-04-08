"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserLogin } from "@/app/utils/useUserLogin";
import { toast } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, isLoading, mutate: login, isSuccess, isError } = useUserLogin();

  useEffect(() => {
    if (isSuccess) {
      toast.success("شما با موفقیت به سیستم وارد شدید.");
      localStorage.setItem("access-token", data.auth_token);
      localStorage.setItem("refresh-token", data.refresh_token);
      router.push("/manage/dashboard");
    } else if (isError) {
      toast.error("نام کاربری یا کلمه عبور صحیح نمیباشد.");
    } else return;
  }, [isSuccess, isError]);

  const handleSubmit = () => {
    login({ username, password }); // Login api call
  };
  return (
    <div className=" flex justify-center items-center h-screen bg-[url('/img/bg.jpg')] bg-no-repeat bg-cover">
      <Card className="w-[350px] rounded-lg">
        <CardContent className="text-center flex flex-col p-4">
          <span className="text-lg mb-8">ورود به سامانه</span>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
            fullWidth
            size="small"
            className="mb-4"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="کلمه عبور"
            variant="outlined"
            fullWidth
            type="password"
            size="small"
            className="mb-6"
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            // onClick={() => router.push("/manage/dashboard")}
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
