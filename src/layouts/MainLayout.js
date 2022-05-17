import { Box, Stack } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import CartWidget from "../features/carts/CartWidget";
import { getSingleWebsite } from "../features/websites/websiteSlice";
import useWebsiteConfig from "../hooks/userWebsiteConfig";

import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function MainLayout() {
  const { websiteId } = useParams();
  console.log(websiteId);

  const dispatch = useDispatch();

  const { website } = useSelector((state) => state.website);

  useEffect(() => {
    dispatch(getSingleWebsite(websiteId));
  }, [websiteId]);

  const websiteConfig = useWebsiteConfig();
  const theme = useMemo(() => {
    return createTheme(websiteConfig?.theme || {});
  }, [websiteConfig]);

  if (website) {
    return (
      <Stack sx={{ minHeight: "100vh" }}>
        <MainHeader />
        <CartWidget />
        <Outlet />
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default MainLayout;
