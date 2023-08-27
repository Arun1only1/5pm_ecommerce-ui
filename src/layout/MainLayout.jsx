import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
