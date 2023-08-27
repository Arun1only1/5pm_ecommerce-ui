import { Avatar, Badge, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { styled } from "styled-components";

const Header = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        background: "#FAF0E6",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/icons/nepal-mart-black.png"
            width={200}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Typography variant="h4">Nepal mart</Typography>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          <Link to="/">
            <StyledLink variant="h4">Home</StyledLink>
          </Link>
          <Link to="/products">
            <StyledLink variant="h4">Products</StyledLink>
          </Link>
          <Link to="/about">
            <StyledLink variant="h4">About</StyledLink>
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <Badge badgeContent={4} color="primary">
            <FaShoppingCart size={50} />
          </Badge>
          <Avatar
            alt="Remy Sharp"
            src="/avatar/sample_pic.jpeg"
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;

const StyledLink = styled(Typography)`
  color: #352f44;
`;
