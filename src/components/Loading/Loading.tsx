import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        top: "50%",
        bottom: "-50%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
