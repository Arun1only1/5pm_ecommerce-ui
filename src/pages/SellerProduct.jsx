import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SellerProduct = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid
        container
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Grid item>
          <Button variant="outlined" onClick={() => navigate("/products/add")}>
            Add product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerProduct;
