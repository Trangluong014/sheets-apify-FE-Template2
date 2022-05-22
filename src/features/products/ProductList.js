import { Grid } from "@mui/material";
import React from "react";

import ProductCard from "./ProductCard";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";

function ProductList({ products }) {
  const transApi = useSpringRef();
  const transition = useTransition(products || [], {
    ref: transApi,
    trail: 400 / (products?.length || 1),
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  return (
    <Grid container spacing={2} mt={1}>
      {transition((style, product) => (
        <Grid item key={product._id} xs={6} md={4} lg={3}>
          <animated.div style={style}>
            <ProductCard product={product} />
          </animated.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
