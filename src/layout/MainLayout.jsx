import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar";
import CustomBreadCrumb from "../components/CustomBreadcrumb";
import { useBreadcrumbTitle } from "../custom-hook/useBreadCrumbTitle";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../store/slices/breadcrumbSlice";

const MainLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const data = useBreadcrumbTitle(location.pathname);

  useEffect(() => {
    dispatch(setBreadCrumb(data));
  }, [data, dispatch]);

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <CustomSnackbar />
      <Header />
      <CustomBreadCrumb />

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
