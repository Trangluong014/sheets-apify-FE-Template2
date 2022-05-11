import {
  Alert,
  Container,
  Stack,
  Typography,
  Box,
  InputAdornment,
  Button,
  Pagination,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";

import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";
import ProductList from "../components/ProductList";

import {
  FMultiCheckbox,
  FormProvider,
  FRadioGroup,
  FSelect,
  FTextField,
} from "../components/form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const { currentPageProducts, productById, isLoading, totalPage, error } =
    useSelector((state) => state.product);

  const products = currentPageProducts.map(
    (productId) => productById[productId]
  );

  /* //pagination */

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  /* //sort */

  const SORT_OPTIONS = [
    { value: "price.desc", label: "Price: High-Low" },
    { value: "price.asc", label: "Price: Low-High" },
    { value: "name.dsc", label: "Name: A-Z" },
    { value: "name.asc", label: "Name: Z-A" },
  ];

  const handleChangeSort = (event, value) => {
    const sortOrder = event.target.value.split(".");
    setSort(sortOrder[0]);
    setOrder(sortOrder[1]);
  };

  /* //search */

  const onSubmit = (event, value) => {
    setSearch(value);
  };

  const defaultValues = {
    gender: [],
    category: "All",
    priceRange: "",
    sortBy: "price.desc",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, watch, reset } = methods;
  const filters = watch();

  const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];
  const FILTER_CATEGORY_OPTIONS = ["All", "Shoes", "Apparel", "Accessories"];
  const FILTER_PRICE_OPTIONS = [
    { value: "below", label: "Below $25" },
    { value: "between", label: "Between $25 - $75" },
    { value: "above", label: "Above $75" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts(page, search, filter, sort, order);
  }, [dispatch, page, search, filter, sort, order]);

  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Store
        </Typography>
      </Stack>
      <Stack direction="row">
        <Stack>
          <FormProvider methods={methods}>
            <Stack spacing={3} sx={{ p: 3, width: 150 }}>
              <Stack>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Gender
                </Typography>
                <FMultiCheckbox name="gender" options={FILTER_GENDER_OPTIONS} />
              </Stack>

              <Stack>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Category
                </Typography>
                <FRadioGroup
                  name="category"
                  options={FILTER_CATEGORY_OPTIONS}
                />
              </Stack>

              <Stack>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Price
                </Typography>
                <FRadioGroup
                  name="priceRange"
                  options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
                  getOptionLabel={FILTER_PRICE_OPTIONS.map(
                    (item) => item.label
                  )}
                />
              </Stack>

              <Box>
                <Button
                  variant="outlined"
                  onClick={() => reset()}
                  startIcon={<ClearAllIcon />}
                >
                  Clear All
                </Button>
              </Box>
            </Stack>
          </FormProvider>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <FormProvider methods={methods}>
            {/* //search */}
            <FTextField
              name="searchQuery"
              sx={{ width: 300 }}
              size="small"
              onSubmit={handleSubmit(onSubmit)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {/* //sort */}
            <FSelect
              name="sort"
              size="small"
              sx={{ width: 300 }}
              onChange={handleChangeSort}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
          </FormProvider>
        </Stack>
      </Stack>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <ProductList products={products} />
            )}
          </>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
}

export default HomePage;
