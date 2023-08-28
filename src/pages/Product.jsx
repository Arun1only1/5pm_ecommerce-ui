import React from "react";
import SellerProduct from "./SellerProduct";
import BuyerProduct from "./BuyerProduct";
import { Box } from "@mui/material";

const Product = () => {
  const role = localStorage.getItem("userRole");

  return (
    <Box sx={{ width: "100%", minHeight: "70vh" }}>
      {role === "seller" ? <SellerProduct /> : <BuyerProduct />}
    </Box>
  );
};

export default Product;
