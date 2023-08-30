import React from "react";
import { Link } from "react-router-dom";

const NoItemFound = () => {
  return (
    <div>
      No products found
      <Link to="/products/add">Click here to create product</Link>
    </div>
  );
};

export default NoItemFound;
