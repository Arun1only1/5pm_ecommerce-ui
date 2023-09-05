import { Box, Button, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import Loader from "../components/Loader";
import NoItemFound from "../components/NoItemFound";
import ProductCard from "../components/ProductCard";
import { fetchSellerProducts } from "../lib/apis/product.apis";

const SellerProduct = (props) => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const getPaginationData = (event, data) => {
    setPage(data);
  };

  // query
  const getSellerProductQuery = useQuery({
    queryKey: ["seller-products", { page, searchText: props.searchText }],
    queryFn: () =>
      fetchSellerProducts({ page, limit: 10, searchText: props?.searchText }),
    keepPreviousData: true,
  });

  console.log(getSellerProductQuery);

  if (getSellerProductQuery.isLoading) {
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
          marginBottom: "4rem",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate("/products/add")}
            sx={{ marginRight: "5rem" }}
          >
            Add product
          </Button>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={getSellerProductQuery.isError}
        status="error"
        message="Products cannot be fetched at this time."
      />
      {!getSellerProductQuery.isLoading &&
      getSellerProductQuery.data.data.products.length === 0 ? (
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
              {getSellerProductQuery?.data?.data?.products?.map((item) => {
                return <ProductCard key={item._id} {...item} />;
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
                page={page}
                count={getSellerProductQuery?.data?.data?.totalPage}
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
