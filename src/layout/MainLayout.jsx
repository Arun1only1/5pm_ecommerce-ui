import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <Header />

      <Grid
        container
        sx={{ minHeight: "74vh", display: "grid", placeItems: "center" }}
      >
        <Outlet />
      </Grid>

      <Footer />
    </Box>
  );
};

export default MainLayout;
