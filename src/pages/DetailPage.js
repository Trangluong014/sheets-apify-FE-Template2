import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getSingleProduct } from "../features/products/productSlice";
import { fCurrency } from "../utils/numberFormat";
import noImage from "../components/no-image.png";

function DetailPage() {
  const params = useParams();
  const { product, isloading, error } = useSelector((state) => state.product);
  const { productId } = params;
  const { website } = useSelector((state) => state.website);
  console.log(params);
  console.log(productId);
  const dispatch = useDispatch();
  useEffect(() => {
    const { spreadsheetId } = website;
    dispatch(getSingleProduct({ spreadsheetId, productId }));
  }, [productId, dispatch, website]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Store
        </Link>
        <Typography color="text.primary">{product?.name}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {isloading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {product ? (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <img
                              src={product.cover ? product.cover : noImage}
                              width="100%"
                              height="100%"
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.status === "sale"
                                ? "error.main"
                                : "info.main",
                          }}
                        >
                          {product.status}
                        </Typography>
                        <Typography variant="h5" paragraph>
                          {product.name}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={
                              product.totalRating ? product.totalRating : ""
                            }
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.totalReview} reviews)
                          </Typography>
                        </Stack>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {/* {product.priceSale && fCurrency(product.priceSale)} */}
                          </Box>
                          &nbsp;{fCurrency(product.price)}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Typography>{product.Description}</Typography>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box sx={{ my: 3 }}>
                          <Button variant="contained" onClick={() => {}}>
                            Add to Cart
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                ) : (
                  <Typography variant="h6">Product not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
