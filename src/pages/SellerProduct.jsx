import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { $axios } from "../lib/axios";
import CustomSnackbar from "../components/CustomSnackbar";
import NoItemFound from "../components/NoItemFound";

const SellerProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  const navigate = useNavigate();

  const getPaginationData = (event, data) => {
    setPage(data);
  };

  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      const response = await $axios.post("/product/seller/all", {
        page,
        limit: 10,
      });

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [page, isItemDeleted]);

  if (loading) {
    return <Loader />;
  }
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
      <CustomSnackbar
        open={isError}
        status="error"
        message="Products cannot be fetched at this time."
      />
      {!loading && products.length === 0 ? (
        <NoItemFound />
      ) : (
        <>
          <Grid>
            <Grid
              container
              sx={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {products.map((item) => {
                return (
                  <ProductCard
                    key={item._id}
                    {...item}
                    isItemDeleted={isItemDeleted}
                    setIsItemDeleted={setIsItemDeleted}
                  />
                );
              })}
            </Grid>
            <Grid
              sx={{
                margin: "5rem 5rem 0 0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pagination
                count={10}
                color="secondary"
                size="large"
                onChange={getPaginationData}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default SellerProduct;
