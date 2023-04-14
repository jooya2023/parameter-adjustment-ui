"use client";
import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <h1 className="text-blue-500">نرم افزار تنظیم پارامتر کوره ها</h1>
      <Stack direction="row" columnGap={1}>
        <Button variant="contained" onClick={() => router.push("/auth/login")}>
          ورود به سامانه
        </Button>
      </Stack>
      <h4 className="text-red-500">دانشگاه یزد</h4>
    </Grid>
  );
}
