import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";

export default function CustomBreadCrumb() {
  const { data } = useSelector((state) => state.breadcrumb);
  return (
    <Box
      role="presentation"
      sx={{
        border: "1px solid black",
        width: "100%",
        padding: "1rem",
        marginTop: "3rem",
        backgroundColor: "#5C5470",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "30%",
          fontSize: "2rem",
          color: "white",
          gap: "1rem",
        }}
      >
        {data.map((item, index) => {
          return (
            <Typography
              key={index}
              variant="h5"
              sx={{ margin: "0 1rem", textTransform: "capitalize" }}
            >
              {item}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
