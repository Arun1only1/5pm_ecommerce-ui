import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { styled } from "styled-components";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid sx={{ padding: "1rem" }}>
          <Typography sx={{ p: 2 }}>
            Are you sure you want to logout ?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={() => handleClose()}>
              No
            </Button>
          </Stack>
        </Grid>
      </Popover>
      <Box
        sx={{
          color: "#fff",
          padding: "1rem",
          width: "100%",
          background: "#1976d2",
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
              style={{ objectFit: "contain", color: "white" }}
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
              <StyledLink variant="h4" sx={{ color: "#9376E0" }}>
                Home
              </StyledLink>
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
            <Badge badgeContent={4} color="secondary" size="large">
              <FaShoppingCart size={50} />
            </Badge>
            <Avatar
              alt="Remy Sharp"
              src="/avatar/sample_pic.jpeg"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h6">Hello {firstName}</Typography>
            {/* TODO:ICON COLOR */}
            <Button sx={{ color: "#fff" }} onClick={handleClick}>
              <BiLogOut size={35} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;

const StyledLink = styled(Typography)`
  color: #fff;
`;
