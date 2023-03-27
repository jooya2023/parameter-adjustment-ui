"use client";
import { createTheme } from "@mui/material/styles";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffff57",
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#e9e9e9",
    },
  },
  typography: {
    fontFamily: "var(--font-vazir), Arial",
  },
  direction: "rtl",
});
