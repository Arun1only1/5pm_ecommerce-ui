import React, { useState } from "react";
import SellerProduct from "./SellerProduct";
import BuyerProduct from "./BuyerProduct";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const Product = () => {
  const [searchText, setSearchText] = useState("");

  const role = localStorage.getItem("userRole");

  return (
    <Box sx={{ width: "100%", minHeight: "70vh" }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
          marginRight: "4rem",
        }}
      >
        <TextField
          placeholder="Search"
          onChange={(event) => setSearchText(event.target.value)}
          // TODO:place icon here
          // startAdornment={
          //   <InputAdornment position="start">
          //     <AiOutlineSearch size="1rem" />
          //   </InputAdornment>
          // }
        />
      </Grid>

      {role === "seller" ? (
        <SellerProduct searchText={searchText} />
      ) : (
        <BuyerProduct searchText={searchText} />
      )}
    </Box>
  );
};

export default Product;
