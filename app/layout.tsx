"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import "./globals.css";
import { lightTheme } from "./theme/themes";
import localFont from "next/font/local";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const vazirFont = localFont({
  src: "./fonts/vazir/Vazirmatn-FD-Regular.woff2",
  display: "swap",
  variable: "--font-vazir",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",

// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" className={vazirFont.variable} dir="rtl">
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <body id="__next">
              {children}
              <Toaster containerStyle={{ direction: "rtl" }} />
            </body>
          </ThemeProvider>
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </html>
  );
}
