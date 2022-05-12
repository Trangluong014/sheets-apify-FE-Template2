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

import {
  FormProvider,
  FRadioGroup,
  FSelect,
  FTextField,
} from "../components/form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ProductList from "../features/products/ProductList";

function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { products, isLoading, totalPage, error } = useSelector(
    (state) => state.product
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

  const defaultValues = {
    gender: "",
    category: "All",
    price: "",
    sort: "price.desc",
    search: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const { reset } = methods;

  const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];
  const FILTER_CATEGORY_OPTIONS = ["All", "Shoes", "Apparel", "Accessories"];
  const FILTER_PRICE_OPTIONS = [
    { value: "below", label: "Below $25" },
    { value: "between", label: "Between $25 - $75" },
    { value: "above", label: "Above $75" },
  ];
  const PRICE_TO_QUERY = {
    below: {
      price__lt: 25,
    },
    between: {
      price__ge: 25,
      price__le: 75,
    },
    above: {
      price__gt: 75,
    },
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const pricequery = price ? PRICE_TO_QUERY[price] : "";
    const searchquery = search ? { name__contains: search } : "";

    dispatch(
      getProducts({
        page,
        searchquery,
        sort,
        order,
        gender,
        category,
        pricequery,
      })
    );
  }, [dispatch, page, search, sort, order, gender, category, price]);

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
                <FRadioGroup
                  name="gender"
                  options={FILTER_GENDER_OPTIONS}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Stack>

              <Stack>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Category
                </Typography>
                <FRadioGroup
                  name="category"
                  options={FILTER_CATEGORY_OPTIONS}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </Stack>

              <Stack>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Price
                </Typography>
                <FRadioGroup
                  name="price"
                  value={price}
                  options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
                  getOptionLabel={FILTER_PRICE_OPTIONS.map(
                    (item) => item.label
                  )}
                  onChange={(e) => setPrice(e.target.value)}
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
        <Stack>
          <Stack sx={{ flexGrow: 1 }} direction="row">
            <FormProvider methods={methods}>
              {/* //search */}
              <FTextField
                name="search"
                sx={{ width: 300 }}
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {/* //sort */}
            </FormProvider>
            <FormProvider methods={methods}>
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
          <Stack>
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
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={(e) => setPage(e.target.value)}
        />
      </Box>
    </Container>
  );
}

export default HomePage;
