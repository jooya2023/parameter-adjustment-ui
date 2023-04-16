import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingPage({ size }: { size?: number }) {
  return (
    <Box
      sx={{
        position: "fixed",
        background: "#ffffff4a",
        zIndex: 100,
      }}
      className="flex flex-col justify-center items-center w-full h-screen bg-transparent"
    >
      <CircularProgress
        size={size ?? 40}
        sx={{
          mb: "20px",
        }}
      />
      <span>لطفا منتظر بمانید...</span>
    </Box>
  );
}

export default LoadingPage;
