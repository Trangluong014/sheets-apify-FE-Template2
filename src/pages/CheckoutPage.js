import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Box,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import CartProductList from "../features/carts/CartProductList";
import CheckoutDelivery from "../features/carts/CheckoutDelivery";
import CheckoutSummary from "../features/carts/CheckoutSummary";
import { useSelector } from "react-redux";

const STEPS = ["Cart", "Delivery", "Summary"];

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const { website } = useSelector((state) => state.website);
  return (
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
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Stack spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {STEPS.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={() => handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === 0 && <CartProductList setActiveStep={setActiveStep} />}
        {activeStep === 1 && <CheckoutDelivery setActiveStep={setActiveStep} />}
        {activeStep === 2 && <CheckoutSummary />}
      </Stack>
    </Container>
  );
}

export default CheckoutPage;
