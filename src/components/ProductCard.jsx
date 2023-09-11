import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineDelete } from "react-icons/ai";
import { Chip, Grid, Popover, Stack } from "@mui/material";
import { $axios } from "../lib/axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteSellerProduct } from "../lib/apis/product.apis";

export default function ProductCard(props) {
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { _id, name, price, category, company } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteProductMutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => deleteSellerProduct(_id),
    onSuccess: () => {
      queryClient.invalidateQueries("seller-products");
    },
  });

  if (deleteProductMutation.isLoading) {
    return <Loader />;
  }

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
            Are you sure you want to delete this product?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                deleteProductMutation.mutate();
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
      <Card sx={{ width: "25%", height: "400px" }}>
        <CardMedia
          onClick={() => navigate(`/products/details/${_id}`)}
          component="img"
          alt="green iguana"
          height="140"
          image="https://www.rei.com/dam/content_team_010818_52427_htc_running_shoes_hero2_lg.jpg?t=ea16by9xs"
          sx={{
            objectFit: "contain",
            cursor: "pointer",
            padding: "1rem",
            width: "100%",
          }}
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "3rem",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Chip label={company} color="primary" variant="outlined" />
          </div>

          <Typography gutterBottom variant="h6" component="div">
            Rs.{price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          {userRole === "seller" && (
            <Button size="small" onClick={(event) => handleClick(event)}>
              <AiOutlineDelete size={30} color="success" />
            </Button>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigate(`/products/details/${_id}`);
            }}
          >
            Explore
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
