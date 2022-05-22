import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getSingleProduct } from "../features/products/productSlice";
import { fCurrency } from "../utils/numberFormat";
import noImage from "../components/no-image.png";
import { addToCart } from "../features/carts/cartSlice";
import { PAGE_URL } from "../app/config";
import apiService from "../app/apiService";

function DetailPage() {
  const { rowIndex } = useParams();
  const { product, isloading, error } = useSelector((state) => state.product);
  const { website } = useSelector((state) => state.website);
  const [rating, setRating] = useState("");

  useEffect(() => {
    try {
      const disqus_config = function () {
        this.page.url = PAGE_URL`/${website?.websiteId}`; // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = `${website?.websiteId}`; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://online-store-1-1.disqus.com/embed.js";
        s.setAttribute("data-timestamp", +new Date());
        (d.head || d.body).appendChild(s);
      })();
    } catch (error) {}
  }, [website]);
  const dispatch = useDispatch();
  const { spreadsheetId } = website;
  const range = website.ranges[0];
  useEffect(() => {
    dispatch(getSingleProduct({ spreadsheetId, range, rowIndex }));
  }, [dispatch, website, rowIndex]);

  const handleRating = async (e, newValue) => {
    setRating(newValue);
    const total_rating = parseFloat(product.total_rating) + 1;
    const average_rating =
      Math.round(
        ((parseFloat(product.average_rating) *
          parseFloat(product.total_rating) +
          parseFloat(newValue)) /
          (parseFloat(product.total_rating) + 1)) *
          100
      ) / 100;

    const response = await apiService.patch(
      `/google/${spreadsheetId}/${range}/${rowIndex}`,
      {
        total_rating,
        average_rating,
      }
    );
    dispatch(getSingleProduct({ spreadsheetId, range, rowIndex }));
  };

  console.log("product", product);
  return (
    <>
      {product ? (
        <Container sx={{ my: 3 }}>
          <Breadcrumbs sx={{ mb: 4 }}>
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={`/${website.websiteId}`}
            >
              {website.name}
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
                            <Card elevation={0}>
                              <CardHeader title="Description" />
                              <CardContent>
                                <Typography>{product.description}</Typography>
                              </CardContent>
                            </Card>
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
                                name="rangting"
                                value={rating || product.average_rating}
                                onChange={handleRating}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                ({product.total_rating})
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

                            <Box sx={{ my: 3 }}>
                              <Button
                                variant="contained"
                                onClick={() => dispatch(addToCart(product))}
                              >
                                Add to Cart
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                        <CardContent>
                          <Grid item xs={12}>
                            <div id="disqus_thread"></div>
                          </Grid>
                        </CardContent>
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
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default DetailPage;
