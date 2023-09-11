import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { $axios } from "../lib/axios";
import Loader from "../components/Loader";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { useMutation } from "react-query";
import { addItemToCart } from "../lib/apis/cart.api";
const ProductDetail = () => {
  const userRole = localStorage.getItem("userRole");
  const [productDetail, setProductDetail] = useState({});
  const [counter, setCounter] = useState(1);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //   extract id
  const params = useParams();

  const productId = params.id;

  const addItemToCartMutation = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: () => addItemToCart({ productId, quantity: counter }),
  });

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const response = await $axios.get(`/product/details/${productId}`);

      setProductDetail(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "10px",
        padding: "2rem",
        minWidth: "70%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        gap: "5px",
        margin: "2rem",
      }}
    >
      <Grid container>
        <img
          style={{ height: 500, width: 600, objectFit: "cover" }}
          src="https://images.samsung.com/is/image/samsung/ph-hdtv-n4003-ua32n4003arxxp-frontblack-100425777?$650_519_PNG$"
        />
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",

          padding: "2rem",
          fontSize: "1.5rem",
        }}
      >
        <Grid item>Name: {productDetail.name}</Grid>
        <Grid item>Brand: {productDetail.company}</Grid>
        <Grid item>Price: Rs.{productDetail.price}</Grid>
        <Grid item>
          Description: An electronic system of transmitting transient images of
          fixed or moving objects together with sound over a wire or through
          space by apparatus that converts light and sound into electrical waves
          and reconverts them into visible light rays and audible sound.
        </Grid>
        <Grid item>
          Free shipping: {productDetail.freeShipping === true ? "Yes" : "No"}
        </Grid>
        <Grid item>Available Quantity:{productDetail.quantity}</Grid>
        <Grid item sx={{ textTransform: "capitalize" }}>
          Category:{productDetail.category}
        </Grid>

        {userRole === "buyer" && (
          <>
            <Grid item sx={{ display: "flex", gap: "1rem" }}>
              <Typography sx={{ fontSize: "1.5rem" }}>
                Number of items
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newCount = counter + 1;
                  if (newCount >= productDetail.quantity) {
                    setCounter(productDetail.quantity);
                  } else {
                    setCounter(newCount);
                  }
                }}
              >
                <GrAdd size={30} />
              </Button>
              <Typography variant="h3">{counter}</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newCount = counter - 1;

                  if (newCount <= 0) {
                    setCounter(1);
                  } else {
                    setCounter(newCount);
                  }
                }}
              >
                <AiOutlineMinus size={30} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  addItemToCartMutation.mutate();
                  navigate("/cart");
                }}
              >
                Add to cart
              </Button>
            </Grid>
          </>
        )}

        {userRole === "seller" && (
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/product/edit/${productId}`);
              }}
            >
              Edit product
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductDetail;
