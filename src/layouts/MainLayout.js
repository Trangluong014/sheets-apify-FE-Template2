import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getSingleWebsite } from "../features/websites/websiteSlice";

import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  const { websiteId } = useParams();

  const dispatch = useDispatch();

  const { website } = useSelector((state) => state.website);

  useEffect(() => {
    dispatch(getSingleWebsite(websiteId));
  }, []);

  if (website) {
    return (
      <Stack sx={{ minHeight: "100vh" }}>
        <MainHeader />

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
