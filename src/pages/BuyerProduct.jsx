import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { $axios } from "../lib/axios";
import { useQuery } from "react-query";

import { getBuyerProducts } from "../lib/apis/product.apis";
import { Box, Button, Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import NoItemFound from "../components/NoItemFound";
import ProductCard from "../components/ProductCard";

const BuyerProduct = (props) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["buyer-products", page, props.searchText],
    queryFn: () =>
      getBuyerProducts({
        page,
        limit: 10,
        searchText: props?.searchText || "",
      }),
  });

  console.log(data);

  const getPaginationData = (event, data) => {
    setPage(data);
  };

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <CustomSnackbar
        open={isError}
        status="error"
        message="Products cannot be fetched at this time."
      />
      {!isLoading && data?.data?.products?.length === 0 ? (
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
              {data?.data?.products?.map((item) => {
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
                count={data?.data?.totalPage}
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

export default BuyerProduct;
