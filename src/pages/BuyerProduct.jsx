import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { $axios } from "../lib/axios";

const BuyerProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // fetch product
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await $axios.post("/product/buyer/all", {
        page: 1,
        limit: 10,
      });

      setProducts(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return <div>Buyer Product</div>;
};

export default BuyerProduct;
