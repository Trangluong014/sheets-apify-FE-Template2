import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

function ProductList() {
  const { currentPageProducts, productById } = useSelector(
    (state) => state.product
  );

  const products = currentPageProducts.map(
    (productId) => productById[productId]
  );

  return (
    <Grid container spacing={2} mt={1}>
      {products.map((product) => (
        <Grid item key={product._id} xs={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
