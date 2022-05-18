import {
  Alert,
  Container,
  Stack,
  Typography,
  Box,
  InputAdornment,
  Button,
  Pagination,
  TextField,
  Select,
  MenuItem,
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
import { useParams } from "react-router-dom";
import { parse } from "qs";
import apiService from "../app/apiService";
import { useWebsiteConfig } from "../hooks/userWebsiteConfig";

const EMPTY = "__empty__";

function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  const params = useParams();
  console.log(params);
  const { products, isLoading, totalPage, error } = useSelector(
    (state) => state.product
  );

  const { website } = useSelector((state) => state.website);
  const websiteConfig = useWebsiteConfig();

  const FILTERS = websiteConfig?.filter || [
    {
      label: "Gender",
      sheet: "GenderFilter",
    },
    {
      label: "Category",
      sheet: "CategoryFilter",
    },
    {
      label: "Price",
      sheet: "PriceFilter",
    },
  ];

  // filters
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    const { spreadsheetId } = website;
    Promise.all(
      FILTERS.map(async ({ sheet: range }) => {
        try {
          const response = await apiService.get(`/item/${spreadsheetId}`, {
            params: {
              range,
            },
          });
          const { itemList } = response.data.data;

          return itemList.map(({ label, value }) => ({
            label,
            value: value || EMPTY,
          }));
        } catch {
          return [];
        }
      })
    ).then(setFilterValues);
  }, [setFilterValues, website]);

  /* //sort */

  const SORT_OPTIONS = [
    { value: "price.desc", label: "Price: High-Low" },
    { value: "price.asc", label: "Price: Low-High" },
    { value: "name.dsc", label: "Name: Z-A" },
    { value: "name.asc", label: "Name: A-Z" },
  ];

  const handleChangeSort = (event, value) => {
    const sortOrder = event.target.value.split(".");
    setSort(sortOrder[0]);
    setOrder(sortOrder[1]);
  };

  /* //search */

  const defaultValues = {
    gender: "",
    category: "",
    price: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const { reset, watch } = methods;

  const dispatch = useDispatch();

  useEffect(() => {
    const { spreadsheetId } = website;
    const searchquery = search ? { name__contains: search } : "";

    dispatch(
      getProducts({
        spreadsheetId,
        page,
        searchquery,
        sort,
        order,
      })
    );
  }, [website, dispatch, page, search, sort, order]);

  React.useEffect(() => {
    const subscription = watch((data) => {
      const params = Object.values(data)
        .filter(Boolean)
        .filter((value) => value !== EMPTY)
        .map((value) => parse(value))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {});

      const { spreadsheetId } = website;
      const searchquery = search ? { name__contains: search } : "";

      dispatch(
        getProducts({
          spreadsheetId,
          page,
          searchquery,
          sort,
          order,
          ...params,
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, order, search, sort, page, website]);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <Stack spacing={3} sx={{ p: 3, width: 150 }}>
            {FILTERS.map(({ label: filter }, index) => {
              if (!filterValues[index]) return;
              const lcaseFilter = filter.toLowerCase();
              return (
                <Stack key={filter} direction="column">
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {filter}
                  </Typography>
                  <FRadioGroup
                    name={lcaseFilter}
                    options={filterValues[index].map((option) => option.value)}
                    getOptionLabel={(option) =>
                      filterValues[index].find((o) => o.value === option).label
                    }
                    labelProps={{
                      labelPlacement: "end",
                    }}
                    row={false}
                  />
                </Stack>
              );
            })}

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
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <TextField
            name="search"
            sx={{ width: "70%" }}
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
          <Select
            name="sort"
            size="small"
            sx={{ width: "30%" }}
            onChange={handleChangeSort}
            value={sort}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
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
            onChange={(e) => setPage(e.target.value)}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
