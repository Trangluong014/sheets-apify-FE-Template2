import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckoutCompletedPage() {
  const { website } = useSelector((state) => state.website);
  const navigate = useNavigate();
  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h4"> Your Order is complete!</Typography>
      <Typography variant="h4"> Thank you for your purchase!</Typography>
      <Button
        size="large"
        variant="contained"
        onClick={() => navigate(`/${website.websiteId}/home`)}
      >
        {" "}
        Keep Browsing
      </Button>
    </Stack>
  );
}

export default CheckoutCompletedPage;
